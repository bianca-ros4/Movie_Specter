let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let isAnimating = false;

function showSlide(newIndex, direction) {
    if (isAnimating || newIndex === slideIndex) return;
    isAnimating = true;

    const currentSlide = slides[slideIndex];
    const nextSlide = slides[newIndex];

    // 1. Position the NEXT slide instantly (no animation)
    nextSlide.style.transition = 'none';
    nextSlide.classList.remove("active", "exit-left", "exit-right");
    nextSlide.classList.add(direction === "next" ? "enter-right" : "enter-left");

    // 2. Force the browser to acknowledge the starting position
    void nextSlide.offsetWidth;

    // 3. Start the animation
    nextSlide.style.transition = ''; // Restore CSS transition
    
    // Move current slide out
    currentSlide.classList.add(direction === "next" ? "exit-left" : "exit-right");
    currentSlide.classList.remove("active");

    // Move next slide in
    nextSlide.classList.add("active");
    nextSlide.classList.remove("enter-left", "enter-right");

    // Update Dots
    dots.forEach(dot => dot.classList.remove("active"));
    dots[newIndex].classList.add("active");

    slideIndex = newIndex;

    // 4. Cleanup after animation finishes
    setTimeout(() => {
        // Clear out the movement classes from the old slide
        currentSlide.classList.remove("exit-left", "exit-right");
        isAnimating = false;
    }, 900); // Must match your CSS 0.9s
}

function changeSlide(step) {
    let newIndex = slideIndex + step;
    if (newIndex >= slides.length) newIndex = 0;
    if (newIndex < 0) newIndex = slides.length - 1;
    showSlide(newIndex, step > 0 ? "next" : "prev");
}

function currentSlide(n) {
    showSlide(n, n > slideIndex ? "next" : "prev");
}

setInterval(() => {
    changeSlide(1);
}, 4000);

/* ========== BEST MOVIES BANNER SLIDER ========== */
let bannerIndex = 0;
const bannerSlides = document.querySelectorAll('.banner-slides:first-of-type .banner-slide') || [];

function initBannerSlider(slidesSelector, dotsSelector, indexVar) {
    // Generic banner slider handled per-instance below
}

// Best Movies slider
let bestMoviesIdx = 0;
const bestMoviesSlides = document.querySelectorAll('#best-movies .banner-slide');
const bestMoviesDots = document.querySelectorAll('#best-movies .banner-dot');
let bestMoviesAnim = false;

function changeBanner(step) {
    let next = bestMoviesIdx + step;
    if (next >= bestMoviesSlides.length) next = 0;
    if (next < 0) next = bestMoviesSlides.length - 1;
    showBanner(next, step > 0 ? 'next' : 'prev', bestMoviesSlides, bestMoviesDots, () => { bestMoviesIdx = next; });
}
function currentBanner(n) {
    showBanner(n, n > bestMoviesIdx ? 'next' : 'prev', bestMoviesSlides, bestMoviesDots, () => { bestMoviesIdx = n; });
}

// Best TV Shows slider
let bestTvIdx = 0;
const bestTvSlides = document.querySelectorAll('#best-tvshows .banner-slide');
const bestTvDotEls = document.querySelectorAll('#best-tvshows .banner-dot');

function changeBestTv(step) {
    let next = bestTvIdx + step;
    if (next >= bestTvSlides.length) next = 0;
    if (next < 0) next = bestTvSlides.length - 1;
    showBanner(next, step > 0 ? 'next' : 'prev', bestTvSlides, bestTvDotEls, () => { bestTvIdx = next; });
}
function currentBestTv(n) {
    showBanner(n, n > bestTvIdx ? 'next' : 'prev', bestTvSlides, bestTvDotEls, () => { bestTvIdx = n; });
}

function showBanner(newIdx, direction, slides, dots, setIdx) {
    const currentIdx = Array.from(slides).findIndex(s => s.classList.contains('active'));
    if (currentIdx === newIdx) return;
    const current = slides[currentIdx];
    const next = slides[newIdx];

    next.style.transition = 'none';
    next.style.transform = direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
    next.style.opacity = '1';
    void next.offsetWidth;
    next.style.transition = '';

    current.classList.add('exit-left');
    current.classList.remove('active');
    next.style.transform = 'translateX(0)';
    next.classList.add('active');

    dots.forEach(d => d.classList.remove('active'));
    dots[newIdx].classList.add('active');

    setTimeout(() => {
        current.classList.remove('exit-left');
        current.style.transform = '';
        current.style.opacity = '';
        setIdx();
    }, 800);
}

/* ========== ROW SLIDERS ========== */
function scrollRow(rowId, direction) {
    const row = document.getElementById(rowId);
    const cardWidth = row.querySelector('.movie-card').offsetWidth + 16;
    const visibleCards = Math.floor(row.offsetWidth / cardWidth);
    row.scrollLeft += direction * cardWidth * visibleCards;
}

setInterval(() => { changeBanner(1); }, 5000);
setInterval(() => { changeBestTv(1); }, 6000);

// Favourite toggle
document.querySelectorAll('.card-fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const active = btn.classList.toggle('fav-active');
        btn.textContent = active ? '♥' : '♡';
        btn.style.color = active ? '#FA5528' : '';
        btn.style.borderColor = active ? '#FA5528' : '';
    });
});

function openPreview() {
    window.location.href = "html/preview.html";
}