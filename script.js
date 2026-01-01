// ========================================
// TaskFlow AI - Interactive JavaScript
// Smooth Scroll, Mobile Menu, Form Validation
// ========================================

// ========== DOM Content Loaded Event ==========
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initMobileMenu();
    initDarkModeToggle();
    initScrollAnimations();
    initFormValidation();
    initNavbarScroll();
    initCTAButtons();
});

// ========== Smooth Scroll Navigation ==========
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignore empty hash or just '#'
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// ========== Mobile Menu Toggle ==========
let mobileMenuOpen = false;

function initMobileMenu() {
    // Create mobile menu button if it doesn't exist
    createMobileMenuButton();
    
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenuOpen && 
                !menuButton.contains(e.target) && 
                !mobileMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

function createMobileMenuButton() {
    const nav = document.querySelector('nav .max-w-7xl > div');
    
    // Check if button already exists
    if (document.getElementById('mobile-menu-button')) return;
    
    // Create hamburger button
    const menuButton = document.createElement('button');
    menuButton.id = 'mobile-menu-button';
    menuButton.className = 'md:hidden text-gray-600 hover:text-purple-600 focus:outline-none';
    menuButton.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
    `;
    
    // Insert before sign in button
    const signInButton = nav.querySelector('button');
    nav.insertBefore(menuButton, signInButton);
    
    // Create mobile menu container
    const navLinks = nav.querySelector('.hidden.md\\:flex');
    if (navLinks) {
        const mobileMenu = document.createElement('div');
        mobileMenu.id = 'mobile-menu';
        mobileMenu.className = 'hidden md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50';
        mobileMenu.innerHTML = `
            <div class="px-4 py-4 space-y-3">
                ${Array.from(navLinks.children).map(link => 
                    `<a href="${link.getAttribute('href')}" class="block text-gray-600 hover:text-purple-600 py-2 transition">${link.textContent}</a>`
                ).join('')}
            </div>
        `;
        
        nav.parentElement.appendChild(mobileMenu);
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = document.getElementById('mobile-menu-button');
    
    if (mobileMenuOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = document.getElementById('mobile-menu-button');
    
    if (mobileMenu) {
        mobileMenu.classList.remove('hidden');
        mobileMenuOpen = true;
        
        // Update button icon to X
        menuButton.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        `;
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = document.getElementById('mobile-menu-button');
    
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
        mobileMenuOpen = false;
        
        // Update button icon back to hamburger
        menuButton.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
        `;
    }
}

// ========== Dark Mode Toggle ==========
function initDarkModeToggle() {
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Create dark mode toggle button if it doesn't exist
    if (!document.querySelector('.dark-mode-toggle')) {
        createDarkModeToggle();
    }
    
    const toggleButton = document.querySelector('.dark-mode-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleDarkMode);
    }
}

function createDarkModeToggle() {
    const toggleButton = document.createElement('button');
    toggleButton.className = 'dark-mode-toggle';
    toggleButton.innerHTML = `
        <svg class="moon-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
        </svg>
        <svg class="sun-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
    `;
    document.body.appendChild(toggleButton);
}

function toggleDarkMode() {
    const toggleButton = document.querySelector('.dark-mode-toggle');
    toggleButton.classList.add('rotating');
    
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Remove rotating class after animation
    setTimeout(() => {
        toggleButton.classList.remove('rotating');
    }, 500);
}

// ========== Scroll Animations ==========
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Add scroll-reveal class to feature cards and other elements
    const featureCards = document.querySelectorAll('.bg-white.rounded-xl');
    featureCards.forEach((card, index) => {
        card.classList.add('scroll-reveal');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// ========== Navbar Scroll Effect ==========
function initNavbarScroll() {
    const nav = document.querySelector('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('shadow-md');
        } else {
            nav.classList.remove('shadow-md');
        }
        
        lastScroll = currentScroll;
    });
}

// ========== Form Validation ==========
function initFormValidation() {
    // Create a signup modal form
    createSignupModal();
    
    const form = document.getElementById('signup-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Clear error on input
                clearFieldError(this);
            });
        });
    }
}

function createSignupModal() {
    const modal = document.createElement('div');
    modal.id = 'signup-modal';
    modal.className = 'hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button id="close-modal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
            
            <h3 class="text-2xl font-bold text-gray-800 mb-6">Start Your Free Trial</h3>
            
            <form id="signup-form" class="space-y-4">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" id="name" name="name" required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                        placeholder="John Doe">
                    <span class="error-message text-red-500 text-sm hidden"></span>
                </div>
                
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" id="email" name="email" required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                        placeholder="john@example.com">
                    <span class="error-message text-red-500 text-sm hidden"></span>
                </div>
                
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" id="password" name="password" required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                        placeholder="Min. 8 characters">
                    <span class="error-message text-red-500 text-sm hidden"></span>
                </div>
                
                <div>
                    <label for="company" class="block text-sm font-medium text-gray-700 mb-1">Company (Optional)</label>
                    <input type="text" id="company" name="company"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                        placeholder="Your Company">
                </div>
                
                <div class="flex items-center">
                    <input type="checkbox" id="terms" name="terms" required
                        class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500">
                    <label for="terms" class="ml-2 text-sm text-gray-600">
                        I agree to the <a href="#" class="text-purple-600 hover:underline">Terms of Service</a>
                    </label>
                </div>
                <span id="terms-error" class="error-message text-red-500 text-sm hidden"></span>
                
                <button type="submit" 
                    class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition transform hover:scale-105">
                    Create Free Account
                </button>
                
                <p class="text-center text-sm text-gray-600">
                    Already have an account? <a href="#" class="text-purple-600 hover:underline">Sign in</a>
                </p>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal events
    document.getElementById('close-modal').addEventListener('click', closeSignupModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeSignupModal();
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let errorMessage = '';
    
    switch(fieldName) {
        case 'name':
            if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters';
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                errorMessage = 'Name can only contain letters';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
            }
            break;
            
        case 'password':
            if (value.length < 8) {
                errorMessage = 'Password must be at least 8 characters';
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                errorMessage = 'Password must contain uppercase, lowercase, and number';
            }
            break;
            
        case 'terms':
            if (!field.checked) {
                errorMessage = 'You must accept the terms of service';
                showError(document.getElementById('terms-error'), errorMessage);
                return false;
            }
            break;
    }
    
    if (errorMessage) {
        showFieldError(field, errorMessage);
        return false;
    } else {
        clearFieldError(field);
        return true;
    }
}

function showFieldError(field, message) {
    const errorSpan = field.parentElement.querySelector('.error-message');
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.classList.remove('hidden');
    }
    field.classList.add('border-red-500');
    field.classList.remove('border-gray-300');
}

function clearFieldError(field) {
    const errorSpan = field.parentElement.querySelector('.error-message');
    if (errorSpan) {
        errorSpan.classList.add('hidden');
    }
    field.classList.remove('border-red-500');
    field.classList.add('border-gray-300');
}

function showError(element, message) {
    element.textContent = message;
    element.classList.remove('hidden');
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (isValid) {
        // Show success message
        showSuccessMessage();
        
        // Reset form
        form.reset();
        
        // Close modal after delay
        setTimeout(closeSignupModal, 2000);
    }
}

function showSuccessMessage() {
    const modal = document.getElementById('signup-modal');
    const form = document.getElementById('signup-form');
    
    const successDiv = document.createElement('div');
    successDiv.className = 'text-center py-8';
    successDiv.innerHTML = `
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
        </div>
        <h4 class="text-xl font-bold text-gray-800 mb-2">Welcome to TaskFlow AI!</h4>
        <p class="text-gray-600">Check your email to get started.</p>
    `;
    
    form.style.display = 'none';
    form.parentElement.appendChild(successDiv);
    
    setTimeout(() => {
        form.style.display = 'block';
        successDiv.remove();
    }, 3000);
}

// ========== CTA Button Actions ==========
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('button');
    
    ctaButtons.forEach(button => {
        const buttonText = button.textContent.trim();
        
        if (buttonText.includes('Get Started') || 
            buttonText.includes('Start Your Free Trial') ||
            buttonText.includes('Create Free Account')) {
            button.addEventListener('click', openSignupModal);
        }
    });
}

function openSignupModal() {
    const modal = document.getElementById('signup-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeSignupModal() {
    const modal = document.getElementById('signup-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // Reset form
        const form = document.getElementById('signup-form');
        if (form) {
            form.reset();
            // Clear all errors
            form.querySelectorAll('.error-message').forEach(error => {
                error.classList.add('hidden');
            });
            form.querySelectorAll('input').forEach(input => {
                clearFieldError(input);
            });
        }
    }
}

// ========== Utility Functions ==========

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll-to-top button
window.addEventListener('scroll', debounce(function() {
    if (window.pageYOffset > 300) {
        showScrollTopButton();
    } else {
        hideScrollTopButton();
    }
}, 100));

function showScrollTopButton() {
    let button = document.getElementById('scroll-top-button');
    if (!button) {
        button = document.createElement('button');
        button.id = 'scroll-top-button';
        button.className = 'fixed bottom-8 right-8 bg-purple-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-purple-700 transition transform hover:scale-110 z-40';
        button.innerHTML = `
            <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
            </svg>
        `;
        button.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        document.body.appendChild(button);
    }
    button.style.display = 'block';
}

function hideScrollTopButton() {
    const button = document.getElementById('scroll-top-button');
    if (button) {
        button.style.display = 'none';
    }
}

// Console welcome message
console.log('%c🚀 TaskFlow AI', 'font-size: 24px; font-weight: bold; color: #667eea;');
console.log('%cWelcome to TaskFlow AI - Smart Task Management', 'font-size: 14px; color: #764ba2;');
