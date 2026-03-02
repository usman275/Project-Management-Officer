/**
 * storage.js — localStorage data layer
 * Project Management System
 */

const DB = {
  USERS: 'pmo_users',
  PROJECTS: 'pmo_projects',
  ANNOUNCEMENTS: 'pmo_announcements',
  DEPARTMENTS: 'pmo_departments',
  BATCHES: 'pmo_batches',
  SESSION: 'pmo_session',
  ADMIN: 'pmo_admin',
  ACTIVITY: 'pmo_activity',
};

/* ── helpers ─────────────────────────────────────────────── */
function load(key, fallback = []) {
  try {
    const d = localStorage.getItem(key);
    return d ? JSON.parse(d) : fallback;
  } catch { return fallback; }
}

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function now() {
  return new Date().toISOString();
}

/* ── seed defaults ───────────────────────────────────────── */
function seedIfEmpty() {
  // Admin credentials
  if (!localStorage.getItem(DB.ADMIN)) {
    save(DB.ADMIN, { username: 'admin', password: 'admin123', name: 'System Admin', email: 'admin@projectmanagement.com' });
  }

  // Departments / Teams
  if (!localStorage.getItem(DB.DEPARTMENTS)) {
    save(DB.DEPARTMENTS, [
      { id: 'd1', name: 'Engineering', code: 'ENG', color: 'blue' },
      { id: 'd2', name: 'Software Development', code: 'DEV', color: 'purple' },
      { id: 'd3', name: 'Design & UX', code: 'DES', color: 'gold' },
      { id: 'd4', name: 'Information Technology', code: 'IT', color: 'green' },
      { id: 'd5', name: 'Data & AI', code: 'AI', color: 'red' },
      { id: 'd6', name: 'Product Management', code: 'PM', color: 'blue' },
    ]);
  }

  // Years
  if (!localStorage.getItem(DB.BATCHES)) {
    save(DB.BATCHES, ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026']);
  }

  // Demo users
  if (!localStorage.getItem(DB.USERS)) {
    save(DB.USERS, [
      {
        id: 'u1', name: 'Zain Abbas', employeeId: 'ENG-2021-001',
        email: 'zain@company.com', department: 'Engineering',
        batch: '2021', password: btoa('zain123'), status: 'active',
        createdAt: '2024-01-15T10:00:00.000Z', avatar: 'ZA'
      },
      {
        id: 'u2', name: 'Ayesha Khan', employeeId: 'DEV-2022-015',
        email: 'ayesha@company.com', department: 'Software Development',
        batch: '2022', password: btoa('ayesha123'), status: 'active',
        createdAt: '2024-01-18T09:30:00.000Z', avatar: 'AK'
      },
      {
        id: 'u3', name: 'Bilal Hussain', employeeId: 'AI-2023-042',
        email: 'bilal@company.com', department: 'Data & AI',
        batch: '2023', password: btoa('bilal123'), status: 'active',
        createdAt: '2024-02-05T11:20:00.000Z', avatar: 'BH'
      },
      {
        id: 'u4', name: 'Sara Malik', employeeId: 'IT-2020-033',
        email: 'sara@company.com', department: 'Information Technology',
        batch: '2020', password: btoa('sara123'), status: 'inactive',
        createdAt: '2023-09-10T08:00:00.000Z', avatar: 'SM'
      },
      {
        id: 'u5', name: 'Hamza Riaz', employeeId: 'ENG-2021-007',
        email: 'hamza@company.com', department: 'Engineering',
        batch: '2021', password: btoa('hamza123'), status: 'active',
        createdAt: '2024-03-01T14:00:00.000Z', avatar: 'HR'
      },
    ]);
  }

  // Demo projects
  if (!localStorage.getItem(DB.PROJECTS)) {
    save(DB.PROJECTS, [
      {
        id: 'p1', title: 'AI-powered Medical Diagnosis System',
        abstract: 'A deep learning-based system that analyzes medical images (X-rays, MRIs) to assist doctors in diagnosing various diseases including pneumonia, tumors, and bone fractures. The system uses convolutional neural networks trained on a dataset of over 100,000 annotated medical images, achieving 94.7% accuracy. The web-based interface allows radiologists to upload images and receive instant AI-generated diagnostic reports with confidence scores.',
        supervisor: 'Tariq Mehmood', department: 'Engineering',
        batch: '2021', tags: ['Machine Learning', 'Healthcare', 'CNN', 'Deep Learning'],
        githubUrl: 'https://github.com/example/ai-diagnosis',
        authorId: 'u1', authorName: 'Zain Abbas',
        status: 'approved', likes: 24, views: 156,
        createdAt: '2024-05-10T12:00:00.000Z',
        pdfName: null, pdfData: null
      },
      {
        id: 'p2', title: 'Blockchain-Based Record Management',
        abstract: 'A decentralized application (DApp) for secure and tamper-proof management of organizational records. Using Ethereum blockchain and smart contracts, the system ensures that certificates, reports, and credentials cannot be forged. Employees can share verifiable credentials with stakeholders, and organizations can instantly verify authenticity.',
        supervisor: 'Nadia Tariq', department: 'Software Development',
        batch: '2022', tags: ['Blockchain', 'Ethereum', 'Smart Contracts', 'Web3'],
        githubUrl: '',
        authorId: 'u2', authorName: 'Ayesha Khan',
        status: 'approved', likes: 18, views: 98,
        createdAt: '2024-06-01T09:00:00.000Z',
        pdfName: null, pdfData: null
      },
      {
        id: 'p3', title: 'Real-Time Sign Language Recognition with Computer Vision',
        abstract: 'A computer vision application that translates sign language gestures into text and speech in real time. Using MediaPipe for hand landmark detection and a custom LSTM model for sequence classification, the system achieves 91% recognition accuracy across 500+ unique gestures. The application runs on consumer-grade webcams and aims to bridge the communication gap for the hearing-impaired community.',
        supervisor: 'Kamran Ali', department: 'Data & AI',
        batch: '2023', tags: ['Computer Vision', 'Sign Language', 'LSTM', 'MediaPipe', 'Accessibility'],
        githubUrl: 'https://github.com/example/psl-recognition',
        authorId: 'u3', authorName: 'Bilal Hussain',
        status: 'pending', likes: 31, views: 212,
        createdAt: '2024-07-15T14:30:00.000Z',
        pdfName: null, pdfData: null
      },
      {
        id: 'p4', title: 'Smart Office IoT Energy Management System',
        abstract: 'An IoT-based system for monitoring and optimizing energy consumption across office buildings. The system integrates smart meters, occupancy sensors, and weather data to predict energy demand and automate HVAC and lighting controls. A real-time dashboard provides facility managers with actionable insights, and the system has demonstrated 23% reduction in energy costs during pilot testing.',
        supervisor: 'Asad Sheikh', department: 'Engineering',
        batch: '2021', tags: ['IoT', 'Energy Management', 'Smart Office', 'MQTT', 'Dashboard'],
        githubUrl: '',
        authorId: 'u5', authorName: 'Hamza Riaz',
        status: 'approved', likes: 15, views: 78,
        createdAt: '2024-04-20T10:00:00.000Z',
        pdfName: null, pdfData: null
      },
      {
        id: 'p5', title: 'NLP-Based Automated Document Summarizer',
        abstract: 'A natural language processing pipeline that automatically summarizes business documents and reports. The system combines a fine-tuned transformer model with an extractive-abstractive hybrid approach to generate coherent, fluent summaries. The model outperforms existing summarization baselines by 8.3 ROUGE points. A browser extension delivers one-click summaries on any web page.',
        supervisor: 'Farah Naz', department: 'Information Technology',
        batch: '2020', tags: ['NLP', 'Transformers', 'Text Summarization', 'Productivity', 'AI'],
        githubUrl: 'https://github.com/example/urdu-nlp',
        authorId: 'u4', authorName: 'Sara Malik',
        status: 'approved', likes: 42, views: 334,
        createdAt: '2023-12-10T11:00:00.000Z',
        pdfName: null, pdfData: null
      },
    ]);
  }

  // Announcements
  if (!localStorage.getItem(DB.ANNOUNCEMENTS)) {
    save(DB.ANNOUNCEMENTS, [
      {
        id: 'a1', title: '📢 Project Submission Deadline — Q1 2025',
        body: 'All employees must upload their project documentation and source code by March 31st, 2025. Late submissions will not be accepted. Contact your project manager for the required documentation checklist.',
        createdAt: '2025-01-20T08:00:00.000Z', adminId: 'admin', pinned: true
      },
      {
        id: 'a2', title: '🏆 Best Project Awards 2024 — Nominations Open',
        body: 'The organization is accepting nominations for the Best Project Award for 2024. Managers can nominate outstanding projects through the admin portal. Winners will be announced at the Annual Project Showcase on April 15th.',
        createdAt: '2025-01-15T10:30:00.000Z', adminId: 'admin', pinned: false
      },
      {
        id: 'a3', title: '🔄 New PDF Upload Limit — 50MB',
        body: 'The maximum PDF upload size has been increased to 50MB to accommodate comprehensive project documentation. Please ensure your documentation follows the standard project report template available on the employee portal.',
        createdAt: '2025-01-10T14:00:00.000Z', adminId: 'admin', pinned: false
      },
    ]);
  }

  // Activity log
  if (!localStorage.getItem(DB.ACTIVITY)) {
    save(DB.ACTIVITY, [
      { id: uid(), type: 'user_joined', msg: '<strong>Bilal Hussain</strong> joined as a new employee', icon: '👤', color: 'blue', time: '2024-07-15T10:00:00.000Z' },
      { id: uid(), type: 'project_approved', msg: '<strong>"AI Medical Diagnosis"</strong> project was approved', icon: '✅', color: 'green', time: '2024-06-02T09:00:00.000Z' },
      { id: uid(), type: 'project_added', msg: '<strong>Ayesha Khan</strong> uploaded a new project', icon: '📁', color: 'purple', time: '2024-06-01T09:00:00.000Z' },
      { id: uid(), type: 'announcement', msg: 'New announcement posted: <strong>Project Submission Deadline</strong>', icon: '📢', color: 'gold', time: '2025-01-20T08:00:00.000Z' },
    ]);
  }
}

/* ── USER CRUD ───────────────────────────────────────────── */
const Users = {
  all() { return load(DB.USERS); },
  get(id) { return this.all().find(u => u.id === id) || null; },
  byEmail(email) { return this.all().find(u => u.email.toLowerCase() === email.toLowerCase()) || null; },

  create(data) {
    const users = this.all();
    const user = { ...data, id: uid(), createdAt: now(), status: 'active' };
    users.push(user);
    save(DB.USERS, users);
    _logActivity('user_joined', `<strong>${user.name}</strong> joined as a new employee`, '👤', 'blue');
    return user;
  },

  update(id, data) {
    const users = this.all().map(u => u.id === id ? { ...u, ...data } : u);
    save(DB.USERS, users);
  },

  delete(id) {
    const user = this.get(id);
    const users = this.all().filter(u => u.id !== id);
    save(DB.USERS, users);
    // also remove their projects
    const projects = Projects.all().filter(p => p.authorId !== id);
    save(DB.PROJECTS, projects);
    if (user) _logActivity('user_deleted', `<strong>${user.name}</strong> was removed by admin`, '🗑️', 'red');
  },

  toggleStatus(id) {
    const u = this.get(id);
    if (!u) return;
    this.update(id, { status: u.status === 'active' ? 'inactive' : 'active' });
  },

  search(query) {
    const q = query.toLowerCase();
    return this.all().filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.employeeId || '').toLowerCase().includes(q) ||
      u.department.toLowerCase().includes(q)
    );
  }
};

/* ── PROJECT CRUD ────────────────────────────────────────── */
const Projects = {
  all() { return load(DB.PROJECTS); },
  get(id) { return this.all().find(p => p.id === id) || null; },
  byUser(uid) { return this.all().filter(p => p.authorId === uid); },
  approved() { return this.all().filter(p => p.status === 'approved'); },
  pending() { return this.all().filter(p => p.status === 'pending'); },

  create(data) {
    const projects = this.all();
    const project = { ...data, id: uid(), createdAt: now(), likes: 0, views: 0, status: 'pending' };
    projects.push(project);
    save(DB.PROJECTS, projects);
    _logActivity('project_added', `<strong>${data.authorName}</strong> uploaded "<strong>${data.title}</strong>"`, '📁', 'purple');
    return project;
  },

  update(id, data) {
    const projects = this.all().map(p => p.id === id ? { ...p, ...data } : p);
    save(DB.PROJECTS, projects);
  },

  delete(id) {
    const p = this.get(id);
    const projects = this.all().filter(p => p.id !== id);
    save(DB.PROJECTS, projects);
    if (p) _logActivity('project_deleted', `"<strong>${p.title}</strong>" was deleted`, '🗑️', 'red');
  },

  approve(id) {
    const p = this.get(id);
    this.update(id, { status: 'approved' });
    if (p) _logActivity('project_approved', `"<strong>${p.title}</strong>" was approved`, '✅', 'green');
  },

  reject(id) {
    const p = this.get(id);
    this.update(id, { status: 'rejected' });
    if (p) _logActivity('project_rejected', `"<strong>${p.title}</strong>" was rejected`, '❌', 'red');
  },

  incrementView(id) {
    const p = this.get(id);
    if (p) this.update(id, { views: (p.views || 0) + 1 });
  },

  toggleLike(id) {
    const p = this.get(id);
    if (!p) return;
    const liked = JSON.parse(localStorage.getItem('pmo_liked') || '[]');
    const idx = liked.indexOf(id);
    if (idx === -1) {
      liked.push(id);
      this.update(id, { likes: (p.likes || 0) + 1 });
    } else {
      liked.splice(idx, 1);
      this.update(id, { likes: Math.max(0, (p.likes || 0) - 1) });
    }
    localStorage.setItem('pmo_liked', JSON.stringify(liked));
    return idx === -1;
  },

  isLiked(id) {
    const liked = JSON.parse(localStorage.getItem('pmo_liked') || '[]');
    return liked.includes(id);
  },

  search(query, dept, batch, status) {
    let results = this.all();
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.abstract.toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.toLowerCase().includes(q)) ||
        p.supervisor.toLowerCase().includes(q) ||
        p.authorName.toLowerCase().includes(q)
      );
    }
    if (dept) results = results.filter(p => p.department === dept);
    if (batch) results = results.filter(p => p.batch === batch);
    if (status) results = results.filter(p => p.status === status);
    return results;
  }
};

/* ── ANNOUNCEMENTS CRUD ──────────────────────────────────── */
const Announcements = {
  all() { return load(DB.ANNOUNCEMENTS); },
  get(id) { return this.all().find(a => a.id === id) || null; },
  pinned() { return this.all().filter(a => a.pinned); },
  recent(n = 5) { return [...this.all()].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, n); },

  create(data) {
    const ann = this.all();
    const a = { ...data, id: uid(), createdAt: now(), adminId: 'admin' };
    ann.unshift(a);
    save(DB.ANNOUNCEMENTS, ann);
    _logActivity('announcement', `New announcement: "<strong>${data.title}</strong>"`, '📢', 'gold');
    return a;
  },

  update(id, data) {
    const ann = this.all().map(a => a.id === id ? { ...a, ...data } : a);
    save(DB.ANNOUNCEMENTS, ann);
  },

  delete(id) {
    const ann = this.all().filter(a => a.id !== id);
    save(DB.ANNOUNCEMENTS, ann);
  }
};

/* ── DEPARTMENTS / BATCHES ───────────────────────────────── */
const Departments = {
  all() { return load(DB.DEPARTMENTS); },
  names() { return this.all().map(d => d.name); },
  get(id) { return this.all().find(d => d.id === id) || null; },

  create(name, code) {
    const deps = this.all();
    const d = { id: uid(), name, code: code.toUpperCase(), color: 'blue' };
    deps.push(d);
    save(DB.DEPARTMENTS, deps);
    return d;
  },

  update(id, data) {
    const deps = this.all().map(d => d.id === id ? { ...d, ...data } : d);
    save(DB.DEPARTMENTS, deps);
  },

  delete(id) {
    const deps = this.all().filter(d => d.id !== id);
    save(DB.DEPARTMENTS, deps);
  }
};

const Batches = {
  all() { return load(DB.BATCHES); },
  add(year) { const b = this.all(); if (!b.includes(year)) { b.push(year); b.sort((a, bc) => b - bc); save(DB.BATCHES, b); } },
  remove(year) { save(DB.BATCHES, this.all().filter(b => b !== year)); },
};

/* ── SESSION ─────────────────────────────────────────────── */
const Session = {
  get() { return load(DB.SESSION, null); },
  set(data) { localStorage.setItem(DB.SESSION, JSON.stringify(data)); },
  clear() { localStorage.removeItem(DB.SESSION); },
  isLoggedIn() { return !!this.get(); },
  isAdmin() { const s = this.get(); return s && s.role === 'admin'; },
  isEmployee() { const s = this.get(); return s && s.role === 'employee'; },
  isStudent() { const s = this.get(); return s && s.role === 'employee'; }, // alias
  currentUser() { const s = this.get(); if (!s || !s.userId) return null; return Users.get(s.userId); },
};

/* ── ADMIN ───────────────────────────────────────────────── */
const Admin = {
  credentials() { return load(DB.ADMIN, { username: 'admin', password: 'admin123' }); },
  verify(u, p) { const a = this.credentials(); return a.username === u && a.password === p; },
  updatePassword(newPass) {
    const a = this.credentials();
    save(DB.ADMIN, { ...a, password: newPass });
  },
};

/* ── ACTIVITY LOG ────────────────────────────────────────── */
function _logActivity(type, msg, icon, color) {
  const log = load(DB.ACTIVITY);
  log.unshift({ id: uid(), type, msg, icon, color, time: now() });
  save(DB.ACTIVITY, log.slice(0, 100)); // keep last 100
}

const Activity = {
  all() { return load(DB.ACTIVITY); },
  recent(n) { return this.all().slice(0, n || 10); },
};

/* ── STATS ───────────────────────────────────────────────── */
const Stats = {
  get() {
    const users = Users.all();
    const projects = Projects.all();
    return {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      totalProjects: projects.length,
      approved: projects.filter(p => p.status === 'approved').length,
      pending: projects.filter(p => p.status === 'pending').length,
      rejected: projects.filter(p => p.status === 'rejected').length,
      departments: Departments.all().length,
      totalViews: projects.reduce((s, p) => s + (p.views || 0), 0),
      totalLikes: projects.reduce((s, p) => s + (p.likes || 0), 0),
    };
  },
  byDept() {
    const projects = Projects.all();
    const map = {};
    projects.forEach(p => { map[p.department] = (map[p.department] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  },
  byBatch() {
    const projects = Projects.all();
    const map = {};
    Batches.all().forEach(b => {
      map[b] = projects.filter(p => p.batch === b).length;
    });
    return Object.entries(map).sort((a, b) => a[0] - b[0]).slice(-6);
  }
};

// Initialize seed data on load
seedIfEmpty();
