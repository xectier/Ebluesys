/* ==========================================================================
   DIGITAL ATTENDANCE RECORD BOOK - EBLUESYS TECHNOLOGIES
   Interactive Application Logic (Upgraded Version)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initProductTabs();
  initProductTour();
  initDashboardDemo();
  initTeacherWorkflow();
  initRoiCalculator();
  initFaqAccordion();
  initDemoModal();
  initVideoDemo();
  initScrollAnimations();
});

/* Sticky Header on Scroll */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* Mobile Drawer Menu */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.mobile-menu');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
    });
  });
}

/* Product Introduction Showcase Tabs */
function initProductTabs() {
  const btns = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');

      btns.forEach(b => b.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const activeContent = document.getElementById(`tab-${tabId}`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });
}

/* Interactive Product Tour Component */
function initProductTour() {
  const tourBtns = document.querySelectorAll('.tour-tab-btn');
  const tourTitle = document.getElementById('tour-title');
  const tourDesc = document.getElementById('tour-desc');
  const tourBody = document.getElementById('tour-body');

  const tourData = {
    dashboard: {
      title: "Real-Time Institutional Command Dashboard",
      desc: "Live visibility into total attendance, absentees, and section metrics across your school.",
      body: `
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; margin-bottom:16px;">
          <div style="background:#1E293B; padding:12px; border-radius:8px;">Students: <b>1,240</b></div>
          <div style="background:#1E293B; padding:12px; border-radius:8px;">Present: <b style="color:#34D399;">1,184</b></div>
          <div style="background:#1E293B; padding:12px; border-radius:8px;">Absent: <b style="color:#F43F5E;">56</b></div>
        </div>
        <div style="background:#1E293B; padding:16px; border-radius:8px;">
          <div style="font-weight:700; font-size:13px; margin-bottom:8px;">Live Class Attendance Stream</div>
          <div style="font-size:12px; color:#94A3B8;">Class 10-A: 98% • Class 12-B: 94% • Class 8-C: 91%</div>
        </div>
      `
    },
    attendance: {
      title: "One-Click Mobile Attendance Marking",
      desc: "Fast, touch-optimized classroom marking workflow designed specifically for teachers.",
      body: `
        <div style="background:#1E293B; padding:16px; border-radius:8px;">
          <div style="font-weight:700; margin-bottom:12px;">Class 10-A • Period 2 Mathematics</div>
          <div style="display:flex; justify-content:space-between; padding:8px; background:#0F172A; border-radius:6px; margin-bottom:6px;">
            <span>Aarav Sharma</span> <span class="status-pill status-present">PRESENT</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding:8px; background:#0F172A; border-radius:6px;">
            <span>Devendra Roy</span> <span class="status-pill status-absent">ABSENT</span>
          </div>
        </div>
      `
    },
    reports: {
      title: "Automated Monthly & Daily Attendance Reports",
      desc: "Instant export of attendance registers in PDF and Excel CSV formats.",
      body: `
        <div style="background:#1E293B; padding:16px; border-radius:8px;">
          <div style="font-weight:700; margin-bottom:8px;">Monthly Register Report Generator</div>
          <div style="font-size:13px; color:#60A5FA; margin-bottom:12px;">Format: PDF Consolidated Register • Month: September 2026</div>
          <button class="btn btn-primary" style="padding:6px 16px; font-size:12px;">Download Sample PDF</button>
        </div>
      `
    },
    student: {
      title: "Individual Student Attendance Profile & Timeline",
      desc: "Instant historical lookup of student attendance percentages and absence dates.",
      body: `
        <div style="background:#1E293B; padding:16px; border-radius:8px;">
          <div style="font-weight:700; font-size:15px;">Aarav Sharma (Roll 01)</div>
          <div style="font-size:13px; color:#34D399; margin:4px 0 12px;">Overall Attendance Rate: 96.8%</div>
          <div style="font-size:12px; color:#94A3B8;">Recent Absences: 14 Aug (Medical), 02 Sep (Sick Leave)</div>
        </div>
      `
    },
    analytics: {
      title: "Actionable Visual Attendance Analytics",
      desc: "Turn attendance records into trends, comparisons, and actionable administrative insights.",
      body: `
        <div style="background:#1E293B; padding:16px; border-radius:8px;">
          <div style="font-weight:700; margin-bottom:8px;">Monthly Attendance Trend Comparison</div>
          <div style="font-size:12px; color:#94A3B8;">Aug: 94.2% → Sep: 95.5% (↑ 1.3% Improvement)</div>
        </div>
      `
    }
  };

  tourBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tourKey = btn.getAttribute('data-tour');

      tourBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const data = tourData[tourKey];
      if (data) {
        if (tourTitle) tourTitle.textContent = data.title;
        if (tourDesc) tourDesc.textContent = data.desc;
        if (tourBody) tourBody.innerHTML = data.body;
      }
    });
  });
}

/* Interactive Dashboard Demo Filters */
function initDashboardDemo() {
  const filterBtns = document.querySelectorAll('.dash-filter-btn');
  const kpiPresent = document.getElementById('kpi-present');
  const kpiAbsent = document.getElementById('kpi-absent');
  const kpiRate = document.getElementById('kpi-rate');

  const demoData = {
    today: { present: '1,184', absent: '56', rate: '95.5%' },
    week: { present: '1,210', absent: '30', rate: '97.5%' },
    c10: { present: '284', absent: '12', rate: '95.9%' },
    c12: { present: '310', absent: '8', rate: '97.4%' }
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterKey = btn.getAttribute('data-filter');
      const data = demoData[filterKey] || demoData.today;

      if (kpiPresent) kpiPresent.textContent = data.present;
      if (kpiAbsent) kpiAbsent.textContent = data.absent;
      if (kpiRate) kpiRate.textContent = data.rate;
    });
  });
}

/* Teacher Mobile Workflow Step Switcher */
function initTeacherWorkflow() {
  const steps = document.querySelectorAll('.wf-step-item');
  const screenTitle = document.getElementById('phone-screen-title');
  const screenContent = document.getElementById('phone-screen-body');

  const screenData = [
    {
      title: 'Class 10-A • Mathematics',
      content: `
        <div class="phone-student-item"><span>01. Aarav Sharma</span> <span class="status-pill status-present">PRESENT</span></div>
        <div class="phone-student-item"><span>02. Ananya Patel</span> <span class="status-pill status-present">PRESENT</span></div>
        <div class="phone-student-item"><span>03. Devendra Roy</span> <span class="status-pill status-absent">ABSENT</span></div>
        <div class="phone-student-item"><span>04. Ishaan Verma</span> <span class="status-pill status-late">LATE</span></div>
      `
    },
    {
      title: 'Quick Toggle Attendance',
      content: `
        <div class="phone-student-item"><span>05. Meera Kapoor</span> <span class="status-pill status-present">PRESENT</span></div>
        <div class="phone-student-item"><span>06. Rohan Sen</span> <span class="status-pill status-present">PRESENT</span></div>
        <div class="phone-student-item"><span>07. Riya Gupta</span> <span class="status-pill status-present">PRESENT</span></div>
      `
    },
    {
      title: 'Instant Sync & Review',
      content: `
        <div style="text-align:center; padding: 20px 0;">
          <div style="width: 48px; height: 48px; background: rgba(16,185,129,0.2); color: #10B981; border-radius: 50%; display:flex; align-items:center; justify-content:center; margin: 0 auto 12px; font-weight:800; font-size:20px;">✓</div>
          <div style="font-weight:700; font-size:15px; margin-bottom:4px;">Attendance Saved</div>
          <div style="font-size:12px; color:#94A3B8;">Synced with Admin Office</div>
        </div>
      `
    }
  ];

  steps.forEach((step, index) => {
    step.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');

      if (screenData[index]) {
        if (screenTitle) screenTitle.textContent = screenData[index].title;
        if (screenContent) screenContent.innerHTML = screenData[index].content;
      }
    });
  });
}

/* Interactive ROI Calculator */
function initRoiCalculator() {
  const studentSlider = document.getElementById('roi-students');
  const teacherSlider = document.getElementById('roi-teachers');
  const studentOutput = document.getElementById('roi-students-val');
  const teacherOutput = document.getElementById('roi-teachers-val');
  const hoursOutput = document.getElementById('roi-hours-saved');
  const costOutput = document.getElementById('roi-cost-saved');

  if (!studentSlider || !teacherSlider) return;

  function calculateROI() {
    const students = parseInt(studentSlider.value);
    const teachers = parseInt(teacherSlider.value);

    studentOutput.textContent = students.toLocaleString();
    teacherOutput.textContent = teachers.toLocaleString();

    const daysPerMonth = 22;
    const hoursSavedPerTeacherMonth = 0.75 * 0.7 * daysPerMonth;
    const totalHoursSavedMonth = Math.round(teachers * hoursSavedPerTeacherMonth);

    const totalHoursYear = totalHoursSavedMonth * 10;
    const approxHourlyValue = 350;
    const estimatedSavingsINR = (totalHoursYear * approxHourlyValue).toLocaleString('en-IN');

    if (hoursOutput) hoursOutput.textContent = `${totalHoursSavedMonth} hrs/mo`;
    if (costOutput) costOutput.textContent = `₹${estimatedSavingsINR}/yr`;
  }

  studentSlider.addEventListener('input', calculateROI);
  teacherSlider.addEventListener('input', calculateROI);

  calculateROI();
}

/* FAQ Accordion Toggle */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* Video Demo Frame Interaction */
function initVideoDemo() {
  const playBtn = document.querySelector('.play-btn-circle');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      alert("Platform Video Tour: Teacher marks attendance -> Admin dashboard updates in real-time -> Monthly PDF report generated!");
    });
  }
}

/* Demo Request Modal Popup & Lead Capture Form */
function initDemoModal() {
  const modal = document.getElementById('demo-modal');
  const triggers = document.querySelectorAll('.trigger-demo-modal');
  const closeBtn = document.querySelector('.modal-close');
  const form = document.getElementById('demo-form');
  const successState = document.getElementById('demo-success');

  if (!modal) return;

  triggers.forEach(trig => {
    trig.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      if (successState) successState.style.display = 'block';

      console.log('Demo Request Submitted:', {
        name: form.querySelector('#demo-name')?.value,
        institution: form.querySelector('#demo-inst')?.value,
        email: form.querySelector('#demo-email')?.value,
        phone: form.querySelector('#demo-phone')?.value,
        currentSystem: form.querySelector('#demo-current-system')?.value
      });
    });
  }

  // Handle contact.html standalone form
  const contactForm = document.getElementById('contact-page-form');
  const contactSuccess = document.getElementById('contact-success');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.style.display = 'none';
      if (contactSuccess) contactSuccess.style.display = 'block';
    });
  }
}

/* Scroll Intersection Animations */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card, .friction-card, .pricing-card, .roadmap-card, .cost-card, .role-card').forEach(el => {
    observer.observe(el);
  });
}
