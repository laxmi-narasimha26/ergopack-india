/**
 * ErgoPack India - Main JavaScript
 * Handles navigation, scroll effects, and general interactions
 */

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initSmoothScroll();
});

/**
 * Navigation Toggle (Mobile)
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        }
    });
}

/**
 * Scroll Effects
 */
function initScrollEffects() {
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add shadow to nav on scroll
        if (currentScroll > 50) {
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }

        // Fade in elements on scroll
        fadeInOnScroll();

        lastScroll = currentScroll;
    });
}

/**
 * Fade in elements on scroll
 */
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.risk-card, .feature-item, .spec-category');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
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

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize subtle parallax effect for hero section
 */
window.addEventListener('scroll', function() {
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.3;
        heroVisual.style.transform = `translateY(${parallax}px)`;
    }
});

/**
 * Add hover effect to client logos
 */
const logoBoxes = document.querySelectorAll('.logo-box');
logoBoxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

/**
 * Preload critical styles
 */
function preloadStyles() {
    const elements = document.querySelectorAll('.risk-card, .feature-item, .spec-category');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// Initialize preload
preloadStyles();
