/* ==========================================================================
   SHARED NAVBAR COMPONENT - EBLUESYS DIGITAL ATTENDANCE RECORD BOOK
   Injected via JavaScript on every page for 100% UI and functional consistency.
   Provides:
   - Unified Header with Brand Logo & Active Link Detection
   - Interactive Desktop Dropdown Menus (Solutions, More)
   - Universal Search Bar Button (Cmd+K / Ctrl+K)
   - Light / Dark Theme Switcher with localStorage sync
   - Mobile Navigation Drawer with sub-menus and search
   - Global Command Palette Search Modal with real-time filtering
   ========================================================================== */

const SEARCH_ITEMS = [
  // Primary Pages
  { title: "Product Command Center", desc: "Interactive tour, command dashboard, and institutional sync", url: "product.html", tag: "Product", category: "Core Pages" },
  { title: "Dashboard Layout Templates", desc: "Teacher, admin, analytics, reports, and mobile screen layouts", url: "layouts.html", tag: "Layouts", category: "Core Pages" },
  { title: "Core Platform Features", desc: "One-click marking, monitoring, analytics, and instant reporting", url: "features.html", tag: "Features", category: "Core Pages" },
  { title: "Teacher & Admin Workflow", desc: "3-step workflow for faculty and centralized oversight for principals", url: "how-it-works.html", tag: "Guide", category: "Core Pages" },
  { title: "Institutional Solutions", desc: "Tailored workflows for schools, colleges, coaching, and trusts", url: "solutions.html", tag: "Solutions", category: "Core Pages" },
  { title: "Security & Data Governance", desc: "Role-based access control (RBAC), encryption, and compliance", url: "security.html", tag: "Security", category: "Core Pages" },
  { title: "Pricing & ROI Calculator", desc: "Transparent institutional tiers and paper register savings calculator", url: "pricing.html", tag: "Pricing", category: "Core Pages" },
  { title: "About Ebluesys Technologies", desc: "Our mission, company story, leadership, and educational focus", url: "about.html", tag: "Company", category: "Core Pages" },
  { title: "Book a Live 15-Minute Demo", desc: "Schedule a 1-on-1 walkthrough with an institutional specialist", url: "contact.html", tag: "Action", category: "Action" },

  // Solutions Segments
  { title: "K-12 Schools Attendance", desc: "Daily roll-call, period tracking, and automated parent SMS alerts", url: "solutions.html#schools", tag: "Schools", category: "Solutions" },
  { title: "Colleges & Universities", desc: "Lecture-wise attendance, elective tracking, and credit audits", url: "solutions.html#colleges", tag: "Colleges", category: "Solutions" },
  { title: "Coaching & Test Prep Institutes", desc: "Batch timing schedules, fee-attendance sync, and student tracking", url: "solutions.html#coaching", tag: "Coaching", category: "Solutions" },
  { title: "Educational Groups & Trusts", desc: "Multi-branch consolidated command dashboard and cross-campus analytics", url: "solutions.html#groups", tag: "Groups", category: "Solutions" },

  // Layouts & Screens
  { title: "Teacher Attendance Marking Screen", desc: "Fast 30-second one-tap student marking interface", url: "layouts.html#teacher-screen", tag: "Screen", category: "Layouts" },
  { title: "Institution Analytics Dashboard", desc: "Visual trend line charts, class comparisons, and daily averages", url: "layouts.html#analytics-screen", tag: "Screen", category: "Layouts" },
  { title: "Automated Attendance Reports", desc: "Statutory monthly registers, defaulter lists, and PDF/Excel exports", url: "layouts.html#reports-screen", tag: "Screen", category: "Layouts" },
  { title: "Student Attendance Profile", desc: "Individual student calendar view, guardian logs, and absentee history", url: "layouts.html#student-profile", tag: "Screen", category: "Layouts" },
  { title: "Mobile Teacher Dashboard", desc: "Smartphone optimized offline-first attendance recording interface", url: "layouts.html#mobile-dashboard", tag: "Screen", category: "Layouts" },

  // Features Deep Dive
  { title: "One-Click Quick Attendance", desc: "Fast bulk marking with preset defaults for instant roll-call", url: "features.html", tag: "Feature", category: "Features" },
  { title: "Real-Time Central Monitoring", desc: "Live stream of marked and pending attendance across all grades", url: "features.html", tag: "Feature", category: "Features" },
  { title: "Automated SMS & WhatsApp Alerts", desc: "Instant automated notifications to parents for unexcused absences", url: "features.html", tag: "Feature", category: "Features" },
  { title: "Role-Based Permissions (RBAC)", desc: "Granular access for teachers, class teachers, HODs, principals, and admins", url: "security.html", tag: "Security", category: "Security" }
];

export function initSharedNavbar() {
  // Ensure dedicated navbar component stylesheet is attached
  if (!document.querySelector('link[href*="navbar.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/navbar.css';
    document.head.appendChild(link);
  }

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  const isHome = currentPath === '' || currentPath === 'index.html';
  const isProduct = currentPath.includes('product');
  const isLayouts = currentPath.includes('layouts');
  const isFeatures = currentPath.includes('features');
  const isHowItWorks = currentPath.includes('how-it-works');
  const isSolutions = currentPath.includes('solutions');
  const isSecurity = currentPath.includes('security');
  const isPricing = currentPath.includes('pricing');
  const isAbout = currentPath.includes('about');
  const isContact = currentPath.includes('contact');

  // 1. Generate Header HTML
  const headerHTML = `
    <div class="container nav-container">
      <a href="index.html" class="logo-group" aria-label="Ebluesys Home">
        <div class="logo-icon">E</div>
        <div class="logo-text">
          <span class="brand-name">Ebluesys</span>
          <span class="brand-tag">Attendance Record Book</span>
        </div>
      </a>

      <!-- Desktop Navigation Menu -->
      <nav class="nav-menu-wrapper" aria-label="Primary Navigation">
        <ul class="nav-menu">
          <li><a href="product.html" class="nav-link ${isProduct ? 'nav-link-active' : ''}">Product</a></li>
          <li><a href="layouts.html" class="nav-link ${isLayouts ? 'nav-link-active' : ''}">Layouts</a></li>
          <li><a href="features.html" class="nav-link ${isFeatures ? 'nav-link-active' : ''}">Features</a></li>
          <li><a href="how-it-works.html" class="nav-link ${isHowItWorks ? 'nav-link-active' : ''}">How It Works</a></li>

          <!-- Solutions Dropdown Menu -->
          <li class="nav-item-dropdown" id="nav-dropdown-solutions">
            <button class="nav-dropdown-toggle nav-link ${isSolutions ? 'nav-link-active' : ''}" type="button" aria-expanded="false" aria-haspopup="true">
              <span>Solutions</span>
              <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="nav-dropdown-menu" role="menu" aria-label="Solutions options">
              <a href="solutions.html#schools" class="nav-dropdown-link" role="menuitem">
                <span class="nav-dropdown-icon">🏫</span>
                <div class="nav-dropdown-text-group">
                  <span class="nav-dropdown-title">K-12 Schools</span>
                  <span class="nav-dropdown-desc">Daily roll call & parent SMS alerts</span>
                </div>
              </a>
              <a href="solutions.html#colleges" class="nav-dropdown-link" role="menuitem">
                <span class="nav-dropdown-icon">🎓</span>
                <div class="nav-dropdown-text-group">
                  <span class="nav-dropdown-title">Colleges & Universities</span>
                  <span class="nav-dropdown-desc">Lecture-wise attendance & credit audits</span>
                </div>
              </a>
              <a href="solutions.html#coaching" class="nav-dropdown-link" role="menuitem">
                <span class="nav-dropdown-icon">✏️</span>
                <div class="nav-dropdown-text-group">
                  <span class="nav-dropdown-title">Coaching & Institutes</span>
                  <span class="nav-dropdown-desc">Batch shift schedules & test tracking</span>
                </div>
              </a>
              <a href="solutions.html#groups" class="nav-dropdown-link" role="menuitem">
                <span class="nav-dropdown-icon">🏢</span>
                <div class="nav-dropdown-text-group">
                  <span class="nav-dropdown-title">Educational Groups & Trusts</span>
                  <span class="nav-dropdown-desc">Multi-campus consolidated dashboard</span>
                </div>
              </a>
              <div class="nav-dropdown-divider"></div>
              <a href="solutions.html" class="nav-dropdown-footer-link" role="menuitem">
                <span>View All Institutional Solutions</span>
                <span>→</span>
              </a>
            </div>
          </li>

          <li><a href="security.html" class="nav-link ${isSecurity ? 'nav-link-active' : ''}">Security</a></li>
          <li><a href="pricing.html" class="nav-link ${isPricing ? 'nav-link-active' : ''}">Pricing</a></li>

          <!-- More / Company Dropdown -->
          <li class="nav-item-dropdown" id="nav-dropdown-more">
            <button class="nav-dropdown-toggle nav-link ${(isAbout || isContact) ? 'nav-link-active' : ''}" type="button" aria-expanded="false" aria-haspopup="true">
              <span>More</span>
              <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="nav-dropdown-menu" role="menu" aria-label="Company options" style="min-width: 240px;">
              <a href="about.html" class="nav-dropdown-link ${isAbout ? 'active-item' : ''}" role="menuitem">
                <span class="nav-dropdown-icon">🏢</span>
                <div class="nav-dropdown-text-group">
                  <span class="nav-dropdown-title">About Ebluesys</span>
                  <span class="nav-dropdown-desc">Our vision, leadership & team</span>
                </div>
              </a>
              <a href="contact.html" class="nav-dropdown-link ${isContact ? 'active-item' : ''}" role="menuitem">
                <span class="nav-dropdown-icon">💬</span>
                <div class="nav-dropdown-text-group">
                  <span class="nav-dropdown-title">Contact & Support</span>
                  <span class="nav-dropdown-desc">Direct phone, email & demos</span>
                </div>
              </a>
            </div>
          </li>
        </ul>
      </nav>

      <!-- Nav Action Bar -->
      <div class="nav-actions">
        <!-- Search Bar Button -->
        <button class="nav-search-btn cmd-k-btn" type="button" aria-label="Search website" title="Search website">
          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <span class="nav-search-text">Search...</span>
        </button>

        <!-- Theme Toggle Switcher -->
        <button class="theme-toggle-btn" type="button" aria-label="Toggle theme" title="Toggle dark/light theme">
          <svg class="theme-icon" style="width:15px; height:15px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
        </button>

        <!-- Book a Demo Button -->
        <a href="contact.html" class="btn btn-primary nav-cta-btn">Book a Demo</a>

        <!-- Mobile Drawer Toggle -->
        <button class="mobile-toggle" type="button" aria-label="Toggle navigation menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  `;

  // 2. Generate Mobile Drawer HTML
  const mobileMenuHTML = `
    <div class="mobile-menu" id="mobile-menu-drawer" aria-hidden="true">
      <div class="mobile-menu-top">
        <a href="index.html" class="logo-group">
          <div class="logo-icon">E</div>
          <div class="logo-text">
            <span class="brand-name">Ebluesys</span>
            <span class="brand-tag">Attendance Book</span>
          </div>
        </a>
        <button class="mobile-close-btn" type="button" aria-label="Close navigation menu">✕</button>
      </div>

      <!-- Quick Search Trigger inside Mobile Drawer -->
      <button class="mobile-search-btn cmd-k-btn" type="button">
        <div style="display:flex; align-items:center; gap:10px;">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <span>Search entire website...</span>
        </div>
        <span class="cmd-k-badge">⌘K</span>
      </button>

      <ul class="mobile-nav-list">
        <li><a href="product.html" class="mobile-nav-link ${isProduct ? 'nav-link-active' : ''}">Product Console</a></li>
        <li><a href="layouts.html" class="mobile-nav-link ${isLayouts ? 'nav-link-active' : ''}">Dashboard Layouts</a></li>
        <li><a href="features.html" class="mobile-nav-link ${isFeatures ? 'nav-link-active' : ''}">Platform Features</a></li>
        <li><a href="how-it-works.html" class="mobile-nav-link ${isHowItWorks ? 'nav-link-active' : ''}">How It Works</a></li>
        
        <li class="mobile-dropdown-group">
          <div class="mobile-group-header">
            <a href="solutions.html" class="mobile-nav-link ${isSolutions ? 'nav-link-active' : ''}">Solutions</a>
            <span class="mobile-badge">4 Segments</span>
          </div>
          <div class="mobile-sub-menu">
            <a href="solutions.html#schools" class="mobile-sub-link">🏫 K-12 Schools</a>
            <a href="solutions.html#colleges" class="mobile-sub-link">🎓 Colleges & Universities</a>
            <a href="solutions.html#coaching" class="mobile-sub-link">✏️ Coaching & Tuition Centers</a>
            <a href="solutions.html#groups" class="mobile-sub-link">🏢 Educational Groups & Trusts</a>
          </div>
        </li>

        <li><a href="security.html" class="mobile-nav-link ${isSecurity ? 'nav-link-active' : ''}">Security & Governance</a></li>
        <li><a href="pricing.html" class="mobile-nav-link ${isPricing ? 'nav-link-active' : ''}">Pricing & Plans</a></li>
        <li><a href="about.html" class="mobile-nav-link ${isAbout ? 'nav-link-active' : ''}">About Ebluesys</a></li>
        <li><a href="contact.html" class="mobile-nav-link ${isContact ? 'nav-link-active' : ''}">Contact & Support</a></li>
      </ul>

      <div class="mobile-menu-footer">
        <div class="mobile-theme-row">
          <span style="font-size: 14px; font-weight: 600;">Theme Appearance</span>
          <button class="theme-toggle-btn mobile-theme-btn" type="button" aria-label="Toggle theme">
            <svg style="width:14px; height:14px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            <span class="theme-label-text">Toggle Mode</span>
          </button>
        </div>
        <a href="contact.html" class="btn btn-primary" style="width: 100%; justify-content: center; margin-top: 8px;">Book a Live Demo</a>
      </div>
    </div>
  `;

  // 3. Generate Command Palette Modal HTML
  const commandPaletteHTML = `
    <div class="cmd-palette-backdrop" id="cmd-palette" role="dialog" aria-modal="true" aria-label="Search website">
      <div class="cmd-palette-box">
        <div class="cmd-palette-header">
          <svg style="width:18px; height:18px; color:#94A3B8; flex-shrink:0;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" class="cmd-palette-input" placeholder="Search pages, features, layouts, solutions, pricing..." aria-label="Search website" autocomplete="off" spellcheck="false">
          <button class="cmd-palette-close" type="button" aria-label="Close search">ESC</button>
        </div>
        <div class="cmd-palette-results" id="cmd-palette-results">
          ${renderSearchResults(SEARCH_ITEMS)}
        </div>
      </div>
    </div>
  `;

  // 4. Inject into Document
  // Target container: element with id="navbar-root" or existing <header class="header">
  let headerMount = document.getElementById('navbar-root') || document.querySelector('header.header');
  if (!headerMount) {
    headerMount = document.createElement('header');
    headerMount.className = 'header';
    headerMount.id = 'navbar-root';
    document.body.prepend(headerMount);
  } else {
    headerMount.className = 'header';
    headerMount.id = 'navbar-root';
  }
  headerMount.innerHTML = headerHTML;

  // Remove any legacy mobile menu or command palette in DOM to avoid duplicate bindings
  document.querySelectorAll('#mobile-menu-drawer, .mobile-menu').forEach(el => el.remove());
  document.querySelectorAll('#cmd-palette, .cmd-palette-backdrop').forEach(el => el.remove());

  // Insert mobile menu right after headerMount
  headerMount.insertAdjacentHTML('afterend', mobileMenuHTML);

  // Insert Command Palette before end of body
  document.body.insertAdjacentHTML('beforeend', commandPaletteHTML);

  // 5. Wire Up Interactions
  setupHeaderScroll(headerMount);
  setupDropdowns(headerMount);
  setupMobileDrawer();
  setupCommandPalette();
  setupThemeToggle();
}

function renderSearchResults(items) {
  if (!items || !items.length) {
    return `<div style="padding: 24px; text-align: center; color: #94A3B8; font-size: 14px;">No matching results found.</div>`;
  }

  // Group by category
  const categories = {};
  items.forEach(item => {
    const cat = item.category || 'General';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(item);
  });

  return Object.keys(categories).map(cat => `
    <div class="cmd-result-group-title">${cat}</div>
    ${categories[cat].map(item => `
      <a href="${item.url}" class="cmd-result-item">
        <div>
          <div style="font-weight:600; color:#F8FAFC;">${item.title}</div>
          <div style="font-size:12px; color:#94A3B8; margin-top:2px;">${item.desc}</div>
        </div>
        <span class="cmd-tag">${item.tag}</span>
      </a>
    `).join('')}
  `).join('');
}

function setupHeaderScroll(header) {
  const updateScroll = () => {
    if (window.scrollY > 15) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();
}

function setupDropdowns(header) {
  const dropdowns = header.querySelectorAll('.nav-item-dropdown');

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    const menu = dropdown.querySelector('.nav-dropdown-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');

      // Close other dropdowns
      dropdowns.forEach(d => {
        if (d !== dropdown) {
          d.classList.remove('open');
          const t = d.querySelector('.nav-dropdown-toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        dropdown.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        dropdown.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard navigation
    dropdown.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdown.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      dropdowns.forEach(d => {
        d.classList.remove('open');
        const t = d.querySelector('.nav-dropdown-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

function setupMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.getElementById('mobile-menu-drawer');
  const closeBtn = drawer?.querySelector('.mobile-close-btn');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('active', 'open');
    toggleBtn.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('active', 'open');
    toggleBtn.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open') || drawer.classList.contains('active')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  // Close when clicking any link inside drawer
  drawer.querySelectorAll('.mobile-nav-link, .mobile-sub-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Auto-close if resized to desktop window width
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && (drawer.classList.contains('open') || drawer.classList.contains('active'))) {
      closeDrawer();
    }
  }, { passive: true });
}

function setupCommandPalette() {
  const palette = document.getElementById('cmd-palette');
  const input = palette?.querySelector('.cmd-palette-input');
  const resultsContainer = document.getElementById('cmd-palette-results');
  const closeBtn = palette?.querySelector('.cmd-palette-close');

  if (!palette || !input) return;

  const openPalette = () => {
    palette.classList.add('active');
    input.value = '';
    if (resultsContainer) resultsContainer.innerHTML = renderSearchResults(SEARCH_ITEMS);
    setTimeout(() => input.focus(), 60);
  };

  const closePalette = () => {
    palette.classList.remove('active');
  };

  // Open triggers
  document.querySelectorAll('.cmd-k-btn, .nav-search-btn, .mobile-search-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openPalette();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closePalette);

  // Keyboard shortcut Ctrl+K / Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      palette.classList.contains('active') ? closePalette() : openPalette();
    }
    if (e.key === 'Escape' && palette.classList.contains('active')) {
      closePalette();
    }
  });

  // Click outside to close
  palette.addEventListener('click', (e) => {
    if (e.target === palette) closePalette();
  });

  // Real-time Search Filter
  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    if (!query) {
      if (resultsContainer) resultsContainer.innerHTML = renderSearchResults(SEARCH_ITEMS);
      return;
    }

    const filtered = SEARCH_ITEMS.filter(item => {
      return item.title.toLowerCase().includes(query) ||
             item.desc.toLowerCase().includes(query) ||
             item.tag.toLowerCase().includes(query) ||
             item.category.toLowerCase().includes(query);
    });

    if (resultsContainer) resultsContainer.innerHTML = renderSearchResults(filtered);
  });
}

function setupThemeToggle() {
  const currentTheme = localStorage.getItem('ebluesys_theme') || 'dark';
  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('ebluesys_theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('ebluesys_theme', 'light');
      }
    });
  });
}

// Auto-initialize when script loads or DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSharedNavbar);
} else {
  initSharedNavbar();
}
