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