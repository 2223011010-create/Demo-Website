document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimations();
    initMagneticButtons();
    initBentoHoverEffect();
    initDynamicYear();
});

/**
 * 1. Smooth Staggered Scroll Animations
 * Uses Intersection Observer to fade and slide up components as they enter view.
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target); // Run animation only once
            }
        });
    }, observerOptions);

    // Target hero elements, bento cards, and link rows
    const animElements = document.querySelectorAll(
        '.hero-section > *, .bento-card, .link-row'
    );
    
    animElements.forEach((el, index) => {
        el.classList.add("reveal-on-scroll");
        // Apply slight layout stagger delay based on sequence
        el.style.transitionDelay = `${(index % 4) * 0.08}s`;
        observer.observe(el);
    });
}

/**
 * 2. Magnetic Button Effect
 * Pulls the primary dynamic CTA buttons towards the cursor when hovering nearby.
 */
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.btn-primary, .nav-cta');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const bound = btn.getBoundingClientRect();
            // Calculate cursor position relative to the center of the button
            const x = e.clientX - (bound.left + bound.width / 2);
            const y = e.clientY - (bound.top + bound.height / 2);
            
            // Pull intensity (adjust divider to increase/decrease magnetism)
            btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            // Smoothly snap back to original position
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}

/**
 * 3. Bento Card Lighting Effect
 * Follows the user's cursor with a subtle reactive alpha light overlay.
 */
function initBentoHoverEffect() {
    const cards = document.querySelectorAll('.bento-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Inject dynamic glow CSS variables directly into the hovered element
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/**
 * 4. Dynamic Date Handler
 * Fallback to keep the footer synchronized.
 */
function initDynamicYear() {
    const footerText = document.querySelector('.footer p');
    if (footerText) {
        const currentYear = new Date().getFullYear();
        footerText.innerHTML = `&copy; ${currentYear} Soyed Shafikul Ahsan. All rights reserved.`;
    }
}
