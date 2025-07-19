// Modern 3D Animations and Effects
// Inspired by Creative Portfolio Template

// GSAP Animations
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeScrollAnimations();
    initializeParallaxEffects();
    initializeFloatingElements();
    initializeParticleSystem();
});

// Main animation initialization
function initializeAnimations() {
    // Loading screen animation
    const loadingScreen = document.getElementById('loading-screen');
    const loader = document.querySelector('.loader');
    
    if (loadingScreen && loader) {
        gsap.timeline()
            .from(loader, {
                opacity: 0,
                scale: 0.8,
                duration: 1,
                ease: "power2.out"
            })
            .to(loadingScreen, {
                opacity: 0,
                duration: 0.5,
                delay: 2,
                onComplete: () => {
                    loadingScreen.style.display = 'none';
                    startPageAnimations();
                }
            });
    }
}

// Page entrance animations
function startPageAnimations() {
    // Hero section animations
    const heroElements = {
        badge: '.hero-badge',
        title: '.hero-title',
        description: '.hero-description',
        stats: '.hero-stats',
        buttons: '.hero-buttons',
        visual: '.hero-visual'
    };

    gsap.timeline()
        .from(heroElements.badge, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out"
        })
        .from(heroElements.title, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out"
        }, "-=0.4")
        .from(heroElements.description, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6")
        .from(heroElements.stats, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4")
        .from(heroElements.buttons, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6")
        .from(heroElements.visual, {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: "power2.out"
        }, "-=0.8");

    // Animate floating elements
    animateFloatingElements();
}

// Floating elements animation
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const speed = parseFloat(element.dataset.speed) || 0.5;
        
        gsap.to(element, {
            y: -20,
            rotation: 180,
            duration: 3 + speed * 2,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.5
        });
    });
}

// Scroll-triggered animations
function initializeScrollAnimations() {
    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out"
        });
    });

    // About cards
    gsap.utils.toArray('.about-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out"
        });
    });

    // Skill items
    gsap.utils.toArray('.skill-item').forEach((skill, index) => {
        gsap.from(skill, {
            scrollTrigger: {
                trigger: skill,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            x: -50,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out"
        });
    });

    // Project cards
    gsap.utils.toArray('.project-card').forEach((project, index) => {
        gsap.from(project, {
            scrollTrigger: {
                trigger: project,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out"
        });
    });

    // Contact items
    gsap.utils.toArray('.contact-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            x: -30,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out"
        });
    });
}

// Parallax effects
function initializeParallaxEffects() {
    // Hero background parallax
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        gsap.to(heroBackground, {
            scrollTrigger: {
                trigger: heroBackground,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: -100,
            ease: "none"
        });
    }

    // Floating elements parallax
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach(element => {
        const speed = parseFloat(element.dataset.speed) || 0.5;
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: -50 * speed,
            rotation: 10 * speed,
            ease: "none"
        });
    });
}

// Particle system
function initializeParticleSystem() {
    const particleContainer = document.querySelector('.hero-particles');
    if (!particleContainer) return;

    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(99, 102, 241, 0.6);
        border-radius: 50%;
        pointer-events: none;
    `;

    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    container.appendChild(particle);

    // Animate particle
    gsap.to(particle, {
        y: -100,
        x: Math.random() * 100 - 50,
        opacity: 0,
        duration: Math.random() * 3 + 2,
        ease: "none",
        repeat: -1,
        delay: Math.random() * 2
    });
}

// Text animations
function animateText(element, text) {
    const chars = text.split('');
    element.innerHTML = '';
    
    chars.forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        element.appendChild(span);
        
        gsap.to(span, {
            opacity: 1,
            duration: 0.1,
            delay: index * 0.05,
            ease: "power2.out"
        });
    });
}

// Counter animations
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = 2;
        
        gsap.to(counter, {
            scrollTrigger: {
                trigger: counter,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            innerHTML: target,
            duration: duration,
            ease: "power2.out",
            snap: { innerHTML: 1 },
            onUpdate: function() {
                counter.textContent = Math.ceil(counter.innerHTML);
            }
        });
    });
}

// Skill bar animations
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const percentage = bar.dataset.percentage;
        
        gsap.fromTo(bar, 
            { width: '0%' },
            {
                scrollTrigger: {
                    trigger: bar,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                width: percentage + '%',
                duration: 1.5,
                ease: "power2.out"
            }
        );
    });
}

// Hover animations
function initializeHoverAnimations() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Card hover effects
    const cards = document.querySelectorAll('.about-card, .skill-item, .project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Navigation animations
function initializeNavigationAnimations() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                y: -2,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Smooth scrolling
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });
}

// Cursor effects
function initializeCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(99, 102, 241, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 2,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
    // Wait for page to load completely
    setTimeout(() => {
        animateCounters();
        animateSkillBars();
        initializeHoverAnimations();
        initializeNavigationAnimations();
        initializeSmoothScrolling();
        initializeCursorEffects();
    }, 1000);
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

// Resize handler
window.addEventListener('resize', debounce(() => {
    ScrollTrigger.refresh();
}, 250));

// Export functions for use in other files
window.AnimationUtils = {
    animateText,
    animateCounters,
    animateSkillBars,
    initializeAnimations,
    startPageAnimations
}; 