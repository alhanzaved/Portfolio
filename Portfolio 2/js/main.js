// Main JavaScript for Creative Portfolio
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio initialized');
    
    // Wait a bit for all elements to be ready
    setTimeout(() => {
        // Initialize all functionality in proper order
        initLoadingScreen();
        initNavigation();
        initSmoothScrolling();
        initStatsCounter();
        initSkillsAnimation();
        initProjectModal();
        initContactForm();
        initImageUpload();
        initScrollAnimations();
        initParallaxEffects();
        initFloatingElements();
        
        // Final check - ensure content is visible
        ensureContentVisibility();
    }, 100);
});

// Ensure all content is visible
function ensureContentVisibility() {
    // Make sure hero content is visible
    const heroElements = document.querySelectorAll('.hero-title, .hero-description, .hero-buttons, .hero-stats');
    heroElements.forEach(element => {
        if (element && element.style.opacity === '0') {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
    
    // Make sure project grid is visible
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid && !projectsGrid.classList.contains('loaded')) {
        projectsGrid.classList.add('loaded');
    }
    
    console.log('Content visibility check completed');
}

// Loading Screen Functionality
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loaderProgress = document.querySelector('.loader-progress');
    
    if (!loadingScreen || !loaderProgress) {
        console.log('Loading screen elements not found, skipping...');
        initHeroAnimations();
        return;
    }
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide loading screen with animation
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    // Start hero animations
                    initHeroAnimations();
                }, 500);
            }, 200);
        }
        loaderProgress.style.width = progress + '%';
    }, 100);
}

// Navigation Functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) {
        console.log('Navigation elements not found');
        return;
    }
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Active navigation link highlighting and navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        // Navbar scroll effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    if (stats.length === 0) {
        console.log('Stats elements not found');
        return;
    }
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
                observer.unobserve(stat);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// Skills Animation
function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length === 0) {
        console.log('Skill bars not found');
        return;
    }
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percentage = bar.getAttribute('data-percentage');
                bar.style.width = percentage + '%';
                observer.unobserve(bar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Project Modal Functionality
function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const addBtn = document.getElementById('add-project-btn');
    const closeBtn = document.querySelector('.close');
    const projectForm = document.getElementById('project-form');
    const projectsGrid = document.getElementById('projects-grid');
    
    if (!modal || !addBtn || !closeBtn || !projectForm || !projectsGrid) {
        console.log('Project modal elements not found');
        return;
    }
    
    // Sample projects data
    const sampleProjects = [
        {
            title: "E-Commerce Platform",
            description: "A modern e-commerce solution built with React and Node.js",
            image: "https://via.placeholder.com/400x300/00d4ff/ffffff?text=E-Commerce",
            link: "#",
            technologies: "React, Node.js, MongoDB"
        },
        {
            title: "Portfolio Website",
            description: "Creative portfolio with 3D animations and modern design",
            image: "https://via.placeholder.com/400x300/ff0080/ffffff?text=Portfolio",
            link: "#",
            technologies: "HTML5, CSS3, JavaScript, Three.js"
        },
        {
            title: "WordPress Theme",
            description: "Custom WordPress theme with advanced customization options",
            image: "https://via.placeholder.com/400x300/ff6b35/ffffff?text=WordPress",
            link: "#",
            technologies: "WordPress, PHP, MySQL, CSS3"
        }
    ];
    
    // Load sample projects
    loadProjects(sampleProjects);
    
    // Animate projects grid
    setTimeout(() => {
        projectsGrid.classList.add('loaded');
    }, 500);
    
    // Open modal
    addBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle form submission
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(projectForm);
        const newProject = {
            title: formData.get('title'),
            description: formData.get('description'),
            image: formData.get('image') || 'https://via.placeholder.com/400x300/00d4ff/ffffff?text=Project',
            link: formData.get('link') || '#',
            technologies: formData.get('technologies')
        };
        
        // Add new project to grid
        addProjectToGrid(newProject);
        
        // Reset form and close modal
        projectForm.reset();
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Show success message
        showNotification('Project added successfully!', 'success');
    });
}

function loadProjects(projects) {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        addProjectToGrid(project);
    });
}

function addProjectToGrid(project) {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
            <div class="project-overlay">
                <a href="${project.link}" class="btn btn-primary" target="_blank">
                    <i class="fas fa-external-link-alt"></i> View Project
                </a>
            </div>
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-technologies">
                ${project.technologies.split(',').map(tech => `<span class="tech-tag">${tech.trim()}</span>`).join('')}
            </div>
        </div>
    `;
    
    projectsGrid.appendChild(projectCard);
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        console.log('Contact form not found');
        return;
    }
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const formObject = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Simulate success
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Image Upload Functionality
function initImageUpload() {
    const imageInput = document.getElementById('image-input');
    const uploadBtn = document.getElementById('upload-btn');
    const removeBtn = document.getElementById('remove-btn');
    const profileImg = document.getElementById('profile-img');
    const uploadOverlay = document.querySelector('.image-upload-overlay');
    
    if (!imageInput || !uploadBtn || !removeBtn || !profileImg || !uploadOverlay) {
        console.log('Image upload elements not found');
        return;
    }
    
    // Initially hide remove button
    removeBtn.style.display = 'none';
    
    // Upload button click
    uploadBtn.addEventListener('click', () => {
        imageInput.click();
    });
    
    // Profile image click
    profileImg.addEventListener('click', () => {
        imageInput.click();
    });
    
    // File input change
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profileImg.src = e.target.result;
                    uploadOverlay.style.display = 'none';
                    removeBtn.style.display = 'block';
                    showNotification('Profile image updated successfully!', 'success');
                };
                reader.readAsDataURL(file);
            } else {
                showNotification('Please select a valid image file.', 'error');
            }
        }
    });
    
    // Remove button
    removeBtn.addEventListener('click', () => {
        profileImg.src = 'assets/profile.jpg';
        uploadOverlay.style.display = 'flex';
        removeBtn.style.display = 'none';
        imageInput.value = '';
        showNotification('Profile image removed.', 'info');
    });
}

// Scroll Animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.about-card, .skill-item, .project-card, .contact-item');
    
    if (elements.length === 0) {
        console.log('Scroll animation elements not found');
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Parallax Effects
function initParallaxEffects() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    if (floatingElements.length === 0) {
        console.log('Floating elements not found');
        return;
    }
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        floatingElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Hero Animations
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroStats = document.querySelector('.hero-stats');
    
    if (!heroTitle || !heroDescription || !heroButtons || !heroStats) {
        console.log('Hero elements not found');
        return;
    }
    
    // Reset initial states
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(30px)';
    heroDescription.style.opacity = '0';
    heroDescription.style.transform = 'translateY(30px)';
    heroButtons.style.opacity = '0';
    heroButtons.style.transform = 'translateY(30px)';
    heroStats.style.opacity = '0';
    heroStats.style.transform = 'translateY(30px)';
    
    // Animate hero elements
    setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 500);
    
    setTimeout(() => {
        heroDescription.style.opacity = '1';
        heroDescription.style.transform = 'translateY(0)';
    }, 800);
    
    setTimeout(() => {
        heroButtons.style.opacity = '1';
        heroButtons.style.transform = 'translateY(0)';
    }, 1100);
    
    setTimeout(() => {
        heroStats.style.opacity = '1';
        heroStats.style.transform = 'translateY(0)';
    }, 1400);
}

// Notification System
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
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00d4ff' : type === 'error' ? '#ff0080' : '#ff6b35'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Initialize floating elements animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    if (floatingElements.length === 0) {
        console.log('Floating elements not found for animation');
        return;
    }
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
        element.style.animation = 'float 6s ease-in-out infinite';
    });
}