// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
         target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
         });
      }
   });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
   const scrollPosition = window.scrollY + 100;

   sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
         navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
               link.classList.add('active');
            }
         });
      }
   });
}

window.addEventListener('scroll', updateActiveNavLink);

// Navbar background on scroll
const navbar = document.querySelector('.navbar');

function updateNavbarBackground() {
   if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 14, 39, 0.95)';
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
   } else {
      navbar.style.background = 'rgba(10, 14, 39, 0.8)';
      navbar.style.boxShadow = 'none';
   }
}

window.addEventListener('scroll', updateNavbarBackground);

// Copy command to clipboard
const copyButtons = document.querySelectorAll('.copy-btn');

copyButtons.forEach(button => {
   button.addEventListener('click', async function () {
      const command = this.getAttribute('data-command');

      try {
         await navigator.clipboard.writeText(command);

         // Visual feedback
         const originalHTML = this.innerHTML;
         this.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
         this.style.color = '#43e97b';

         setTimeout(() => {
            this.innerHTML = originalHTML;
            this.style.color = '';
         }, 2000);
      } catch (err) {
         console.error('Failed to copy:', err);
      }
   });
});

// Intersection Observer for fade-in animations
const observerOptions = {
   threshold: 0.1,
   rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         entry.target.style.opacity = '1';
         entry.target.style.transform = 'translateY(0)';
      }
   });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll('.feature-card, .tutorial-card, .command-card, .resource-card');
animatedElements.forEach(el => {
   el.style.opacity = '0';
   el.style.transform = 'translateY(30px)';
   el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
   observer.observe(el);
});

// Terminal typing animation
const terminalLines = document.querySelectorAll('.terminal-line');
let delay = 0;

terminalLines.forEach((line, index) => {
   line.style.opacity = '0';
   setTimeout(() => {
      line.style.opacity = '1';
   }, delay);
   delay += 800;
});

// Add hover effect to buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
   button.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-2px)';
   });

   button.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
   });
});

// Parallax effect for gradient orbs
window.addEventListener('mousemove', (e) => {
   const orbs = document.querySelectorAll('.gradient-orb');
   const mouseX = e.clientX / window.innerWidth;
   const mouseY = e.clientY / window.innerHeight;

   orbs.forEach((orb, index) => {
      const speed = (index + 1) * 20;
      const x = mouseX * speed;
      const y = mouseY * speed;
      orb.style.transform = `translate(${x}px, ${y}px)`;
   });
});

// Add ripple effect to cards
function createRipple(event) {
   const card = event.currentTarget;
   const ripple = document.createElement('span');
   const rect = card.getBoundingClientRect();
   const size = Math.max(rect.width, rect.height);
   const x = event.clientX - rect.left - size / 2;
   const y = event.clientY - rect.top - size / 2;

   ripple.style.width = ripple.style.height = size + 'px';
   ripple.style.left = x + 'px';
   ripple.style.top = y + 'px';
   ripple.classList.add('ripple');

   card.appendChild(ripple);

   setTimeout(() => {
      ripple.remove();
   }, 600);
}

const cards = document.querySelectorAll('.feature-card, .tutorial-card, .resource-card');
cards.forEach(card => {
   card.style.position = 'relative';
   card.style.overflow = 'hidden';
   card.addEventListener('click', createRipple);
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
   const start = 0;
   const increment = target / (duration / 16);
   let current = start;

   const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
         element.textContent = target + '+';
         clearInterval(timer);
      } else {
         element.textContent = Math.floor(current) + '+';
      }
   }, 16);
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         const statNumbers = document.querySelectorAll('.stat-number');
         const values = [50, 100, 10000];
         statNumbers.forEach((stat, index) => {
            animateCounter(stat, values[index]);
         });
         statsObserver.unobserve(entry.target);
      }
   });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
   statsObserver.observe(heroStats);
}

// Console easter egg
console.log('%c🎉 Welcome to GitMaster!', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cMaster Git, one commit at a time.', 'color: #a0aec0; font-size: 14px;');
console.log('%cInterested in the code? Check out our GitHub!', 'color: #43e97b; font-size: 12px;');