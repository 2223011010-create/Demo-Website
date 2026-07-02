document.addEventListener("DOMContentLoaded", () => {
    initExperimentalHUDLens();
    initStaggeredRevelations();
});

/**
 * Experimental HUD Tracker Lens
 * Tracks the mouse cursor over grid nodes and scales up to deliver contextual tooltips.
 */
function initExperimentalHUDLens() {
    const lens = document.querySelector('.magnetic-lens');
    const nodes = document.querySelectorAll('.dynamic-lens-trigger');

    if (window.innerWidth > 1024 && lens) {
        window.addEventListener('mousemove', (e) => {
            lens.style.left = `${e.clientX}px`;
            lens.style.top = `${e.clientY}px`;
        });

        nodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
                const textContext = node.getAttribute('data-hud') || "EXPLORE";
                lens.innerText = textContext;
                lens.style.width = '110px';
                lens.style.height = '110px';
                lens.style.opacity = '1';
            });

            node.addEventListener('mouseleave', () => {
                lens.style.width = '0px';
                lens.style.height = '0px';
                lens.style.opacity = '0';
                lens.innerText = '';
            });
        });
    }
}

/**
 * Sequential Entrance Reveal
 * Staggers components gracefully using Intersection Observers.
 */
function initStaggeredRevelations() {
    const entranceTargets = document.querySelectorAll(
        '.hero-display-panel > *, .metric-node, .bento-node, .directory-link-row'
    );

    const observerOptions = {
        root: null,
        threshold: 0.05
    };

    const entryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    entranceTargets.forEach((target, index) => {
        target.style.opacity = "0";
        target.style.transform = "translateY(25px)";
        target.style.transition = "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
        target.style.transitionDelay = `${(index % 4) * 0.06}s`;
        entryObserver.observe(target);
    });
}
