/* ============================================================
   PMO – GLOBAL UTILITIES
   main.js
   ============================================================ */

// ─── DEMO DATA SEED ──────────────────────────────────────────
function seedDemoData() {
    if (localStorage.getItem('pmo_seeded')) return;

    const departments = ['Computer Science', 'Electrical Engineering', 'Software Engineering', 'Mechanical Engineering', 'Business Administration'];
    const batches = ['2020-2024', '2021-2025', '2022-2026', '2023-2027'];

    // Settings
    localStorage.setItem('pmo_settings', JSON.stringify({ departments, batches, universityName: 'Superior University' }));

    // Admin account
    localStorage.setItem('pmo_admin', JSON.stringify({ email: 'admin@pmo.edu', password: 'admin123', name: 'System Admin' }));

    // Students
    const students = [
        { id: 's1', name: 'Ahmed Raza', email: 'ahmed@student.edu', password: 'student123', department: 'Computer Science', batch: '2020-2024', rollNo: 'CS-2020-001', avatar: 'AR' },
        { id: 's2', name: 'Sara Khan', email: 'sara@student.edu', password: 'student123', department: 'Software Engineering', batch: '2021-2025', rollNo: 'SE-2021-015', avatar: 'SK' },
        { id: 's3', name: 'Ali Hassan', email: 'ali@student.edu', password: 'student123', department: 'Electrical Engineering', batch: '2020-2024', rollNo: 'EE-2020-032', avatar: 'AH' },
        { id: 's4', name: 'Fatima Malik', email: 'fatima@student.edu', password: 'student123', department: 'Computer Science', batch: '2022-2026', rollNo: 'CS-2022-008', avatar: 'FM' },
        { id: 's5', name: 'Usman Tariq', email: 'usman@student.edu', password: 'student123', department: 'Business Administration', batch: '2021-2025', rollNo: 'BA-2021-041', avatar: 'UT' },
    ];
    localStorage.setItem('pmo_users', JSON.stringify(students));

    // Projects
    const projects = [
        { id: 'p1', title: 'AI-Powered Attendance System Using Facial Recognition', abstract: 'This project presents a robust attendance management system leveraging deep learning and computer vision techniques to automate the process of student attendance tracking in university classrooms. The system uses a convolutional neural network trained on a dataset of student facial images to achieve real-time recognition with high accuracy, eliminating the need for manual roll calls.', department: 'Computer Science', batch: '2020-2024', year: '2024', students: ['Ahmed Raza', 'Sara Khan'], supervisor: 'Dr. Imran Sheikh', tags: ['AI', 'Computer Vision', 'Deep Learning', 'Python'], pdfUrl: '', status: 'approved', uploadedBy: 's1', views: 142, uploadDate: '2024-01-15' },
        { id: 'p2', title: 'Smart Energy Management System for Industrial IoT', abstract: 'An intelligent energy monitoring and optimization platform designed for industrial environments. The system collects real-time data from sensors deployed across machinery and production lines, processes it through edge computing nodes, and provides actionable insights to reduce energy consumption by up to 35% using predictive analytics and automated control algorithms.', department: 'Electrical Engineering', batch: '2020-2024', year: '2024', students: ['Ali Hassan'], supervisor: 'Dr. Asif Mehmood', tags: ['IoT', 'Energy', 'Machine Learning', 'Arduino'], pdfUrl: '', status: 'approved', uploadedBy: 's3', views: 98, uploadDate: '2024-02-10' },
        { id: 'p3', title: 'E-Commerce Platform with Integrated Supply Chain Analytics', abstract: 'A full-stack e-commerce solution featuring real-time inventory management, supplier performance tracking, and predictive demand forecasting. The platform integrates with third-party logistics APIs and provides an administrative dashboard with interactive visualizations for supply chain optimization.', department: 'Software Engineering', batch: '2021-2025', year: '2025', students: ['Sara Khan', 'Usman Tariq'], supervisor: 'Ms. Amna Baig', tags: ['React', 'Node.js', 'MongoDB', 'Analytics'], pdfUrl: '', status: 'pending', uploadedBy: 's2', views: 54, uploadDate: '2025-01-20' },
        { id: 'p4', title: 'Blockchain-Based Academic Certificate Verification System', abstract: 'A decentralized application built on the Ethereum blockchain to provide tamper-proof academic credential verification. Universities can issue digital certificates as NFTs, and employers or institutions can instantly verify authenticity without contacting the issuing institution, drastically reducing verification time and preventing forgery.', department: 'Computer Science', batch: '2022-2026', year: '2025', students: ['Fatima Malik'], supervisor: 'Dr. Kamran Ali', tags: ['Blockchain', 'Ethereum', 'Solidity', 'Web3'], pdfUrl: '', status: 'pending', uploadedBy: 's4', views: 201, uploadDate: '2025-02-01' },
        { id: 'p5', title: 'Automated Greenhouse Control System with ML Crop Prediction', abstract: 'A smart greenhouse management system that uses machine learning algorithms to predict optimal growing conditions for various crops. Sensors monitor temperature, humidity, soil moisture, and light intensity, while actuators automatically adjust conditions. A mobile app provides farmers with crop health alerts and harvest predictions.', department: 'Electrical Engineering', batch: '2020-2024', year: '2024', students: ['Ali Hassan', 'Ahmed Raza'], supervisor: 'Dr. Asif Mehmood', tags: ['IoT', 'ML', 'Raspberry Pi', 'Agriculture'], pdfUrl: '', status: 'approved', uploadedBy: 's3', views: 77, uploadDate: '2024-03-05' },
        { id: 'p6', title: 'University Bus Tracking System with Crowd Management', abstract: 'A real-time GPS-based bus tracking application for university transportation. Students can view live bus locations, estimated arrival times, and seat availability via a mobile app. The backend system uses historical data to optimize routes and schedules during peak hours.', department: 'Software Engineering', batch: '2021-2025', year: '2025', students: ['Usman Tariq'], supervisor: 'Ms. Amna Baig', tags: ['Flutter', 'Firebase', 'GPS', 'Maps API'], pdfUrl: '', status: 'rejected', uploadedBy: 's5', views: 33, uploadDate: '2025-01-08' },
    ];
    localStorage.setItem('pmo_projects', JSON.stringify(projects));

    // Announcements
    const announcements = [
        { id: 'a1', title: 'FYP Submission Deadline Extended', body: 'The final submission deadline for FYP reports has been extended to March 15, 2025. All teams must ensure their PDF documentation is uploaded before the deadline.', date: '2025-02-20', icon: '📢' },
        { id: 'a2', title: 'Viva Voce Schedule Released', body: 'The viva voce examination schedule for Batch 2020-2024 has been published. Students can view their assigned slots on the department notice board.', date: '2025-02-15', icon: '🎓' },
        { id: 'a3', title: 'New Supervisor Allocation for CS Department', body: 'Due to increased enrollment in Computer Science, three new supervisors have been added to the FYP panel. Contact the FYP coordinator for reassignment requests.', date: '2025-02-10', icon: '👨‍🏫' },
    ];
    localStorage.setItem('pmo_announcements', JSON.stringify(announcements));

    localStorage.setItem('pmo_seeded', '1');
}

seedDemoData();

// ─── TOAST SYSTEM ────────────────────────────────────────────
let toastContainer = null;

function getToastContainer() {
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    return toastContainer;
}

function showToast(message, type = 'info', duration = 3500) {
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    const container = getToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <span class="toast-msg">${message}</span>
    <button class="toast-close" onclick="this.closest('.toast').classList.add('hiding')" title="Close">✕</button>
  `;
    toast.addEventListener('animationend', (e) => {
        if (e.animationName === 'toastOut') toast.remove();
    });
    container.appendChild(toast);
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.add('hiding');
        }
    }, duration);
}

// ─── MODAL SYSTEM ────────────────────────────────────────────
function openModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) { m.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
}

function closeModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) { m.classList.add('hidden'); document.body.style.overflow = ''; }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.add('hidden');
        document.body.style.overflow = '';
    }
});

// ─── SIDEBAR TOGGLE ──────────────────────────────────────────
function initSidebar() {
    const toggleBtn = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (!toggleBtn || !sidebar) return;

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('active');
    });

    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    }
}

// ─── SESSION HELPERS ─────────────────────────────────────────
function getSession() {
    try { return JSON.parse(localStorage.getItem('pmo_session')) || null; } catch { return null; }
}

function requireStudentAuth() {
    const s = getSession();
    if (!s || s.role !== 'student') {
        window.location.href = '/login.html';
        return null;
    }
    return s;
}

function requireAdminAuth() {
    const s = getSession();
    if (!s || s.role !== 'admin') {
        window.location.href = '/admin-login.html';
        return null;
    }
    return s;
}

function logout() {
    localStorage.removeItem('pmo_session');
    window.location.href = '../login.html';
}

function logoutAdmin() {
    localStorage.removeItem('pmo_session');
    window.location.href = '../admin-login.html';
}

// ─── POPULATE SIDEBAR USER ───────────────────────────────────
function fillSidebarUser(session) {
    const nameEl = document.getElementById('sidebarUserName');
    const roleEl = document.getElementById('sidebarUserRole');
    const avatarEl = document.getElementById('sidebarAvatar');
    if (nameEl) nameEl.textContent = session.name;
    if (roleEl) roleEl.textContent = session.role === 'admin' ? 'Administrator' : session.department || 'Student';
    if (avatarEl) avatarEl.textContent = session.avatar || session.name.slice(0, 2).toUpperCase();
}

// ─── DATA HELPERS ────────────────────────────────────────────
function getProjects() {
    try { return JSON.parse(localStorage.getItem('pmo_projects')) || []; } catch { return []; }
}
function saveProjects(data) { localStorage.setItem('pmo_projects', JSON.stringify(data)); }

function getUsers() {
    try { return JSON.parse(localStorage.getItem('pmo_users')) || []; } catch { return []; }
}
function saveUsers(data) { localStorage.setItem('pmo_users', JSON.stringify(data)); }

function getAnnouncements() {
    try { return JSON.parse(localStorage.getItem('pmo_announcements')) || []; } catch { return []; }
}
function saveAnnouncements(data) { localStorage.setItem('pmo_announcements', JSON.stringify(data)); }

function getSettings() {
    try { return JSON.parse(localStorage.getItem('pmo_settings')) || { departments: [], batches: [] }; } catch { return { departments: [], batches: [] }; }
}
function saveSettings(data) { localStorage.setItem('pmo_settings', JSON.stringify(data)); }

// ─── BADGE HELPER ────────────────────────────────────────────
function statusBadge(status) {
    const map = {
        approved: '<span class="badge badge-success">Approved</span>',
        pending: '<span class="badge badge-warning">Pending</span>',
        rejected: '<span class="badge badge-error">Rejected</span>',
    };
    return map[status] || `<span class="badge">${status}</span>`;
}

// ─── INIT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    // Active nav link highlight
    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(link => {
        if (link.href && window.location.pathname.endsWith(link.getAttribute('href')?.split('/').pop())) {
            link.classList.add('active');
        }
    });
});
