// Mobile menu toggle
function toggleMenu() {
    const nav = document.querySelector('.nav');
    const menuButton = document.querySelector('.menu-button');
    
    nav.classList.toggle('show');
    menuButton.setAttribute('aria-expanded', 
        menuButton.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
    );
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const nav = document.querySelector('.nav');
    const menuButton = document.querySelector('.menu-button');
    
    if (!nav.contains(e.target) && !menuButton.contains(e.target)) {
        nav.classList.remove('show');
        menuButton.setAttribute('aria-expanded', 'false');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.querySelector('.nav');
        const menuButton = document.querySelector('.menu-button');
        nav.classList.remove('show');
        menuButton.setAttribute('aria-expanded', 'false');
    });
});

// Smooth scrolling for anchor links
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

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;

    const logo = document.querySelector(".logo-icon");
    if (window.scrollY > 50) {
        logo.classList.add("shrink");
    } else {
        logo.classList.remove("shrink");
    }
});