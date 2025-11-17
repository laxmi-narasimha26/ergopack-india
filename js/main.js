/**
 * ErgoPack India - Premium Optimized JavaScript
 * Performance-optimized with RAF throttling, Intersection Observer, and efficient DOM operations
 */

// DOM Ready with performance optimizations
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    initNavigation();
    initScrollEffects();
    initSmoothScroll();
    initIntersectionObserver();
    initParallax();
}

/**
 * Navigation Toggle (Mobile) - Optimized
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const nav = document.querySelector('.nav');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        }, { passive: true });

        // Close menu when clicking outside - optimized with event delegation
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.nav-container')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }, { passive: true });

        // Close menu when clicking nav links
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }, { passive: true });
        });
    }
}

/**
 * Scroll Effects - Throttled with RAF for 60fps performance
 */
function initScrollEffects() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let ticking = false;
    let lastScroll = 0;

    function updateNav(scrollPos) {
        // Add scrolled class and shadow
        if (scrollPos > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = scrollPos;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNav(window.pageYOffset);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial check
    updateNav(window.pageYOffset);
}

/**
 * Intersection Observer for Fade-in Animations
 * Much more performant than scroll events
 */
function initIntersectionObserver() {
    // Check if browser supports Intersection Observer
    if (!('IntersectionObserver' in window)) {
        // Fallback: just show all elements
        document.querySelectorAll('.risk-card, .feature-item').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with fade-in animation
    document.querySelectorAll('.risk-card, .feature-item').forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        observer.observe(element);
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const navHeight = document.querySelector('.nav')?.offsetHeight || 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Parallax Effect for Hero - RAF throttled for smooth 60fps
 */
function initParallax() {
    const heroVisual = document.querySelector('.hero-visual');
    if (!heroVisual) return;

    let ticking = false;

    function updateParallax(scrollPos) {
        // Only apply parallax if element is in viewport
        const rect = heroVisual.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const parallax = scrollPos * 0.3;
            heroVisual.style.transform = `translateY(${parallax}px)`;
        }
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax(window.pageYOffset);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial position
    updateParallax(window.pageYOffset);
}

/**
 * Preload and optimize images (if needed)
 */
function preloadCriticalImages() {
    // Add any critical images here for preloading
    // Example:
    // const images = ['path/to/critical/image.jpg'];
    // images.forEach(src => {
    //     const img = new Image();
    //     img.src = src;
    // });
}

// Optional: Add loading state removal
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
}, { passive: true });

// Optional: Debounced resize handler for responsive adjustments
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Add any resize-specific logic here
        console.log('Window resized');
    }, 250);
}, { passive: true });
