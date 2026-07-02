document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Brutalist Staggered Text & Table Fade Reveal ---
    const revealOptions = {
        root: null,
        threshold: 0.05,
        rootMargin: '0px 0px -60px 0px' // Triggers slightly before element enters viewport
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animating to keep performance clean
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Target elements to animate on scroll
    const elementsToReveal = document.querySelectorAll('.main-title, .manifesto-para, .metric-row, .table-row, .project-link-row, .huge-email');
    
    elementsToReveal.forEach((el, index) => {
        // Add basic preparation class
        el.classList.add('reveal-init');
        revealObserver.observe(el);
    });


    // --- 2. Kinetic Text Skew Distortion on Fast Scroll ---
    let proxy = { skew: 0 };
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const titles = document.querySelectorAll('.main-title');

    function skewEffect() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const delta = currentScrollTop - lastScrollTop;
        lastScrollTop = currentScrollTop;

        // Calculate dynamic velocity skew bounding between -6 and 6 degrees
        let skew = Math.min(Math.max(delta * 0.08, -6), 6);
        
        // Smooth interpolation back to 0
        proxy.skew += (skew - proxy.skew) * 0.1;

        titles.forEach(title => {
            title.style.transform = `skewY(${proxy.skew}deg)`;
        });

        requestAnimationFrame(skewEffect);
    }
    
    // Initialize skew motion only on wider screens to preserve mobile performance
    if (window.innerWidth > 768) {
        requestAnimationFrame(skewEffect);
    }
});
