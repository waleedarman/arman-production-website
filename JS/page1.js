
var swiper = new Swiper(".gallerySwiper", {
  slidesPerView: 1,
  spaceBetween: 25,
  loop: true,
  centeredSlides: false,
  autoplay: { delay: 2500, disableOnInteraction: false },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  breakpoints: { 
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1080: { slidesPerView: 3 }
  }
});

const openVimeo = document.getElementById('openVimeo');
const vimeoPopup = document.getElementById('vimeoPopup');
const closeVimeo = document.getElementById('closeVimeo');
const vimeoPlayer = document.getElementById('vimeoPlayer');

openVimeo.addEventListener('click', () => {
  vimeoPopup.classList.add('active');
  vimeoPlayer.src += "&autoplay=1";
});

closeVimeo.addEventListener('click', () => {
  vimeoPopup.classList.remove('active');
  vimeoPlayer.src = vimeoPlayer.src.replace("&autoplay=1", "");
});






// Loading Screen
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 800);
});

// Particle Background Animation
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = 50;
  
  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height;
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 181, 51, ${this.opacity})`;
      ctx.fill();
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    // Connect nearby particles
    particles.forEach((particle, i) => {
      particles.slice(i + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(245, 181, 51, ${0.1 * (1 - distance / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      });
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Scroll Reveal Animation
function initScrollReveal() {
  const reveals = document.querySelectorAll('.service-card, .portfolio figure, .why li, section h2, .contact-card');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal', 'active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  reveals.forEach(element => {
    element.classList.add('reveal');
    revealObserver.observe(element);
  });
}

// Smooth scroll for anchor links - منع تحديث الصفحة
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const href = this.getAttribute('href');
    if (href && href !== '#') {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // تحديث الـ hash بدون refresh
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    }
  });
});

// منع تحديث الصفحة عند الضغط على روابط index.html إذا كانت الصفحة الحالية
document.querySelectorAll('a[href="/index.html"], a[href="index.html"]').forEach(link => {
  link.addEventListener('click', function (e) {
    if (window.location.pathname === '/index.html' || window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')) {
      e.preventDefault();
      e.stopPropagation();
      // إذا كان هناك hash، انتقل إليه
      const hash = this.getAttribute('href').split('#')[1];
      if (hash) {
        const target = document.querySelector('#' + hash);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      } else {
        // انتقل للأعلى
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Swiper Gallery
var swiper = new Swiper(".gallerySwiper", {
  slidesPerView: 1,
  spaceBetween: 25,
  loop: true,
  centeredSlides: false,
  autoplay: { 
    delay: 3000, 
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  navigation: { 
    nextEl: ".swiper-button-next", 
    prevEl: ".swiper-button-prev" 
  },
  effect: 'slide',
  speed: 600,
  breakpoints: { 
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1080: { slidesPerView: 3 }
  }
});


if (openVimeo) {
  openVimeo.addEventListener('click', () => {
    vimeoPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
    vimeoPlayer.src += "&autoplay=1";
  });
}

if (closeVimeo) {
  closeVimeo.addEventListener('click', () => {
    vimeoPopup.classList.remove('active');
    document.body.style.overflow = '';
    vimeoPlayer.src = vimeoPlayer.src.replace("&autoplay=1", "");
  });
  
  vimeoPopup.addEventListener('click', (e) => {
    if (e.target === vimeoPopup) {
      vimeoPopup.classList.remove('active');
      document.body.style.overflow = '';
      vimeoPlayer.src = vimeoPlayer.src.replace("&autoplay=1", "");
    }
  });
}

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.site-header');

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Header shadow effect
  if (currentScroll > 100) {
    header.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.3)';
  } else {
    header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
  }
  
  // Show/hide scroll to top button
  if (scrollToTopBtn) {
    if (currentScroll > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  }
  
  lastScroll = currentScroll;
});

// Scroll to top functionality
if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// منع تحديث الصفحة عند الضغط على زر الرئيسية
document.addEventListener('DOMContentLoaded', () => {
  const homeLink = document.querySelector('.nav-link[data-section="home"]');
  if (homeLink) {
    homeLink.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // منع تحديث الصفحة لجميع روابط الـ nav
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          e.stopPropagation();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    }
  });
});

// Navigation bar active state management
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav a');
  
  // Function to set active link
  function setActiveLink(linkElement) {
    // Remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));
    // Add active class to clicked link
    if (linkElement) {
      linkElement.classList.add('active');
      // Save to localStorage
      const linkHref = linkElement.getAttribute('href');
      if (linkHref) {
        localStorage.setItem('activeNavLink', linkHref);
      }
    }
  }
  
  // Determine active link based on current page and hash
  function determineActiveLink() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    
    // Check if we're on index.html (home page)
    if (currentPath === '/index.html' || currentPath === '/' || currentPath.endsWith('/index.html')) {
      // First check if there's a saved active link in localStorage
      const savedActiveLink = localStorage.getItem('activeNavLink');
      
      // If saved link is a hash link and matches current hash, use it
      if (savedActiveLink && savedActiveLink.startsWith('#') && currentHash === savedActiveLink) {
        const savedLink = document.querySelector(`.nav a[href="${savedActiveLink}"]`);
        if (savedLink) {
          setActiveLink(savedLink);
          return;
        }
      }
      
      // Check hash links
      navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // For hash links, check if current hash matches
        if (linkHref.startsWith('#') && currentHash === linkHref) {
          setActiveLink(link);
          return;
        }
      });
      
      // If no hash or hash doesn't match any link, set home as active
      if (!document.querySelector('.nav a.active')) {
        const homeLink = document.querySelector('.nav a[href="/index.html"], .nav a[href="index.html"], .nav a[href="#home"]');
        if (homeLink) setActiveLink(homeLink);
      }
    }
  }
  
  // Set initial active link
  determineActiveLink();
  
  // Add click event listeners to all nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const linkHref = this.getAttribute('href');
      
      // If it's a hash link (starts with #), set it as active immediately
      if (linkHref.startsWith('#')) {
        setActiveLink(this);
      } else if (linkHref.includes('page2.html')) {
        // For page2, set it as active (will persist when page loads)
        setActiveLink(this);
      } else if (linkHref === '/index.html' || linkHref === 'index.html') {
        // For home page, set it as active
        setActiveLink(this);
      }
    });
  });
  
  // Update active link when hash changes (for smooth scrolling)
  window.addEventListener('hashchange', () => {
    determineActiveLink();
  });
  
  // Also check on scroll to update active state for sections
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const currentPath = window.location.pathname;
      if (currentPath === '/index.html' || currentPath === '/' || currentPath.endsWith('/index.html')) {
        const sections = document.querySelectorAll('section[id], main[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const correspondingLink = document.querySelector(`.nav a[href="#${sectionId}"]`);
            if (correspondingLink) {
              setActiveLink(correspondingLink);
            }
          }
        });
        
        // If at top of page, set home as active
        if (window.scrollY < 100) {
          const homeLink = document.querySelector('.nav a[href="/index.html"], .nav a[href="index.html"]');
          if (homeLink) setActiveLink(homeLink);
        }
      }
    }, 100);
  });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initScrollReveal();
  initNavigation();
  
  // Add stagger animation to service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
});


const servicesSwiper = new Swiper('.servicesOne', {
  slidesPerView: 1,
  loop: true,
  effect: 'fade',
  fadeEffect: { crossFade: true },
  speed: 700,
  autoplay: {
    delay: 2200,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  pagination: {
    el: '.services-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.services-next',
    prevEl: '.services-prev'
  },
  allowTouchMove: true
});



const pureImageSlider = new Swiper('.pureImages', {
  slidesPerView: 1,
  loop: true,
  speed: 900,
  effect: 'fade',
  fadeEffect: { crossFade: true },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  pagination: {
    el: '.pureImages .swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.pureImages .swiper-button-next',
    prevEl: '.pureImages .swiper-button-prev'
  }
});


