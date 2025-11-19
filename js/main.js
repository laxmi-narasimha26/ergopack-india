/**
 * ERGOPACK INDIA - PREMIUM JAVASCRIPT
 * Apple-Inspired Interactions & Animations
 */

// ====================================
// DOM READY - Optimized for Instant Response
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    // Use requestAnimationFrame for smooth initialization
    requestAnimationFrame(() => {
        initNavigation();
        initSmoothScroll();
        fadeInOnScroll();

        // Defer non-critical animations
        setTimeout(() => {
            initScrollEffects();
            initFloatingButtons();
            initParallax();
            initProductCardAnimations();
        }, 100);
    });
});

// ====================================
// NAVIGATION - Premium Glassmorphism
// ====================================
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const nav = document.querySelector('.nav');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
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

    // Close menu when clicking a link
    if (navMenu) {
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
            });
        });
    }

    // Add scrolled class to nav
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// ====================================
// SCROLL EFFECTS - Premium Animations
// ====================================
function initScrollEffects() {
    const nav = document.querySelector('.nav');

    window.addEventListener('scroll', function() {
        // Fade in elements on scroll
        fadeInOnScroll();

        // Update floating buttons visibility
        updateFloatingButtons();
    });
}

// ====================================
// FADE IN ON SCROLL
// ====================================
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.risk-card, .feature-item, .spec-category, .premium-card');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        // Trigger animation when element is 85% into viewport
        if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// ====================================
// SMOOTH SCROLL - Apple-style Easing
// ====================================
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

                // Smooth scroll with custom easing
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ====================================
// FLOATING BUTTONS - Apple iPad Style
// ====================================
function initFloatingButtons() {
    // Create floating "Compare Models" button
    createFloatingButton({
        id: 'floating-compare',
        text: 'Compare All Models →',
        href: 'compare.html',
        showAfter: '.solution-section',
        hideAfter: '.footer'
    });

    // Create floating "Request Elite Partnership" button
    createFloatingButton({
        id: 'floating-elite',
        text: 'Request Elite Partnership →',
        href: 'contact.html',
        showAfter: '.social-proof',
        hideAfter: '.cta-section'
    });

    // Initialize button visibility
    updateFloatingButtons();
}

/**
 * Create a floating button dynamically
 */
function createFloatingButton(config) {
    const { id, text, href, showAfter, hideAfter } = config;

    // Check if button already exists
    if (document.getElementById(id)) return;

    // Create button element
    const button = document.createElement('a');
    button.id = id;
    button.className = 'floating-compare';
    button.href = href;
    button.textContent = text;
    button.setAttribute('aria-label', text);

    // Append to body
    document.body.appendChild(button);

    // Store config in data attribute for later use
    button.dataset.showAfter = showAfter;
    button.dataset.hideAfter = hideAfter;

    // Add click tracking (for analytics if needed)
    button.addEventListener('click', function(e) {
        console.log(`Floating button clicked: ${id}`);
    });
}

/**
 * Update visibility of floating buttons based on scroll position
 */
function updateFloatingButtons() {
    const floatingButtons = document.querySelectorAll('.floating-compare, .floating-elite, .floating-roi, .floating-specs');

    floatingButtons.forEach(button => {
        const showAfterSelector = button.dataset.showAfter;
        const hideAfterSelector = button.dataset.hideAfter;

        const showAfterElement = document.querySelector(showAfterSelector);
        const hideAfterElement = document.querySelector(hideAfterSelector);

        if (!showAfterElement) return;

        const showAfterBottom = showAfterElement.offsetTop + showAfterElement.offsetHeight;
        const hideAfterTop = hideAfterElement ? hideAfterElement.offsetTop : Infinity;
        const scrollPos = window.scrollY + window.innerHeight;

        // Show button after scrolling past showAfter element
        // Hide button when reaching hideAfter element
        if (window.scrollY > showAfterBottom && scrollPos < hideAfterTop) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
}

// ====================================
// PARALLAX EFFECT - Subtle Hero Movement
// ====================================
function initParallax() {
    const heroVisual = document.querySelector('.hero-visual');
    const palletContainer = document.querySelector('.pallet-container');

    if (!heroVisual) return;

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;

        // Subtle parallax for hero visual
        if (heroVisual && scrolled < window.innerHeight) {
            const parallax = scrolled * 0.3;
            heroVisual.style.transform = `translateY(${parallax}px)`;
        }

        // 3D tilt effect on scroll for pallet
        if (palletContainer && scrolled < window.innerHeight) {
            const tiltAmount = Math.min(scrolled / 100, 5);
            const currentTransform = palletContainer.style.transform || '';

            // Preserve existing transforms while adding tilt
            if (!currentTransform.includes('perspective')) {
                palletContainer.style.transform = `translate(-50%, -50%) perspective(1000px) rotateX(-${tiltAmount}deg) rotateY(5deg)`;
            }
        }
    });

    // Mouse move 3D effect for pallet
    if (palletContainer) {
        document.addEventListener('mousemove', function(e) {
            const rect = palletContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            const rotateY = (mouseX / window.innerWidth) * 10;
            const rotateX = -(mouseY / window.innerHeight) * 10;

            palletContainer.style.transform = `translate(-50%, -50%) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }
}

// ====================================
// PRELOAD FADE-IN ANIMATION STYLES
// ====================================
function preloadStyles() {
    const elements = document.querySelectorAll('.risk-card, .feature-item, .spec-category, .premium-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
}

// Initialize preload
preloadStyles();

// ====================================
// PREMIUM HOVER EFFECTS
// ====================================

// Logo hover effect
const logoBoxes = document.querySelectorAll('.logo-box');
logoBoxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
});

// Feature icon pulse on hover
const featureIcons = document.querySelectorAll('.feature-icon');
featureIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.animation = 'iconPulse 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    icon.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// Add icon pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes iconPulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.08);
        }
    }

    /* Mobile nav menu styles */
    @media (max-width: 968px) {
        .nav-menu {
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.98);
            backdrop-filter: blur(20px) saturate(180%);
            flex-direction: column;
            padding: 2rem;
            gap: 1.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .nav-menu.active {
            display: flex;
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }

        .nav-menu li {
            width: 100%;
            text-align: center;
        }

        .nav-menu a {
            display: block;
            padding: 1rem;
            font-size: 18px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);

// ====================================
// INTERSECTION OBSERVER - Performance Optimized
// ====================================
if ('IntersectionObserver' in window) {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements
    const observeElements = document.querySelectorAll('.risk-card, .feature-item, .premium-card');
    observeElements.forEach(el => observer.observe(el));
}

// ====================================
// PRODUCT CARD INSTANT INTERACTIONS
// ====================================
function initProductCardAnimations() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach((card, index) => {
        // Instant click response
        card.addEventListener('click', function(e) {
            // Add instant visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });

        // Smooth hover effects with transform
        card.addEventListener('mouseenter', function() {
            this.style.willChange = 'transform';
        });

        card.addEventListener('mouseleave', function() {
            this.style.willChange = 'auto';
        });
    });
}

// ====================================
// PERFORMANCE OPTIMIZATIONS
// ====================================

// Throttled scroll handler for better performance
let scrollTicking = false;
window.addEventListener('scroll', function() {
    if (!scrollTicking) {
        window.requestAnimationFrame(function() {
            updateFloatingButtons();
            scrollTicking = false;
        });
        scrollTicking = true;
    }
}, { passive: true });

// Throttle resize events
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Handle resize if needed
        fadeInOnScroll();
    }, 250);
}, { passive: true });

// ====================================
// ACCESSIBILITY ENHANCEMENTS
// ====================================

// Keyboard navigation for floating buttons
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');

        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        }
    }
});

// Focus trap for mobile menu
const navMenu = document.querySelector('.nav-menu');
if (navMenu) {
    navMenu.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusableElements = navMenu.querySelectorAll('a, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    });
}

// ====================================
// CONSOLE SIGNATURE - Premium Branding
// ====================================
console.log('%cErgoPack India', 'color: #C8102E; font-size: 24px; font-weight: bold; font-family: Inter, sans-serif;');
console.log('%cPrecision Engineering for Zero-Failure Logistics', 'color: #86868B; font-size: 14px; font-family: Inter, sans-serif;');
console.log('%cMade in Germany. Engineered for Excellence.', 'color: #FFB81C; font-size: 12px; font-family: Inter, sans-serif; font-style: italic;');
console.log('%c ', 'padding: 20px 100px; background: linear-gradient(135deg, #C8102E 0%, #8B0000 100%); margin: 10px 0;');
