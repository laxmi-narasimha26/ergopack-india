/**
 * ErgoPack India - Product Page JavaScript
 * Handles 3D model interactions, hotspots, and modals
 */

document.addEventListener('DOMContentLoaded', function() {
    init3DModelInteraction();
    initHotspots();
    initModals();
});

/**
 * 3D Model Rotation Interaction
 */
function init3DModelInteraction() {
    const modelContainer = document.getElementById('model3d');
    if (!modelContainer) return;

    const modelRender = modelContainer.querySelector('.model-render');
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let rotationX = 0;
    let rotationY = 0;

    modelContainer.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        modelContainer.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        rotationY += deltaX * 0.5;
        rotationX -= deltaY * 0.5;

        // Limit vertical rotation
        rotationX = Math.max(-30, Math.min(30, rotationX));

        modelRender.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

        startX = e.clientX;
        startY = e.clientY;
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        if (modelContainer) {
            modelContainer.style.cursor = 'grab';
        }
    });

    // Touch support for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    modelContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    modelContainer.addEventListener('touchmove', function(e) {
        e.preventDefault();

        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;

        const deltaX = touchX - touchStartX;
        const deltaY = touchY - touchStartY;

        rotationY += deltaX * 0.5;
        rotationX -= deltaY * 0.5;

        rotationX = Math.max(-30, Math.min(30, rotationX));

        modelRender.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

        touchStartX = touchX;
        touchStartY = touchY;
    });
}

/**
 * Hotspot Interactions
 */
function initHotspots() {
    const hotspots = document.querySelectorAll('.hotspot');

    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', function(e) {
            e.stopPropagation();
            const feature = this.getAttribute('data-feature');
            openModal(feature);
        });

        // Add hover effect
        hotspot.addEventListener('mouseenter', function() {
            const pulse = this.querySelector('.hotspot-pulse');
            if (pulse) {
                pulse.style.animationDuration = '1s';
            }
        });

        hotspot.addEventListener('mouseleave', function() {
            const pulse = this.querySelector('.hotspot-pulse');
            if (pulse) {
                pulse.style.animationDuration = '2s';
            }
        });
    });
}

/**
 * Modal System
 */
function initModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    // Close button click
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Click outside to close
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    closeModal(modal);
                }
            });
        }
    });
}

/**
 * Open Modal
 */
function openModal(feature) {
    const modal = document.getElementById(`modal-${feature}`);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Add entrance animation
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.animation = 'modalSlideUp 0.3s ease';
        }
    }
}

/**
 * Close Modal
 */
function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Animate specification items on scroll
 */
window.addEventListener('scroll', function() {
    const specItems = document.querySelectorAll('.spec-item');

    specItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (itemTop < windowHeight * 0.9) {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 50);
        }
    });
});

// Initialize spec items
document.querySelectorAll('.spec-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

/**
 * Exploded view components animation
 */
const components = document.querySelectorAll('.component');
components.forEach((component, index) => {
    component.style.animationDelay = `${index * 0.1}s`;
});
