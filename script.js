// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || window.scrollY;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const progress = Math.max(0, Math.min(1, scrollHeight ? scrollTop / scrollHeight : 0));
    doc.style.setProperty('--scroll-progress', `${progress * 100}%`);
    const parallax = -(scrollTop * 0.03);
    doc.style.setProperty('--hero-parallax', `${parallax}px`);
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll for anchor links
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

// Scroll spy for nav active state
const sectionIds = ['home', 'about', 'work', 'services', 'contact'];
const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);
const navLinksMap = new Map(
    Array.from(document.querySelectorAll('.nav-link'))
        .map(link => [link.getAttribute('href').replace('#', ''), link])
);

function updateActiveLink() {
    const scrollY = window.scrollY;
    const viewportCenter = scrollY + window.innerHeight * 0.3;
    let currentId = sectionIds[0];
    sections.forEach(sec => {
        if (sec.offsetTop <= viewportCenter) {
            currentId = sec.id;
        }
    });
    navLinksMap.forEach(link => link.classList.remove('active'));
    const activeLink = navLinksMap.get(currentId);
    if (activeLink) activeLink.classList.add('active');
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// Scroll animations for About section
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe About section elements
const aboutImageWrapper = document.querySelector('.about-image-wrapper');
const aboutContent = document.querySelector('.about-content');

if (aboutImageWrapper) observer.observe(aboutImageWrapper);
if (aboutContent) observer.observe(aboutContent);

// Observe Services section elements
const servicesHeader = document.querySelector('.services-header');
const serviceCards = document.querySelectorAll('.service-card');

if (servicesHeader) observer.observe(servicesHeader);
serviceCards.forEach((card, i) => {
    card.style.transitionDelay = `${(i + 1) * 0.12}s`;
    observer.observe(card);
});

// Observe Portfolio section elements
const portfolioHeader = document.querySelector('.portfolio-header');
const portfolioFilters = document.querySelector('.portfolio-filters');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (portfolioHeader) observer.observe(portfolioHeader);
if (portfolioFilters) observer.observe(portfolioFilters);
portfolioItems.forEach((item, i) => {
    item.style.transitionDelay = `${(i + 1) * 0.12}s`;
    observer.observe(item);
});

// Observe Testimonials section elements
const testimonialsHeader = document.querySelector('.testimonials-header');
const testimonialCards = document.querySelectorAll('.testimonial-card');

if (testimonialsHeader) observer.observe(testimonialsHeader);
testimonialCards.forEach((card, i) => {
    card.style.transitionDelay = `${(i + 1) * 0.12}s`;
    observer.observe(card);
});

// Observe Contact section elements
const contactContent = document.querySelector('.contact-content');
const contactAside = document.querySelector('.contact-aside');

if (contactContent) observer.observe(contactContent);
if (contactAside) observer.observe(contactAside);

// Portfolio filtering
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hidden');
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    });
});

// Theme Switcher Logic
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'light') {
    body.setAttribute('data-theme', 'light');
} else if (!savedTheme && !systemPrefersDark) {
    // Optional: Default to light if system prefers light and no save
    // body.setAttribute('data-theme', 'light'); 
}

// Toggle theme on click
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        if (currentTheme === 'light') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}
