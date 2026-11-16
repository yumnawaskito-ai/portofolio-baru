/* ===================================================================
   PORTFOLIO INTERACTIVE SCRIPT - MALIK YUMNA
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Ambient Mouse Glow Effect (Desktop)
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileItems = document.querySelectorAll('.mobile-item');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    mobileItems.forEach(item => {
      item.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // 3. ScrollSpy Navigation (Active Link on Scroll)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-pill .nav-item');

  const highlightNav = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const sectionHeight = sec.offsetHeight;
      const sectionTop = sec.offsetTop - 120;
      const sectionId = sec.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // 4. Animated Counters for Stats
  const counters = document.querySelectorAll('.counter');
  let counterStarted = false;

  const runCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1200; // 1.2s
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentVal = Math.floor(progress * target);
        counter.textContent = currentVal;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counterStarted) {
        counterStarted = true;
        runCounters();
      }
    }, { threshold: 0.3 });

    observer.observe(heroSection);
  }

  // 5. Project Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCat === filterValue) {
          card.style.display = 'block';
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Animate Skill Progress Bars on Scroll
  const skillSection = document.getElementById('skills');
  const skillBars = document.querySelectorAll('.progress-bar .fill');

  if (skillSection) {
    const skillObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        skillBars.forEach(bar => {
          const targetWidth = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, 100);
        });
        skillObserver.unobserve(skillSection);
      }
    }, { threshold: 0.25 });

    skillObserver.observe(skillSection);
  }

  // 7. Interactive Contact Form Handler
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      formFeedback.className = 'form-feedback success';
      formFeedback.innerHTML = `Terima kasih, <strong>${name}</strong>! Pesan Anda telah terkirim. Anda juga dapat langsung menghubungi via WhatsApp untuk respons instan.`;

      // Optional: Prepare WhatsApp direct link
      const encodedMsg = encodeURI(`Halo Malik, nama saya ${name}. Kebutuhan: ${subject}. Pesan: ${message}`);
      const waButton = document.createElement('a');
      waButton.href = `https://wa.me/6281234567890?text=${encodedMsg}`;
      waButton.target = '_blank';
      waButton.className = 'btn btn-red';
      waButton.style.marginTop = '15px';
      waButton.style.display = 'inline-flex';
      waButton.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Lanjut Kirim ke WhatsApp';

      formFeedback.appendChild(document.createElement('br'));
      formFeedback.appendChild(waButton);

      contactForm.reset();
    });
  }

});
