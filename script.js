// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {

    // Navigation functionality
    initNavigation();

    // Scroll animations
    initScrollAnimations();

    // Smooth scrolling
    initSmoothScrolling();

    // Contact form
    initContactForm();

    // Scroll to top button
    initScrollToTop();

    // Typing animation
    initTypingAnimation();

    // Skill bars animation
    initSkillBars();

    // Header scroll effect
    initHeaderScroll();

    // Experience cards animation
    initExperienceCardsAnimation();
});

// Navigation functionality
function initNavigation() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // Highlight active section in navigation
    highlightActiveSection();
}

// Highlight active section in navigation
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes and observe elements (updated for new experience cards)
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .experience-card, .contact-card');

    animateElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });

    // Special animations for hero elements
    const heroElements = document.querySelectorAll('.hero-content, .hero-image');
    heroElements.forEach(element => {
        observer.observe(element);
    });
}

// Experience cards specific animation
function initExperienceCardsAnimation() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 150); // Stagger animation
            }
        });
    }, observerOptions);

    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Add animate-in class styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .experience-card.animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        .experience-card:hover .company-indicator {
            transform: scale(1.2);
            transition: transform 0.3s ease;
        }

        .experience-card .company-indicator {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Smooth scrolling
function initSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll indicator in hero
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                window.scrollTo({
                    top: aboutSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Reset form
                this.reset();

                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // Show success message
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');

                // Create mailto link (since we can\'t actually send emails from client-side)
                const mailtoLink = `mailto:devendarkumar0707@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
                window.location.href = mailtoLink;

            }, 2000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;

    // Add to body
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Typing animation for hero section
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.highlight');

    typingElements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #667eea';

        setTimeout(() => {
            typeText(element, text, 100);
        }, index * 1000);
    });
}

function typeText(element, text, speed) {
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 500);
        }
    }

    type();
}

// Skill bars animation (if needed for future enhancement)
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');

    if (skillBars.length > 0) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const percentage = skillBar.dataset.percentage;
                    const fill = skillBar.querySelector('.skill-fill');

                    if (fill) {
                        fill.style.width = percentage + '%';
                    }
                }
            });
        });

        skillBars.forEach(bar => observer.observe(bar));
    }
}

// Experience card interactions
function initExperienceCardInteractions() {
    const experienceCards = document.querySelectorAll('.experience-card');

    experienceCards.forEach(card => {
        // Add hover effects for company indicators
        const indicator = card.querySelector('.company-indicator');

        card.addEventListener('mouseenter', function() {
            if (indicator) {
                indicator.style.transform = 'scale(1.2)';
                indicator.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (indicator) {
                indicator.style.transform = 'scale(1)';
                indicator.style.boxShadow = 'none';
            }
        });

        // Add click animation
        card.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            // Add ripple styles
            ripple.style.position = 'absolute';
            ripple.style.background = 'rgba(102, 126, 234, 0.3)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .experience-card {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    if (hero && heroContent && heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            heroContent.style.transform = `translateY(${rate}px)`;
            heroImage.style.transform = `translateY(${rate * 0.8}px)`;
        });
    }
}

// Add loading animation
function initLoadingAnimation() {
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }

        // Trigger entrance animations
        const heroElements = document.querySelectorAll('.hero-content, .hero-image');
        heroElements.forEach(element => {
            element.classList.add('animate-entrance');
        });
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initLoadingAnimation();
    initExperienceCardInteractions();
    // initParallaxEffect(); // Uncomment if you want parallax effect
});

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimize scroll listeners
const optimizedScrollHandler = throttle(function() {
    // Handle scroll events here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Preload images
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);

// Dark mode toggle (optional feature)
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');

            // Save preference
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
        });

        // Load saved preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
}

// Print styles optimization
function initPrintOptimization() {
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('printing');
    });

    window.addEventListener('afterprint', function() {
        document.body.classList.remove('printing');
    });
}

// Performance monitoring
function initPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver(function(list) {
            list.getEntries().forEach(entry => {
                if (entry.entryType === 'navigation') {
                    console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart);
                }
            });
        });

        observer.observe({ entryTypes: ['navigation'] });
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error to analytics service here
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// External link handling for resume and GitHub
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth transitions to external links
    const externalLinks = document.querySelectorAll('a[href^="https://drive.google.com"], a[href^="https://github.com"]');

    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add a small delay for visual feedback
            const originalText = this.innerHTML;
            this.style.opacity = '0.7';

            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
    });

    // Enhanced experience section interaction
    setTimeout(() => {
        initExperienceCardInteractions();
    }, 1000);
});

// Mobile touch enhancements for experience cards
function initMobileTouchEnhancements() {
    if ('ontouchstart' in window) {
        const experienceCards = document.querySelectorAll('.experience-card');

        experienceCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-2px) scale(0.98)';
            });

            card.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
}

// Initialize mobile enhancements
document.addEventListener('DOMContentLoaded', function() {
    initMobileTouchEnhancements();
});

// Experience timeline progress indicator (optional enhancement)
function initTimelineProgress() {
    const experienceSection = document.querySelector('#experience');
    if (!experienceSection) return;

    const progressBar = document.createElement('div');
    progressBar.className = 'timeline-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 50%;
        right: 2rem;
        width: 4px;
        height: 200px;
        background: rgba(102, 126, 234, 0.2);
        border-radius: 2px;
        z-index: 100;
        display: none;
    `;

    const progressFill = document.createElement('div');
    progressFill.style.cssText = `
        width: 100%;
        height: 0%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 2px;
        transition: height 0.3s ease;
    `;

    progressBar.appendChild(progressFill);
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const sectionTop = experienceSection.offsetTop;
        const sectionHeight = experienceSection.offsetHeight;
        const viewportTop = window.pageYOffset;
        const viewportHeight = window.innerHeight;

        const inSection = viewportTop >= sectionTop - viewportHeight && 
                         viewportTop <= sectionTop + sectionHeight;

        if (inSection) {
            progressBar.style.display = 'block';
            const progress = Math.min(100, Math.max(0, 
                ((viewportTop - sectionTop + viewportHeight) / (sectionHeight + viewportHeight)) * 100
            ));
            progressFill.style.height = progress + '%';
        } else {
            progressBar.style.display = 'none';
        }
    });
}

// Initialize timeline progress on larger screens
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth > 768) {
        // initTimelineProgress(); // Uncomment to enable timeline progress indicator
    }
});