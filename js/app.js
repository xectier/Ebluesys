/* ==========================================================================
   DIGITAL ATTENDANCE RECORD BOOK - EBLUESYS TECHNOLOGIES
   Interactive Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initProductTabs();
  initDashboardDemo();
  initTeacherWorkflow();
  initRoiCalculator();
  initFaqAccordion();
  initDemoModal();
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

    // Assumptions:
    // Manual attendance prep + reporting = ~45 mins/teacher/day = 0.75 hrs
    // Digital system saves ~70% of manual effort
    const daysPerMonth = 22;
    const hoursSavedPerTeacherMonth = 0.75 * 0.7 * daysPerMonth;
    const totalHoursSavedMonth = Math.round(teachers * hoursSavedPerTeacherMonth);

    // Estimated administrative cost saved per year
    const totalHoursYear = totalHoursSavedMonth * 10; // 10 academic months
    const approxHourlyValue = 350; // INR estimated administrative value rate
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
      // Simulate submission
      form.style.display = 'none';
      if (successState) successState.style.display = 'block';

      // Log event
      console.log('Demo Request Submitted:', {
        name: form.querySelector('#demo-name')?.value,
        institution: form.querySelector('#demo-inst')?.value,
        email: form.querySelector('#demo-email')?.value,
        phone: form.querySelector('#demo-phone')?.value
      });
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

  document.querySelectorAll('.feature-card, .friction-card, .pricing-card, .roadmap-card').forEach(el => {
    observer.observe(el);
  });
}
