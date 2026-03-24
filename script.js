/**
 * GPU TECH WEBSITE - JAVASCRIPT
 * 
 * This file contains all interactive functionality for the website
 * Including:
 * - Mobile menu toggle
 * - Smooth scrolling navigation
 * - Active section tracking on scroll
 * - Dynamic year in footer
 * - Intersection Observer for animations
 */

/* ============================================
   1. MOBILE MENU FUNCTIONALITY
   ============================================ */

/**
 * Toggle mobile navigation menu
 * Shows/hides the menu and animates the hamburger icon
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            // Toggle active class on both button and menu
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a navigation link
        const links = navLinks.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

/* ============================================
   2. SMOOTH SCROLLING NAVIGATION
   ============================================ */

/**
 * Scroll to a specific section smoothly
 * @param {string} sectionId - ID of the section to scroll to
 */
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        // Get header height to offset scroll position
        const headerHeight = document.getElementById('header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Initialize smooth scrolling for all navigation links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            scrollToSection(sectionId);
        });
    });
}

/* ============================================
   3. ACTIVE SECTION TRACKING
   ============================================ */

/**
 * Update active navigation link based on scroll position
 * This highlights the current section in the navigation menu
 */
function updateActiveSection() {
    const sections = ['home', 'architecture', 'applications'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Get current scroll position (with offset for header)
    const scrollPosition = window.scrollY + 100;
    
    // Loop through sections to find which one is currently visible
    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        
        if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;
            
            // Check if current scroll position is within this section
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section's link
                const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        }
    });
}

/**
 * Initialize scroll tracking for active section
 * Uses throttling to improve performance
 */
function initScrollTracking() {
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        // Use requestAnimationFrame for better performance
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                updateActiveSection();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    
    // Update on page load
    updateActiveSection();
}

/* ============================================
   4. HEADER BACKGROUND ON SCROLL
   ============================================ */

/**
 * Add shadow to header when scrolling down
 * Provides visual feedback that page has scrolled
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

/* ============================================
   5. DYNAMIC YEAR IN FOOTER
   ============================================ */

/**
 * Set current year in footer copyright
 * Keeps copyright date automatically updated
 */
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/* ============================================
   6. INTERSECTION OBSERVER FOR ANIMATIONS
   ============================================ */

/**
 * Animate elements when they come into view
 * Uses Intersection Observer API for better performance
 */
function initScrollAnimations() {
    // Check if browser supports Intersection Observer
    if ('IntersectionObserver' in window) {
        // Elements to observe
        const observerOptions = {
            threshold: 0.1, // Trigger when 10% of element is visible
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add fade-in animation class when element is visible
                    entry.target.classList.add('fade-in');
                    // Stop observing this element
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all cards and major elements
        const elementsToObserve = document.querySelectorAll(
            '.stat-card, .arch-card, .app-card, .specs-card, .future-card'
        );
        
        elementsToObserve.forEach(element => {
            observer.observe(element);
        });
    }
}

/* ============================================
   7. PREVENT SCROLL JUMP ON PAGE LOAD
   ============================================ */

/**
 * Prevent automatic scroll to hash on page load
 * Then restore hash to URL
 */
function preventHashScroll() {
    // Check if URL has a hash
    if (window.location.hash) {
        // Temporarily remove hash from URL
        const hash = window.location.hash;
        window.location.hash = '';
        
        // Wait for page to load, then restore hash and scroll
        setTimeout(function() {
            window.location.hash = hash;
            const sectionId = hash.substring(1);
            scrollToSection(sectionId);
        }, 100);
    }
}

/* ============================================
   8. INITIALIZE ALL FUNCTIONALITY
   ============================================ */

/**
 * Initialize all interactive features when DOM is ready
 * This is the main entry point for all JavaScript functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 GPU Tech Website Initialized');
    
    // Initialize all features
    initMobileMenu();
    initSmoothScrolling();
    initScrollTracking();
    initHeaderScroll();
    setCurrentYear();
    initScrollAnimations();
    preventHashScroll();
    
    console.log('✅ All features loaded successfully');
});

/* ============================================
   9. UTILITY FUNCTIONS (OPTIONAL)
   ============================================ */

/**
 * Debounce function - limits how often a function can be called
 * Useful for performance optimization on scroll/resize events
 * 
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
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

/**
 * Throttle function - ensures function is called at most once per interval
 * Good for scroll events that need regular updates
 * 
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ============================================
   10. ACCESSIBILITY ENHANCEMENTS
   ============================================ */

/**
 * Add keyboard navigation support
 * Allows users to navigate with keyboard (Tab, Enter, Escape)
 */
function initKeyboardNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    // Close mobile menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// Initialize keyboard navigation when DOM is ready
document.addEventListener('DOMContentLoaded', initKeyboardNavigation);
