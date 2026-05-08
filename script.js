// ============================================
// E-Portfolio JavaScript
// Interactive Features & Dynamic Content
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScroll();
    initAnimations();
});

// ============================================
// Navigation Highlighting
// ============================================

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ============================================
// Smooth Scrolling
// ============================================

function initSmoothScroll() {
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
}

// ============================================
// Intersection Observer for Animations
// ============================================

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and content sections
    document.querySelectorAll('.card, .content-section, .project-card, .skill-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// Progress Bar Animation
// ============================================

function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    });

    progressFills.forEach(fill => observer.observe(fill));
}

// ============================================
// Modal/Dialog Functionality
// ============================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ============================================
// Form Validation
// ============================================

function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.required && !input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }

        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('error');
                isValid = false;
            }
        }
    });

    return isValid;
}

// ============================================
// Scroll to Top Button
// ============================================

function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    
    if (scrollBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.style.display = 'block';
            } else {
                scrollBtn.style.display = 'none';
            }
        });

        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============================================
// Print Portfolio
// ============================================

function printPortfolio() {
    window.print();
}

// ============================================
// Dark Mode Toggle (Optional Feature)
// ============================================

function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
        
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }

        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            const isEnabled = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isEnabled ? 'enabled' : 'disabled');
        });
    }
}

// ============================================
// Utility Functions
// ============================================

// Get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

// Toggle element visibility
function toggleElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }
}

// ============================================
// Initialize All Features
// ============================================

// Call initialization functions
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initScrollToTop();
        animateProgressBars();
        initDarkMode();
    });
} else {
    initScrollToTop();
    animateProgressBars();
    initDarkMode();
}

// ============================================
// Console Log
// ============================================

console.log('%c Welcome to My E-Portfolio!', 'color: #3498db; font-size: 20px; font-weight: bold;');
console.log('%c Explore my academic journey and growth', 'color: #27ae60; font-size: 14px;');
