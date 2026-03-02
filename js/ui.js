/**
 * ui.js — UI helpers: toasts, modals, loading, pagination, sidebar
 * Project Management System
 */

/* ── Toast Notifications ─────────────────────────────────── */
function _ensureToastContainer() {
    if (!document.getElementById('toast-container')) {
        const tc = document.createElement('div');
        tc.id = 'toast-container';
        document.body.appendChild(tc);
    }
}

function showToast(msg, type = 'info', duration = 3800) {
    _ensureToastContainer();
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.innerHTML = `
    <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
    <span class="toast-msg">${escapeHtml(msg)}</span>
    <span class="toast-close" onclick="this.parentElement.remove()">✕</span>
  `;
    document.getElementById('toast-container').appendChild(t);
    setTimeout(() => {
        t.classList.add('hiding');
        setTimeout(() => t.remove(), 300);
    }, duration);
}

/* ── Modal ───────────────────────────────────────────────── */
let _activeModal = null;

function showModal(title, bodyHtml, { size = '', footerHtml = '', onClose } = {}) {
    closeModal();
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'active-modal-overlay';
    overlay.innerHTML = `
    <div class="modal ${size ? 'modal-' + size : ''}">
      <div class="modal-header">
        <h3>${escapeHtml(title)}</h3>
        <button class="modal-close" onclick="closeModal()">✕</button>
      </div>
      <div class="modal-body">${bodyHtml}</div>
      ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
    </div>
  `;
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.body.appendChild(overlay);
    _activeModal = { overlay, onClose };
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const o = document.getElementById('active-modal-overlay');
    if (o) o.remove();
    document.body.style.overflow = '';
    if (_activeModal?.onClose) _activeModal.onClose();
    _activeModal = null;
}

function showConfirm(title, msg, onConfirm, { danger = false } = {}) {
    showModal(title, `<p style="color:var(--gray-400);font-size:.9rem;line-height:1.6">${escapeHtml(msg)}</p>`, {
        size: 'sm',
        footerHtml: `
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" onclick="(${onConfirm.toString()})();closeModal()">Confirm</button>
    `
    });
}

/* ── Loading overlay ─────────────────────────────────────── */
function showLoading(msg = 'Loading…') {
    if (document.getElementById('loading-overlay')) return;
    const el = document.createElement('div');
    el.id = 'loading-overlay';
    el.style.cssText = `
    position:fixed;inset:0;background:rgba(6,11,31,.85);z-index:9998;
    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;
    backdrop-filter:blur(4px);
  `;
    el.innerHTML = `
    <div style="width:44px;height:44px;border:3px solid rgba(255,255,255,.1);border-top-color:var(--primary-400);
      border-radius:50%;animation:spin .7s linear infinite"></div>
    <p style="color:var(--gray-300);font-size:.9rem">${escapeHtml(msg)}</p>
  `;
    if (!document.getElementById('spin-style')) {
        const s = document.createElement('style');
        s.id = 'spin-style';
        s.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
        document.head.appendChild(s);
    }
    document.body.appendChild(el);
}

function hideLoading() {
    document.getElementById('loading-overlay')?.remove();
}

/* ── Sidebar toggle ──────────────────────────────────────── */
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const toggles = document.querySelectorAll('.menu-toggle');
    if (!sidebar) return;

    toggles.forEach(btn => {
        btn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay?.classList.toggle('active');
        });
    });

    overlay?.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    });

    // Mark active link
    const path = window.location.pathname;
    document.querySelectorAll('.sidebar-link').forEach(a => {
        if (a.href && path.endsWith(new URL(a.href, window.location.href).pathname.split('/').pop())) {
            a.classList.add('active');
        }
    });
}

/* ── Topbar user info ────────────────────────────────────── */
function initTopbar(role = 'employee') {
    const nameEl = document.getElementById('topbar-user-name');
    const roleEl = document.getElementById('topbar-user-role');
    const sideNameEl = document.getElementById('sidebar-user-name');
    const sideRoleEl = document.getElementById('sidebar-user-role');
    const avEl = document.getElementById('sidebar-avatar');

    if (role === 'employee' || role === 'student') {
        const u = Session.currentUser();
        if (!u) return;
        if (nameEl) nameEl.textContent = u.name;
        if (roleEl) roleEl.textContent = u.department;
        if (sideNameEl) sideNameEl.textContent = u.name;
        if (sideRoleEl) sideRoleEl.textContent = 'Employee · ' + u.batch;
        if (avEl) { avEl.textContent = u.avatar || 'U'; avEl.style.background = avatarColor(u.avatar); }
    } else {
        const creds = Admin.credentials();
        if (nameEl) nameEl.textContent = creds.name || 'Admin';
        if (roleEl) roleEl.textContent = 'Administrator';
        if (sideNameEl) sideNameEl.textContent = creds.name || 'Admin';
        if (sideRoleEl) sideRoleEl.textContent = 'System Administrator';
        if (avEl) { avEl.textContent = 'AD'; avEl.style.background = 'linear-gradient(135deg,#b8770c,#f5b93e)'; }
    }
}

/* ── Pagination ──────────────────────────────────────────── */
function paginate(items, page, perPage = 10) {
    const total = Math.ceil(items.length / perPage);
    return {
        items: items.slice((page - 1) * perPage, page * perPage),
        total,
        current: page,
        perPage,
        hasNext: page < total,
        hasPrev: page > 1,
    };
}

function renderPagination(pager, containerId, onPage) {
    const c = document.getElementById(containerId);
    if (!c) return;
    if (pager.total <= 1) { c.innerHTML = ''; return; }

    let html = `<button class="page-btn" ${!pager.hasPrev ? 'disabled' : ''} onclick="(${onPage.toString()})(${pager.current - 1})">&#8249;</button>`;
    for (let i = 1; i <= pager.total; i++) {
        if (i === 1 || i === pager.total || Math.abs(i - pager.current) <= 1) {
            html += `<button class="page-btn ${i === pager.current ? 'active' : ''}" onclick="(${onPage.toString()})(${i})">${i}</button>`;
        } else if (Math.abs(i - pager.current) === 2) {
            html += `<button class="page-btn" disabled>…</button>`;
        }
    }
    html += `<button class="page-btn" ${!pager.hasNext ? 'disabled' : ''} onclick="(${onPage.toString()})(${pager.current + 1})">&#8250;</button>`;
    c.innerHTML = html;
}

/* ── Form helpers ────────────────────────────────────────── */
function setLoading(btn, state, loadingText = 'Processing…') {
    if (state) {
        btn.dataset.origText = btn.innerHTML;
        btn.innerHTML = `<span style="display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,.4);
      border-top-color:white;border-radius:50%;animation:spin .7s linear infinite"></span> ${escapeHtml(loadingText)}`;
        btn.disabled = true;
        btn.classList.add('loading');
    } else {
        btn.innerHTML = btn.dataset.origText || btn.innerHTML;
        btn.disabled = false;
        btn.classList.remove('loading');
    }
}

function validate(rules) {
    // rules: [{field, value, label, required, minLen, maxLen, pattern, patternMsg}]
    for (const r of rules) {
        if (r.required && !String(r.value || '').trim()) {
            return { ok: false, error: `${r.label} is required.`, field: r.field };
        }
        if (r.minLen && String(r.value || '').length < r.minLen) {
            return { ok: false, error: `${r.label} must be at least ${r.minLen} characters.`, field: r.field };
        }
        if (r.maxLen && String(r.value || '').length > r.maxLen) {
            return { ok: false, error: `${r.label} must be at most ${r.maxLen} characters.`, field: r.field };
        }
        if (r.pattern && !r.pattern.test(r.value || '')) {
            return { ok: false, error: r.patternMsg || `${r.label} is invalid.`, field: r.field };
        }
    }
    return { ok: true };
}

/* ── Tags input widget ───────────────────────────────────── */
function initTagsInput(wrapperId, hiddenInputId) {
    const wrapper = document.getElementById(wrapperId);
    const hidden = document.getElementById(hiddenInputId);
    if (!wrapper) return;
    const tags = [];

    const input = document.createElement('input');
    input.className = 'tags-input';
    input.placeholder = 'Add tag & press Enter…';
    wrapper.appendChild(input);

    function refresh() {
        // Remove existing chips
        wrapper.querySelectorAll('.tag-chip').forEach(c => c.remove());
        tags.forEach((t, i) => {
            const chip = document.createElement('span');
            chip.className = 'tag-chip';
            chip.innerHTML = `${escapeHtml(t)}<button type="button" onclick="this.parentElement._removeThis()">✕</button>`;
            chip._removeThis = () => { tags.splice(i, 1); refresh(); };
            wrapper.insertBefore(chip, input);
        });
        if (hidden) hidden.value = JSON.stringify(tags);
    }

    input.addEventListener('keydown', e => {
        if ((e.key === 'Enter' || e.key === ',') && input.value.trim()) {
            e.preventDefault();
            const val = input.value.trim().replace(/,/g, '');
            if (val && !tags.includes(val) && tags.length < 8) {
                tags.push(val);
                input.value = '';
                refresh();
            }
        }
        if (e.key === 'Backspace' && !input.value && tags.length) {
            tags.pop();
            refresh();
        }
    });

    wrapper.addEventListener('click', () => input.focus());
    return { getTags: () => tags, setTags: (t) => { tags.length = 0; tags.push(...t); refresh(); } };
}

/* ── Drag-and-drop file zone ─────────────────────────────── */
function initFileZone(zoneId, onFile) {
    const zone = document.getElementById(zoneId);
    if (!zone) return;

    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) onFile(file);
    });
}

/* ── Announce banner (student) ───────────────────────────── */
function renderAnnouncementBanner(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const pinned = Announcements.pinned();
    if (!pinned.length) { c.style.display = 'none'; return; }
    c.innerHTML = `
    <div style="background:rgba(34,51,168,.15);border:1px solid rgba(59,82,212,.25);border-radius:var(--radius-md);
      padding:12px 16px;display:flex;align-items:center;gap:12px;font-size:.875rem">
      <span style="font-size:1.1rem">📢</span>
      <div><strong style="color:var(--white)">${escapeHtml(pinned[0].title)}</strong>
      <span style="color:var(--gray-500);margin-left:8px">${escapeHtml(truncate(pinned[0].body, 80))}</span></div>
    </div>
  `;
}

/* ── Theme Management ────────────────────────────────────── */
const Theme = {
    init() {
        const saved = localStorage.getItem('pmo_theme') || 'light';
        this.set(saved);
    },
    set(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('pmo_theme', theme);
        this.updateButtons(theme);
    },
    toggle() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'light' ? 'dark' : 'light';
        this.set(next);
    },
    updateButtons(theme) {
        document.querySelectorAll('.btn-theme').forEach(btn => {
            btn.innerHTML = theme === 'light' ? '🌙' : '☀️';
            btn.title = `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`;
        });
    }
};

// Initialize theme on load
Theme.init();
