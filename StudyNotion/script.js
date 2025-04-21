// Performance Optimizations
const requestIdleCallback = window.requestIdleCallback || function(cb) {
    return setTimeout(() => {
        const start = Date.now();
        cb({
            didTimeout: false,
            timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
        });
    }, 1);
};

// Lazy Loading with Intersection Observer
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
            }
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.1
});

// Mobile menu functionality
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

function toggleMenu() {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('active');
    
    // Update body class for scroll lock
    document.body.classList.toggle('menu-open', !isExpanded);
}

menuButton.addEventListener('click', toggleMenu);

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuButton.contains(e.target) && nav.classList.contains('active')) {
        toggleMenu();
    }
});

// Close menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
        toggleMenu();
    }
});

// Form Validation with Accessibility
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            
            // Focus first invalid input
            const firstInvalid = form.querySelector(':invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
        form.classList.add('was-validated');
    });
});

// Performance Monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
        
        // Report to analytics
        if (typeof gtag === 'function') {
            gtag('event', 'timing_complete', {
                'name': 'load',
                'value': pageLoadTime,
                'event_category': 'Page Load'
            });
        }
    });
}

// Smooth Scrolling with Accessibility
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Update focus for screen readers
            target.setAttribute('tabindex', '-1');
            target.focus();
        }
    });
});

// Lazy Load Images
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Offline Detection
window.addEventListener('online', () => {
    document.querySelector('.offline-message')?.classList.remove('show');
});

window.addEventListener('offline', () => {
    document.querySelector('.offline-message')?.classList.add('show');
});

// Install Prompt
let deferredPrompt;
const installButton = document.querySelector('.install-button');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installButton?.classList.remove('hidden');
});

installButton?.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            installButton.classList.add('hidden');
        }
        deferredPrompt = null;
    }
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

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'images/StudySyn.svg',
        'images/VectorEdu.svg',
        'images/avatar1.png'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload on page load
window.addEventListener('load', preloadImages);

// Responsive Navigation
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuButton.contains(e.target)) {
        nav.classList.remove('active');
    }
});