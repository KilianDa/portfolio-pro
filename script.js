// Navigation mobile toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
// Optimized to trigger only once per element
const animatedElements = new Set();

function checkMobileDevice() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Create observer with optimized options
const observerOptions = {
    threshold: checkMobileDevice() ? 0.05 : 0.15,
    rootMargin: checkMobileDevice() ? '0px' : '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Only animate if element is intersecting and hasn't been animated yet
        if (entry.isIntersecting && !animatedElements.has(entry.target)) {
            // Mark as animated immediately to prevent multiple triggers
            animatedElements.add(entry.target);
            
            // Use requestAnimationFrame for smoother animations
            requestAnimationFrame(() => {
                entry.target.classList.add('fade-in-up');
            });
            
            // Immediately stop observing to prevent re-animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Wait for DOM to be fully loaded before observing
function initAnimations() {
    const sections = document.querySelectorAll('.section, .project-card, .skill-category, .timeline-item');
    sections.forEach(section => {
        // Only observe if not already animated
        if (!animatedElements.has(section)) {
            observer.observe(section);
        }
    });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}

// Active nav link highlighting
const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveNavLink);
updateActiveNavLink(); // Initial call

// Add active state styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Parallax effects removed as requested

// Lightbox pour la galerie photo / vidéo
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxBackdrop = document.getElementById('lightboxBackdrop');

    if (!lightbox || !lightboxImage || !lightboxVideo) return;

    function openLightboxForImage(src, alt) {
        lightboxVideo.pause();
        lightboxVideo.style.display = 'none';
        lightboxImage.style.display = 'block';
        lightboxImage.src = src;
        lightboxImage.alt = alt || '';
        lightbox.classList.add('open');
    }

    function openLightboxForVideo(src) {
        lightboxImage.style.display = 'none';
        lightboxVideo.style.display = 'block';
        lightboxVideo.src = src;
        lightboxVideo.currentTime = 0;
        lightboxVideo.play().catch(() => {});
        lightbox.classList.add('open');
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        lightboxImage.src = '';
        lightboxVideo.pause();
        lightboxVideo.src = '';
    }

    document.querySelectorAll('.gallery-img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            const fullSrc = img.dataset.full || img.src;
            openLightboxForImage(fullSrc, img.alt);
        });
    });

    document.querySelectorAll('.gallery-video').forEach(video => {
        video.style.cursor = 'zoom-in';
        video.addEventListener('click', () => {
            const source = video.querySelector('source');
            const fullSrc = (source && (source.dataset.full || source.src)) || video.currentSrc || video.src;
            openLightboxForVideo(fullSrc);
        });
    });

    [lightboxClose, lightboxBackdrop].forEach(el => {
        if (el) {
            el.addEventListener('click', closeLightbox);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) {
            closeLightbox();
        }
    });
});

// Project card hover effects are now handled by CSS for better performance

// Skill tags hover effects are now handled by CSS for better performance

// Console message
console.log('%c👋 Bienvenue sur mon portfolio !', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cVous êtes développeur ? N\'hésitez pas à me contacter !', 'color: #6b7280; font-size: 14px;');

