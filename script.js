// Custom Cursor removal complete (Already gone from previous iteration)

// Smooth Scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            const offset = 80; // Account for fixed nav height if any
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Update active state in nav if applicable
            if (this.closest('nav')) {
                document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        }
    });
});

// Typing Effect for Terminal
const terminalText = document.getElementById('typing-text');
const phrases = [
    "> REQUESTING_ACCESS...",
    "> ACCESS_GRANTED",
    "> LOADING_CORE_MODULES...",
    "> TIMMYDEV_READY."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    if (!terminalText) return;

    if (isDeleting) {
        terminalText.textContent = currentPhrase.substring(0, charIndex--);
    } else {
        terminalText.textContent = currentPhrase.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentPhrase.length + 1) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(type, typingSpeed);
}

document.addEventListener('DOMContentLoaded', type);

// Parallax effect for Hero BG
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    const bg = document.querySelector('.hero-bg-wrapper');
    if (bg) {
        bg.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-50%)`;
    }
});

// Contact Form Simulation
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.btn-submit');
        const originalText = btn.textContent;

        btn.textContent = 'TRANSMITTING...';
        btn.disabled = true;

        // Simulating network delay
        setTimeout(() => {
            btn.textContent = 'SUCCESS';
            formStatus.textContent = '> TRANSMISSION_RECEIVED. I WILL RESPOND SHORTLY.';
            formStatus.style.display = 'block';
            formStatus.style.color = 'var(--accent)';

            contactForm.reset();

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// Mobile Reveal on Scroll
const revealMobileElements = document.querySelectorAll('.reveal-mobile');

if (revealMobileElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0,
        rootMargin: "0px 0px -10px 0px"
    });

    revealMobileElements.forEach(el => revealObserver.observe(el));
}

console.log('TIMMYDEV Signature 2026 — Simplified Initialization.');

// Theme Toggle Logic
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
}

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}
