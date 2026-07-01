/* ========== PREVIEW PAGE JS ========== */

/* ── Episode data per season ── */
const seasons = {
    1: [
        { title: '1. Pilot',                   duration: '46:25', img: '../images/preview/s1/001.jpg' },
        { title: '2. Wendigo',                 duration: '43:15', img: '../images/preview/s1/002.jpg' },
        { title: '3. Dead in the Water',       duration: '43:46', img: '../images/preview/s1/003.jpg' },
        { title: '4. Phantom Traveler',        duration: '42:10', img: '../images/preview/s1/004.jpg' },
        { title: '5. Bloody Mary',             duration: '41:55', img: '../images/preview/s1/005.jpg' },
        { title: '6. Skin',                    duration: '43:02', img: '../images/preview/s1/006.jpg' },
        { title: '7. Hook Man',                duration: '42:30', img: '../images/preview/s1/007.jpg' },
        { title: '8. Bugs',                    duration: '43:05', img: '../images/preview/s1/008.jpg' },
        { title: '9. Home',                    duration: '43:20', img: '../images/preview/s1/009.jpg' },
        { title: '10. Asylum',                 duration: '42:50', img: '../images/preview/s1/010.jpg' },
        { title: '11. Scarecrow',              duration: '43:00', img: '../images/preview/s1/011.jpg' },
        { title: '12. Faith',                  duration: '43:30', img: '../images/preview/s1/012.jpg' },
        { title: '13. Route 666',              duration: '42:45', img: '../images/preview/s1/013.jpg' },
        { title: '14. Nightmare',              duration: '43:10', img: '../images/preview/s1/014.jpg' },
        { title: '15. The Benders',            duration: '42:55', img: '../images/preview/s1/015.jpg' },
        { title: '16. Shadow',                 duration: '43:05', img: '../images/preview/s1/016.jpg' },
        { title: '17. Hell House',             duration: '42:35', img: '../images/preview/s1/017.jpg' },
        { title: '18. Something Wicked',       duration: '43:15', img: '../images/preview/s1/018.jpg' },
        { title: '19. Provenance',             duration: '42:50', img: '../images/preview/s1/019.jpg' },
        { title: '20. Dead Man\'s Blood',      duration: '43:25', img: '../images/preview/s1/020.jpg' },
        { title: '21. Salvation',              duration: '42:40', img: '../images/preview/s1/021.jpg' },
        { title: '22. Devil\'s Trap',          duration: '43:50', img: '../images/preview/s1/022.jpg' }
    ],
    2: [
        { title: '1. In My Time of Dying',       duration: '44:10', img: '../images/preview/s2/001.jpg' },
        { title: '2. Everybody Loves a Clown',   duration: '43:50', img: '../images/preview/s2/002.jpg' },
        { title: '3. Bloodlust',                 duration: '42:40', img: '../images/preview/s2/003.jpg' },
        { title: '4. Children Shouldn\'t Play',  duration: '43:20', img: '../images/preview/s2/004.jpg' },
        { title: '5. Simon Said',                duration: '41:55', img: '../images/preview/s2/005.jpg' },
        { title: '6. No Exit',                   duration: '42:15', img: '../images/preview/s2/006.jpg' },
    ],

    3: [
        { title: '1. The Magnificent Seven',     duration: '43:30', img: '../images/preview/s3/001.jpg' },
        { title: '2. The Kids Are Alright',      duration: '42:45', img: '../images/preview/s3/002.jpg' },
        { title: '3. Bad Day at Black Rock',     duration: '43:10', img: '../images/preview/s3/003.jpg' },
        { title: '4. Sin City',                  duration: '44:00', img: '../images/preview/s3/004.jpg' },
        { title: '5. Bedtime Stories',           duration: '42:55', img: '../images/preview/s3/005.jpg' },
    ],

    4: [
        { title: '1. Lazarus Rising',            duration: '44:25', img: '../images/preview/s4/001.jpg' },
        { title: '2. Are You There God?',        duration: '43:40', img: '../images/preview/s4/002.jpg' },
        { title: '3. In The Beginning',          duration: '42:50', img: '../images/preview/s4/003.jpg' },
        { title: '4. Metamorphosis',             duration: '43:05', img: '../images/preview/s4/004.jpg' },
        { title: '5. Monster Movie',             duration: '41:30', img: '../images/preview/s4/005.jpg' },
    ],

    5: [
        { title: '1. Sympathy for the Devil',    duration: '44:50', img: '../images/preview/s5/001.jpg' },
        { title: '2. Good God, Y\'All!',         duration: '43:15', img: '../images/preview/s5/002.jpg' },
        { title: '3. Free to Be You and Me',     duration: '42:40', img: '../images/preview/s5/003.jpg' },
        { title: '4. The End',                   duration: '43:55', img: '../images/preview/s5/004.jpg' },
        { title: '5. Fallen Idols',              duration: '42:20', img: '../images/preview/s5/005.jpg' },
    ],
};

/* ── Render episodes ── */
function renderEpisodes(seasonNum) {
    const row = document.getElementById('episodeRow');
    row.innerHTML = '';
    const eps = seasons[seasonNum] || [];
    eps.forEach(ep => {
        const card = document.createElement('div');
        card.className = 'ep-card';
        card.innerHTML = `
            <div class="ep-card-img">
                <img src="${ep.img}" alt="${ep.title}"
                     onerror="this.style.display='none'">
            </div>
            <div class="ep-card-footer">
                <span class="ep-title">${ep.title}</span>
                <span class="ep-duration">${ep.duration}</span>
            </div>
        `;
        row.appendChild(card);
    });
}

/* Season selector */
document.getElementById('seasonSelect').addEventListener('change', function () {
    renderEpisodes(parseInt(this.value));
});

/* Init with season 1 */
renderEpisodes(1);

/* ── Episode row arrows ── */
document.getElementById('epLeft').addEventListener('click', () => {
    const row = document.getElementById('episodeRow');
    const cardW = row.querySelector('.ep-card')?.offsetWidth + 16 || 296;
    row.scrollLeft -= cardW * 2;
});

document.getElementById('epRight').addEventListener('click', () => {
    const row = document.getElementById('episodeRow');
    const cardW = row.querySelector('.ep-card')?.offsetWidth + 16 || 296;
    row.scrollLeft += cardW * 2;
});

/* ── Play / video logic ── */
const hero        = document.getElementById('previewHero');
const playBtn     = document.getElementById('heroPlayBtn');
const videoWrap   = document.getElementById('heroVideoWrap');
const video       = document.getElementById('heroVideo');
const closeBtn    = document.getElementById('videoCloseBtn');

// Click play → show video, hide backdrop
playBtn.addEventListener('click', () => {
    hero.classList.add('video-active');
    videoWrap.classList.add('active');
    video.play().catch(() => {
        // If no video file is present, just show the player UI — no crash
    });
});

// Click ✕ → go back to backdrop
closeBtn.addEventListener('click', () => {
    video.pause();
    video.currentTime = 0;
    videoWrap.classList.remove('active');
    hero.classList.remove('video-active');
});

// ESC key also closes the video
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && videoWrap.classList.contains('active')) {
        closeBtn.click();
    }
});
