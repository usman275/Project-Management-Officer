/**
 * auth.js — Authentication helpers
 * Project Management System
 * Depends on: storage.js (must load first)
 */

/* ── Auth object ─────────────────────────────────────────── */
const Auth = {
    login(email, password) {
        const user = Users.byEmail(email);
        if (!user) return { ok: false, error: 'No account found with this email.' };
        const storedPass = user.password;
        const isMatch = storedPass === btoa(password) || storedPass === password;
        if (!isMatch) return { ok: false, error: 'Incorrect password. Please try again.' };
        if (user.status === 'inactive') return { ok: false, error: 'Your account has been deactivated. Contact the administrator.' };
        Session.set({ userId: user.id, role: 'employee', name: user.name, email: user.email });
        return { ok: true, user };
    },

    // Used by admin/login.html
    adminLogin(username, password) {
        const ok = Admin.verify(username, password);
        if (!ok) return { ok: false, error: 'Invalid admin credentials.' };
        const creds = Admin.credentials();
        Session.set({ userId: 'admin', role: 'admin', name: creds.name || 'Administrator', email: creds.email || '' });
        return { ok: true };
    },

    logout() {
        Session.clear();
        const depth = window.location.pathname.split('/').filter(Boolean).length - 1;
        const prefix = depth > 0 ? '../'.repeat(depth) : '';
        window.location.href = prefix + 'login.html';
    },

    adminLogout() {
        Session.clear();
        const depth = window.location.pathname.split('/').filter(Boolean).length - 1;
        const prefix = depth > 0 ? '../'.repeat(depth) : '';
        window.location.href = prefix + 'admin/login.html';
    },

    signup(data) { return this.register(data); },

    register(data) {
        if (Users.byEmail(data.email)) return { ok: false, error: 'An account with this email already exists.' };
        if (!data.password || data.password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };
        const user = Users.create({
            name: data.name,
            employeeId: data.employeeId || '',
            email: data.email.toLowerCase(),
            department: data.department || '',
            batch: data.batch || '',
            password: btoa(data.password),
            avatar: (data.name || '').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'EP',
        });
        return { ok: true, user };
    },
};

/* ── Route guards ────────────────────────────────────────── */
function requireStudent() {
    if (!Session.isStudent()) {
        const depth = window.location.pathname.split('/').filter(Boolean).length - 1;
        const prefix = depth > 0 ? '../'.repeat(depth) : '';
        window.location.replace(prefix + 'login.html');
        return false;
    }
    return true;
}

function requireAdmin() {
    if (!Session.isAdmin()) {
        const depth = window.location.pathname.split('/').filter(Boolean).length - 1;
        const prefix = depth > 0 ? '../'.repeat(depth) : '';
        window.location.replace(prefix + 'admin/login.html');
        return false;
    }
    return true;
}

function redirectIfLoggedIn() {
    if (Session.isAdmin()) {
        window.location.replace('admin/dashboard.html');
    } else if (Session.isEmployee() || Session.isStudent()) {
        window.location.replace('student/dashboard.html');
    }
}

// Used by admin/login.html
function redirectIfAdminLoggedIn() {
    if (Session.isAdmin()) {
        window.location.replace('dashboard.html');
    }
}

/* ── Shared UI helpers (needed on public + auth pages) ────── */
function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function truncate(str, len) {
    if (!str) return '';
    return str.length > len ? str.slice(0, len) + '…' : str;
}

function timeAgo(iso) {
    if (!iso) return '';
    const diff = Date.now() - new Date(iso).getTime();
    const min = Math.floor(diff / 60000);
    if (min < 1) return 'just now';
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const d = Math.floor(hr / 24);
    if (d < 30) return `${d}d ago`;
    return new Date(iso).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDateTime(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleString('en-PK', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function statusBadge(status) {
    const map = {
        approved: '<span class="badge badge-success">Approved</span>',
        pending: '<span class="badge badge-warning">Pending</span>',
        rejected: '<span class="badge badge-error">Rejected</span>',
        active: '<span class="badge badge-success">Active</span>',
        inactive: '<span class="badge badge-error">Inactive</span>',
    };
    return map[status] || `<span class="badge">${escapeHtml(status)}</span>`;
}

function avatarColor(initials) {
    const colors = [
        'linear-gradient(135deg,#3b52d4,#6b7ff5)',
        'linear-gradient(135deg,#059669,#34d399)',
        'linear-gradient(135deg,#7c3aed,#a78bfa)',
        'linear-gradient(135deg,#dc2626,#f87171)',
        'linear-gradient(135deg,#b8770c,#f5b93e)',
    ];
    const code = (initials || 'A').charCodeAt(0) % colors.length;
    return colors[code];
}
