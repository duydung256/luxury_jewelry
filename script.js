document.addEventListener("DOMContentLoaded", function () {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const mobileNav = document.querySelector(".mobile-nav");
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener("click", function () {
            mobileNav.classList.toggle("hidden");
            
            // Toggle icon
            const icon = mobileMenuToggle.querySelector("i");
            if (mobileNav.classList.contains("hidden")) {
                icon.className = "ri-menu-line ri-lg";
            } else {
                icon.className = "ri-close-line ri-lg";
            }
        });
    }

    // Hero Slideshow Class
    class HeroSlideshow {
        constructor() {
            this.slides = document.querySelectorAll('.hero-slideshow .slide');
            this.dots = document.querySelectorAll('.slide-dot');
            this.currentSlide = 0;
            this.slideInterval = null;
            this.isTransitioning = false;
            
            this.init();
        }
        
        init() {
            if (this.slides.length === 0) return;
            
            // Initialize all slides
            this.slides.forEach((slide, index) => {
                slide.classList.remove('active', 'prev', 'next', 'entering', 'slide-in', 'fade-out');
                if (index === 0) {
                    slide.classList.add('active');
                }
            });
            
            // Set first dot as active
            if (this.dots.length > 0) {
                this.dots[0].classList.add('active');
            }
            
            // Add click events to dots
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    if (!this.isTransitioning && index !== this.currentSlide) {
                        this.goToSlide(index);
                        this.restartAutoSlide();
                    }
                });
            });
            
            // Start auto slideshow
            this.startAutoSlide();
            
            // Pause on hover
            const heroSection = document.getElementById('hero');
            if (heroSection) {
                heroSection.addEventListener('mouseenter', () => this.stopAutoSlide());
                heroSection.addEventListener('mouseleave', () => this.startAutoSlide());
            }
        }
        
        goToSlide(slideIndex) {
            if (slideIndex === this.currentSlide || this.isTransitioning) return;
            
            this.isTransitioning = true;
            
            const currentSlideElement = this.slides[this.currentSlide];
            const nextSlideElement = this.slides[slideIndex];
            
            // Update dots immediately
            if (this.dots[this.currentSlide]) {
                this.dots[this.currentSlide].classList.remove('active');
            }
            if (this.dots[slideIndex]) {
                this.dots[slideIndex].classList.add('active');
            }
            
            // Clean all transition classes from all slides
            this.slides.forEach(slide => {
                slide.classList.remove('slide-from-right', 'stay-in-place', 'prepare-right', 'fade-out-under');
                slide.style.transition = '';
                slide.style.zIndex = '';
            });
            
            // Step 1: Keep current slide in place, position new slide off-screen
            currentSlideElement.classList.add('stay-in-place');
            currentSlideElement.style.zIndex = '1'; // Behind new slide
            
            // Position new slide off-screen to the right (no transition)
            nextSlideElement.style.transition = 'none';
            nextSlideElement.style.transform = 'translateX(100%)';
            nextSlideElement.style.opacity = '1';
            nextSlideElement.style.zIndex = '3'; // Above current slide
            nextSlideElement.classList.add('prepare-right');
            
            // Force reflow to ensure positioning is applied
            nextSlideElement.offsetHeight;
            
            // Step 2: Start the slide-in animation
            setTimeout(() => {
                // Re-enable transitions for new slide
                nextSlideElement.style.transition = '';
                
                // Slide new image from right to cover current image
                nextSlideElement.classList.remove('prepare-right');
                nextSlideElement.classList.add('slide-from-right');
                
                // Update active states
                currentSlideElement.classList.remove('active');
                nextSlideElement.classList.add('active');
                
                // After slide is halfway through, start fading out the old slide underneath
                setTimeout(() => {
                    currentSlideElement.classList.add('fade-out-under');
                }, 400); // Start fade after 400ms (1/3 of the way through)
                
                // Clean up after animation completes
                setTimeout(() => {
                    // Reset all slides to default state
                    this.slides.forEach((slide, index) => {
                        slide.classList.remove('slide-from-right', 'stay-in-place', 'prepare-right', 'fade-out-under');
                        slide.style.zIndex = '';
                        slide.style.transform = '';
                        slide.style.opacity = '';
                        slide.style.transition = '';
                        
                        // Set proper state based on current slide
                        if (index === slideIndex) {
                            slide.classList.add('active');
                        } else {
                            slide.classList.remove('active');
                        }
                    });
                    
                    this.currentSlide = slideIndex;
                    this.isTransitioning = false;
                }, 1200); // Match CSS transition duration
                
            }, 10); // Small delay to ensure positioning is applied
        }
        
        nextSlide() {
            const nextIndex = (this.currentSlide + 1) % this.slides.length;
            this.goToSlide(nextIndex);
        }
        
        startAutoSlide() {
            this.stopAutoSlide();
            this.slideInterval = setInterval(() => {
                if (!this.isTransitioning) {
                    this.nextSlide();
                }
            }, 5000); // Change slide every 5 seconds for better viewing
        }
        
        stopAutoSlide() {
            if (this.slideInterval) {
                clearInterval(this.slideInterval);
                this.slideInterval = null;
            }
        }
        
        restartAutoSlide() {
            this.stopAutoSlide();
            this.startAutoSlide();
        }
    }

    // Initialize hero slideshow
    new HeroSlideshow();

    // Smooth Scrolling for Navigation Links
    function smoothScrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            // Calculate offset for fixed header (adjust if needed)
            const headerHeight = document.querySelector('header').offsetHeight || 80;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Desktop Navigation Links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollToSection(targetId);
        });
    });

    // Mobile Navigation Links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link[href^="#"]');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Close mobile menu
            if (mobileNav) {
                mobileNav.classList.add("hidden");
                const icon = mobileMenuToggle.querySelector("i");
                if (icon) {
                    icon.className = "ri-menu-line ri-lg";
                }
            }
            
            // Smooth scroll to section
            smoothScrollToSection(targetId);
        });
    });

    // Hero button and other anchor links
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]:not(.nav-link):not(.mobile-nav-link)');
    allAnchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollToSection(targetId);
        });
    });

    // Carousel functionality
    const carousel = document.querySelector(".carousel");
    const leftControl = document.querySelector(".carousel-control.left");
    const rightControl = document.querySelector(".carousel-control.right");
    
    if (carousel && leftControl && rightControl) {
        const getItemWidth = () => {
            const item = document.querySelector(".carousel-item");
            if (item) {
                return item.offsetWidth + (window.innerWidth >= 640 ? 24 : 16); // width + gap
            }
            return 250; // fallback
        };
        
        leftControl.addEventListener("click", function () {
            const itemWidth = getItemWidth();
            carousel.scrollBy({
                left: -itemWidth * (window.innerWidth >= 768 ? 2 : 1),
                behavior: "smooth",
            });
        });
        
        rightControl.addEventListener("click", function () {
            const itemWidth = getItemWidth();
            carousel.scrollBy({
                left: itemWidth * (window.innerWidth >= 768 ? 2 : 1),
                behavior: "smooth",
            });
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener("click", function (event) {
        if (mobileNav && !mobileNav.classList.contains("hidden")) {
            const header = document.querySelector("header");
            if (header && !header.contains(event.target)) {
                mobileNav.classList.add("hidden");
                const icon = mobileMenuToggle.querySelector("i");
                icon.className = "ri-menu-line ri-lg";
            }
        }
    });
    
    // Handle window resize
    window.addEventListener("resize", function () {
        if (window.innerWidth >= 768 && mobileNav) {
            mobileNav.classList.add("hidden");
            const icon = mobileMenuToggle.querySelector("i");
            if (icon) {
                icon.className = "ri-menu-line ri-lg";
            }
        }
    });
});