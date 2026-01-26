document.addEventListener('DOMContentLoaded', () => {
    
    // --- DARK MODE TOGGLE ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const body = document.body;

    // Check Local Storage for user preference on page load
    const currentTheme = localStorage.getItem('theme');

    // If preference is 'dark', apply it immediately
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Event Listener for the toggle button
    themeToggleBtn.addEventListener('click', () => {
        // Toggle the class on body
        body.classList.toggle('dark-mode');

        // Check if dark mode is now active
        const isDarkMode = body.classList.contains('dark-mode');

        // Switch icon and save preference
        if (isDarkMode) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });


    // --- MOBILE NAVIGATION ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    // Note: We now target the container wrapping the nav and toggle
    const navRightSide = document.querySelector('.nav-right-side');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        navRightSide.classList.toggle('active');
        mobileMenuBtn.classList.toggle('is-active');
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navRightSide.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // --- SCROLL ANIMATIONS ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and project cards
    document.querySelectorAll('section, .project-card').forEach(el => {
        el.classList.add('fade-in-element');
        observer.observe(el);
    });
});