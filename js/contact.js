/**
 * ErgoPack India - Contact Form JavaScript
 * Handles form validation and submission
 */

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

/**
 * Initialize Contact Form
 */
function initContactForm() {
    const form = document.getElementById('invitationForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate form
        if (validateForm(form)) {
            submitForm(form);
        }
    });

    // Real-time validation for email
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateEmail(this);
        });
    }

    // Real-time validation for phone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            validatePhone(this);
        });
    }
}

/**
 * Validate Form
 */
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'This field is required');
            isValid = false;
        } else {
            clearError(field);
        }
    });

    // Validate email format
    const emailField = document.getElementById('email');
    if (emailField && !validateEmail(emailField)) {
        isValid = false;
    }

    // Validate phone format
    const phoneField = document.getElementById('phone');
    if (phoneField && !validatePhone(phoneField)) {
        isValid = false;
    }

    // Validate consent checkbox
    const consentField = document.getElementById('consent');
    if (consentField && !consentField.checked) {
        showError(consentField, 'You must consent to continue');
        isValid = false;
    }

    return isValid;
}

/**
 * Validate Email
 */
function validateEmail(field) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const value = field.value.trim();

    if (!emailRegex.test(value)) {
        showError(field, 'Please enter a valid corporate email address');
        return false;
    }

    // Check for common free email providers (encourage corporate email)
    const freeProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const domain = value.split('@')[1];

    if (freeProviders.includes(domain)) {
        showWarning(field, 'Please use your corporate email address');
    } else {
        clearError(field);
    }

    return true;
}

/**
 * Validate Phone
 */
function validatePhone(field) {
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    const value = field.value.trim();

    if (!phoneRegex.test(value) || value.length < 10) {
        showError(field, 'Please enter a valid phone number');
        return false;
    }

    clearError(field);
    return true;
}

/**
 * Show Error
 */
function showError(field, message) {
    clearError(field);

    field.style.borderColor = '#c41e3a';

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#c41e3a';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;

    field.parentNode.appendChild(errorDiv);
}

/**
 * Show Warning
 */
function showWarning(field, message) {
    clearError(field);

    field.style.borderColor = '#f59e0b';

    const warningDiv = document.createElement('div');
    warningDiv.className = 'warning-message';
    warningDiv.style.color = '#f59e0b';
    warningDiv.style.fontSize = '0.85rem';
    warningDiv.style.marginTop = '0.25rem';
    warningDiv.textContent = message;

    field.parentNode.appendChild(warningDiv);
}

/**
 * Clear Error
 */
function clearError(field) {
    field.style.borderColor = '#e8e8e8';

    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }

    const warningMessage = field.parentNode.querySelector('.warning-message');
    if (warningMessage) {
        warningMessage.remove();
    }
}

/**
 * Submit Form
 */
function submitForm(form) {
    // Get form data
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;

    // Simulate API call (replace with actual endpoint)
    setTimeout(() => {
        console.log('Form submitted:', data);

        // Hide form, show success message
        form.style.display = 'none';
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.style.display = 'block';
        }

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // In production, you would send this to your backend:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            // Handle success
            form.style.display = 'none';
            successMessage.style.display = 'block';
        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            alert('An error occurred. Please try again.');
        });
        */
    }, 1500);
}

/**
 * Add smooth transitions to form fields
 */
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentNode.style.transform = 'translateX(0)';
    });
});
