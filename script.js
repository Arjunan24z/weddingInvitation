// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// Sidebar Navigation
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarClose = document.getElementById('sidebar-close');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
    sidebarToggle.classList.add('active');
});

sidebarClose.addEventListener('click', () => {
    sidebar.classList.remove('active');
    sidebarToggle.classList.remove('active');
});

// Close sidebar when clicking on a link
document.querySelectorAll('.sidebar-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        const section = document.querySelector(target);
        
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        sidebar.classList.remove('active');
        sidebarToggle.classList.remove('active');
    });
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target) && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        sidebarToggle.classList.remove('active');
    }
});

// Language Toggle
const langToggle = document.getElementById('lang-toggle');
let currentLang = 'en';

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ta' : 'en';
    document.body.setAttribute('lang', currentLang);
    
    const elements = document.querySelectorAll('[data-en][data-ta]');
    elements.forEach(element => {
        const translation = element.getAttribute(`data-${currentLang}`);
        if (translation) {
            element.textContent = translation;
        }
    });
});

// Music Toggle with Auto-play on Start
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

// IMPORTANT: Auto-play music on page load
window.addEventListener('load', () => {
    // Set volume
    bgMusic.volume = 0.5;
    
    // Attempt immediate play
    bgMusic.play().then(() => {
        isPlaying = true;
        musicToggle.textContent = '🔇';
        musicToggle.style.background = 'linear-gradient(135deg, var(--primary-gold), var(--primary-rose))';
        musicToggle.style.color = 'white';
    }).catch(error => {
        console.log('Auto-play blocked. User interaction required.');
        musicToggle.style.animation = 'pulse 2s ease-in-out infinite';
    });
    
    // Ensure video plays on mobile
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.play().catch(error => {
            console.log('Video autoplay blocked:', error);
            // Try to play on first user interaction
            document.body.addEventListener('touchstart', () => {
                heroVideo.play().catch(e => console.log('Video play failed:', e));
            }, { once: true });
        });
    }
});

// Fallback: Play on first user interaction
document.body.addEventListener('click', function autoPlayOnClick() {
    if (!isPlaying) {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicToggle.textContent = '🔇';
            musicToggle.style.background = 'linear-gradient(135deg, var(--primary-gold), var(--primary-rose))';
            musicToggle.style.color = 'white';
            musicToggle.style.animation = 'none';
        }).catch(() => {});
    }
    document.body.removeEventListener('click', autoPlayOnClick);
}, { once: true });

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.textContent = '🎵';
        musicToggle.style.background = '';
        musicToggle.style.color = '';
    } else {
        bgMusic.play().catch(error => console.log('Audio playback failed:', error));
        musicToggle.textContent = '🔇';
        musicToggle.style.background = 'linear-gradient(135deg, var(--primary-gold), var(--primary-rose))';
        musicToggle.style.color = 'white';
    }
    isPlaying = !isPlaying;
});

// 3D Coverflow Gallery with Swiper and Lightbox
const images = [
    { src: 'photos/IMG_7170.JPG.jpeg', caption: 'Beautiful Moments' },
    { src: 'photos/IMG_7470.JPG.jpeg', caption: 'Love & Laughter' },
    { src: 'photos/IMG_7474.JPG.jpeg', caption: 'Together Forever' },
    { src: 'photos/IMG_7479.JPG.jpeg', caption: 'Special Day' },
    { src: 'photos/IMG_7481.JPG.jpeg', caption: 'Precious Moments' },
    { src: 'photos/IMG_7482.JPG.jpeg', caption: 'Joyful Hearts' },
    { src: 'photos/IMG_7483.JPG.jpeg', caption: 'Perfect Pair' },
    { src: 'photos/IMG_7502.JPG.jpeg', caption: 'Love Story' }
];

// Initialize Swiper
const engagementSwiper = new Swiper('.engagement-swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    speed: 600,
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    navigation: {
        nextEl: '.swiper-button-next-custom',
        prevEl: '.swiper-button-prev-custom',
    },
    on: {
        click: function(swiper, event) {
            const clickedSlide = swiper.clickedSlide;
            if (clickedSlide && clickedSlide.classList.contains('swiper-slide')) {
                const slideIndex = swiper.clickedIndex;
                openLightbox(slideIndex);
            }
        }
    }
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
let currentImageIndex = 0;

if (lightbox) {
    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Previous image
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            updateLightboxImage();
        });
    }

    // Next image
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateLightboxImage();
        });
    }

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            updateLightboxImage();
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateLightboxImage();
        }
    });

    function openLightbox(index) {
        currentImageIndex = index % images.length;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateLightboxImage();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightboxImage() {
        const image = images[currentImageIndex];
        lightboxImg.src = image.src;
        lightboxImg.alt = image.caption;
        lightboxCaption.textContent = image.caption;
    }
}

// Old Carousel (if still present) - Keep for backwards compatibility
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.carousel-dots');

if (track && slides.length > 0) {
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot');
    function updateCarousel() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            nextBtn.style.transform = 'translateY(-50%) scale(0.9)';
            setTimeout(() => {
                nextBtn.style.transform = 'translateY(-50%) scale(1)';
            }, 100);
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            prevBtn.style.transform = 'translateY(-50%) scale(0.9)';
            setTimeout(() => {
                prevBtn.style.transform = 'translateY(-50%) scale(1)';
            }, 100);
        });
    }

    // Auto-advance
    setInterval(nextSlide, 4000);

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
    });
}

// Countdown Timer
const weddingDate = new Date('2026-02-22T08:30:00').getTime();

function updateCountdownValue(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        const oldValue = element.textContent;
        if (oldValue !== value.toString()) {
            element.style.transform = 'scale(1.2)';
            element.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            setTimeout(() => {
                element.textContent = value;
                element.style.transform = 'scale(1)';
            }, 150);
        }
    }
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        updateCountdownValue('days', days);
        updateCountdownValue('hours', hours);
        updateCountdownValue('minutes', minutes);
        updateCountdownValue('seconds', seconds);
    } else {
        updateCountdownValue('days', 0);
        updateCountdownValue('hours', 0);
        updateCountdownValue('minutes', 0);
        updateCountdownValue('seconds', 0);
    }
}

// Wait for DOM to be fully loaded before starting countdown
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    });
} else {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, observerOptions);

// Animate ceremony cards
document.querySelectorAll('.ceremony-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) scale(0.9)';
    card.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    observer.observe(card);
});

// Animate time boxes
document.querySelectorAll('.time-box').forEach((box, index) => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(30px) scale(0.9)';
    box.style.transition = `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    observer.observe(box);
});

// Animate sections
document.querySelectorAll('.section-title').forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(-30px)';
    title.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(title);
});

// Add parallax effect on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content-main');
    
    if (heroContent && currentScroll < window.innerHeight) {
        heroContent.style.transform = `translateY(${currentScroll * 0.3}px)`;
        heroContent.style.opacity = 1 - (currentScroll / window.innerHeight) * 0.8;
    }
    
    lastScroll = currentScroll;
});

// Smooth reveal for blessing section
const blessingSection = document.querySelector('.blessing-container');
if (blessingSection) {
    blessingSection.style.opacity = '0';
    blessingSection.style.transform = 'translateY(40px)';
    blessingSection.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(blessingSection);
}

console.log('🎊 Wedding Invitation Loaded! 🎊');
