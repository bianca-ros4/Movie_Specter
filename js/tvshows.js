/* ========== TV SOWS PAGE JS ========== */

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

// Load More — append another batch of cards
const grid = document.getElementById('moviesGrid');
const extraMovies = [
    { title: 'The Last of Us',      year: '2023', stars: '★★★★★', rating: '8.8', img: '../images/catalog/014.png' },
    { title: 'House of the Dragon', year: '2022', stars: '★★★★☆', rating: '8.5', img: '../images/catalog/064.jpg' },
    { title: 'The Boys',            year: '2019', stars: '★★★★☆', rating: '8.7', img: '../images/catalog/012.png' },
    { title: 'True Detective',      year: '2014', stars: '★★★★★', rating: '8.9', img: '../images/catalog/065.jpg' },
    { title: 'Narcos',              year: '2015', stars: '★★★★☆', rating: '8.8', img: '../images/catalog/066.jpg' },
];

let loaded = false;
document.querySelector('.load-more-btn').addEventListener('click', () => {
    if (loaded) return;
    loaded = true;
    extraMovies.forEach(m => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <div class="card-img-wrap">
                <img src="${m.img}" alt="${m.title}">
                <button class="card-fav">♡</button>
            </div>
            <div class="card-info"><span>${m.title}</span><span class="card-year">${m.year}</span></div>
            <div class="card-bottom"><span class="card-stars">${m.stars}</span><span class="card-rating">${m.rating}</span></div>
        `;
        // Re-attach fav listener for dynamically added cards
        card.querySelector('.card-fav').addEventListener('click', (e) => {
            e.stopPropagation();
            const btn = e.currentTarget;
            const active = btn.classList.toggle('fav-active');
            btn.textContent = active ? '♥' : '♡';
            btn.style.color = active ? '#FA5528' : '';
            btn.style.borderColor = active ? '#FA5528' : '';
        });
        grid.appendChild(card);
    });

    document.querySelector('.load-more-btn').textContent = 'No More Results';
    document.querySelector('.load-more-btn').style.opacity = '0.5';
    document.querySelector('.load-more-btn').style.cursor = 'default';
});
