// Egyptian History Portal - Interactive Navigation
document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item');
    const overlays = document.querySelectorAll('.modal-overlay');
    const closeButtons = document.querySelectorAll('.close-modal');
    const portalTitle = document.getElementById('portalTitle');
    const starsContainer = document.getElementById('starsContainer');
    const themeToggle = document.getElementById('themeToggle');

    // Create stars - Optimized with DocumentFragment
    function createStars() {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.opacity = Math.random() * 0.5 + 0.3;
            fragment.appendChild(star);
        }
        starsContainer.appendChild(fragment);
    }
    createStars();

    // Theme Toggle
    function initTheme() {
        const savedTheme = localStorage.getItem('egyptianPortalTheme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    initTheme();

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('egyptianPortalTheme', newTheme);
        });
    }

    // Open section function - make it global for CTA buttons
    window.openSection = function (sectionId) {
        overlays.forEach(o => o.classList.remove('active'));
        navItems.forEach(n => n.classList.remove('active'));

        const target = document.getElementById(sectionId);
        if (target) {
            target.classList.add('active');
            portalTitle.classList.add('hidden');
            document.body.style.overflow = 'hidden';

            // Mark nav item as active
            navItems.forEach(n => {
                if (n.dataset.section === sectionId) {
                    n.classList.add('active');
                }
            });

            // Lazy Load Images
            const lazyImages = target.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });

            // Lazy Load Backgrounds
            const lazyBackgrounds = target.querySelectorAll('[data-bg]');
            lazyBackgrounds.forEach(bg => {
                bg.style.backgroundImage = `url('${bg.dataset.bg}')`;
                bg.removeAttribute('data-bg');
            });

            // Animate cards
            const cards = target.querySelectorAll('.feature-card, .artifact-card, .credit-card, .stat-item, .timeline-item, .highlight-card, .visit-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 80 + (index * 60));
            });

            // Animate stats numbers
            animateStats(target);
        }
    };

    // Close section function
    function closeSection(overlay) {
        overlay.classList.remove('active');
        portalTitle.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        navItems.forEach(n => n.classList.remove('active'));
    }

    // Animate stat numbers
    function animateStats(section) {
        const statNumbers = section.querySelectorAll('.stat-number[data-count]');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current).toLocaleString();
                }
            }, 30);
        });
    }

    // Nav click handlers
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionId = this.dataset.section;

            // Click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            openSection(sectionId);
        });
    });

    // Close button handlers
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const overlay = this.closest('.modal-overlay');
            closeSection(overlay);
        });
    });

    // Click outside to close
    overlays.forEach(overlay => {
        overlay.addEventListener('click', function (e) {
            if (e.target === this) {
                closeSection(this);
            }
        });
    });

    // Escape key to close
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            overlays.forEach(overlay => {
                if (overlay.classList.contains('active')) {
                    closeSection(overlay);
                }
            });
        }
    });

    // Entrance animations
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 400 + (index * 100));
    });

    // Title animation
    if (portalTitle) {
        portalTitle.style.opacity = '0';
        portalTitle.style.transform = 'translate(-50%, -60%) scale(0.9)';
        setTimeout(() => {
            portalTitle.style.transition = 'all 0.8s ease';
            portalTitle.style.opacity = '1';
            portalTitle.style.transform = 'translate(-50%, -60%) scale(1)';
        }, 200);
    }

    console.log('🏛️ Egyptian History Portal loaded!');
});
