// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading spinner after page loads
    setTimeout(() => {
        const loadingSpinner = document.getElementById('loadingSpinner');
        loadingSpinner.style.opacity = '0';
        setTimeout(() => {
            loadingSpinner.style.display = 'none';
        }, 300);
    }, 1500);

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        html.classList.add('dark');
    }

    darkModeToggle.addEventListener('click', function() {
        html.classList.toggle('dark');
        
        // Save theme preference
        const theme = html.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        
        // Add a nice animation effect
        darkModeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            darkModeToggle.style.transform = 'scale(1)';
        }, 150);
    });

    // Scroll Progress Bar
    const progressBar = document.getElementById('progressFill');
    
    function updateProgressBar() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateProgressBar);

    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.pointerEvents = 'none';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // FAQ Expandable Sections
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        question.addEventListener('click', function() {
            const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    otherAnswer.style.maxHeight = '0px';
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current item
            if (isOpen) {
                answer.style.maxHeight = '0px';
                icon.style.transform = 'rotate(0deg)';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // Image Carousel
    const carousel = document.getElementById('carouselInner');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    const totalSlides = 3;
    
    function updateCarousel() {
        const translateX = -currentSlide * 100;
        carousel.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.remove('bg-gray-300', 'dark:bg-gray-600');
                dot.classList.add('bg-blue-600');
            } else {
                dot.classList.remove('bg-blue-600');
                dot.classList.add('bg-gray-300', 'dark:bg-gray-600');
            }
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            updateCarousel();
        });
    });
    
    // Auto-play carousel
    setInterval(nextSlide, 5000);

    // Character Counter for Contact Form
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    messageTextarea.addEventListener('input', function() {
        const currentLength = this.value.length;
        const maxLength = this.getAttribute('maxlength');
        charCount.textContent = `${currentLength}/${maxLength}`;
        
        // Change color based on character count
        if (currentLength > maxLength * 0.8) {
            charCount.classList.add('text-orange-500');
            charCount.classList.remove('text-gray-500', 'text-red-500');
        } else if (currentLength === parseInt(maxLength)) {
            charCount.classList.add('text-red-500');
            charCount.classList.remove('text-gray-500', 'text-orange-500');
        } else {
            charCount.classList.add('text-gray-500');
            charCount.classList.remove('text-orange-500', 'text-red-500');
        }
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Add background blur effect when scrolled
        if (scrollTop > 50) {
            navbar.classList.add('backdrop-blur-md', 'bg-white/90', 'dark:bg-gray-900/90');
            navbar.classList.remove('bg-white/80', 'dark:bg-gray-900/80');
        } else {
            navbar.classList.remove('backdrop-blur-md', 'bg-white/90', 'dark:bg-gray-900/90');
            navbar.classList.add('bg-white/80', 'dark:bg-gray-900/80');
        }
    });

    // Smooth Hover Effects for Cards and Buttons
    const hoverElements = document.querySelectorAll('button, .faq-item, .carousel-dot, a[href^="#"], a[href*="grub.hackclub.com"]');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease-out';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Form Submission with Loading State
    const contactForm = document.querySelector('#contact form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.innerHTML = `
            <div class="flex items-center justify-center">
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Sending...
            </div>
        `;
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = '✓ Message Sent!';
            submitBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
            submitBtn.classList.add('bg-green-600');
            
            // Reset form
            this.reset();
            charCount.textContent = '0/500';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('bg-green-600');
                submitBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
            }, 3000);
        }, 2000);
    });

    // Add entrance animations to elements as they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe FAQ items and other elements
    document.querySelectorAll('.faq-item, #contact > div, footer > div').forEach(el => {
        observer.observe(el);
    });

    // Custom Cursor Effect Enhancement
    document.addEventListener('mousemove', function(e) {
        // Create a subtle follow effect for interactive elements
        const interactiveElement = e.target.closest('button, a, .faq-question, .carousel-dot');
        if (interactiveElement) {
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'auto';
        }
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button:not(.faq-question)');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('absolute', 'bg-white', 'rounded-full', 'opacity-30', 'pointer-events-none');
            ripple.style.transform = 'scale(0)';
            ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Trigger animation
            setTimeout(() => {
                ripple.style.transform = 'scale(2)';
                ripple.style.opacity = '0';
            }, 10);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Keyboard navigation for carousel
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Initialize tooltips for interactive elements
    const tooltipElements = [
        { selector: '#darkModeToggle', text: 'Toggle dark mode' },
        { selector: '#scrollToTop', text: 'Scroll to top' },
        { selector: '#carouselPrev', text: 'Previous slide' },
        { selector: '#carouselNext', text: 'Next slide' }
    ];

    tooltipElements.forEach(({ selector, text }) => {
        const element = document.querySelector(selector);
        if (element) {
            element.setAttribute('title', text);
        }
    });
});
