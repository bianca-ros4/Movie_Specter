/* ========== MEMBERSHIP PAGE JS ========== */

// Accordion
document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('open'));

        // Open clicked if it wasn't already open
        if (!isOpen) item.classList.add('open');
    });
});
