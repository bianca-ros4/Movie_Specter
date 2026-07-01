/* ========== PROFILE PAGE ========== */

const categories = {
    watched: {
        label: 'Watched',
        cards: [
            { img: '../images/catalog/009.jpg',     title: 'Avatar',                                    year: '2009', stars: '★★★★☆', rating: '7.9', fav: false },
            { img: '../images/catalog/010.png',     title: 'The Witcher',                               year: '2019', stars: '★★★★☆', rating: '8.2', fav: false },
            { img: '../images/catalog/004.jpg',     title: 'Black Widow',                               year: '2021', stars: '★★★☆☆', rating: '6.7', fav: false },
            { img: '../images/catalog/003.jpg',     title: 'The 100',                                   year: '2014', stars: '★★★★☆', rating: '7.6', fav: false },
            { img: '../images/catalog/006.jpg',     title: 'Supernatural',                              year: '2005', stars: '★★★★☆', rating: '8.4', fav: true },
            { img: '../images/catalog/020.jpg',     title: 'Deja Vu',                                   year: '2006', stars: '★★★★☆', rating: '7.1', fav: true },
            { img: '../images/catalog/067.jpeg',    title: 'The Originals',                             year: '2013', stars: '★★★★☆', rating: '8.2', fav: true },
            { img: '../images/catalog/045.jpg',     title: 'Fight Club',                                year: '1999', stars: '★★★★★', rating: '8.8', fav: true },
            { img: '../images/catalog/068.jpg',     title: 'The Maze Runner',                           year: '2014', stars: '★★★☆☆', rating: '6.8', fav: true },
            { img: '../images/catalog/069.jpg',     title: 'Pulp Fiction',                              year: '1994', stars: '★★★★★', rating: '8.9', fav: true },
            { img: '../images/catalog/070.jpeg',    title: 'Pirates of the Caribbean: At World’s End',  year: '2007', stars: '★★★★☆', rating: '7.1', fav: true }
        ]
    },

    favorites: {
        label: 'Favorites',
        cards: [
            { img: '../images/catalog/003.jpg',     title: 'Supernatural',                              year: '2005', stars: '★★★★☆', rating: '8.4', fav: true },
            { img: '../images/catalog/020.jpg',     title: 'Deja Vu',                                   year: '2006', stars: '★★★★☆', rating: '7.1', fav: true },
            { img: '../images/catalog/067.jpeg',    title: 'The Originals',                             year: '2013', stars: '★★★★☆', rating: '8.2', fav: true },
            { img: '../images/catalog/045.jpg',     title: 'Fight Club',                                year: '1999', stars: '★★★★★', rating: '8.8', fav: true },
            { img: '../images/catalog/068.jpg',     title: 'The Maze Runner',                           year: '2014', stars: '★★★☆☆', rating: '6.8', fav: true },
            { img: '../images/catalog/069.jpg',     title: 'Pulp Fiction',                              year: '1994', stars: '★★★★★', rating: '8.9', fav: true },
            { img: '../images/catalog/070.jpeg',    title: 'Pirates of the Caribbean: At World’s End',  year: '2007', stars: '★★★★☆', rating: '7.1', fav: true }
        ]
    },

    watchlist: {
        label: 'Watch List',
        cards: [
            { img: '../images/catalog/046.jpg',     title: 'Interstellar',   year: '2014', stars: '★★★★★', rating: '8.7', fav: false },
            { img: '../images/catalog/028.jpg',     title: 'Inception',      year: '2010', stars: '★★★★★', rating: '8.8', fav: false },
            { img: '../images/catalog/035.jpg',     title: 'Joker',          year: '2019', stars: '★★★★☆', rating: '8.4', fav: false },
            { img: '../images/catalog/038.jpg',     title: 'Shutter Island', year: '2010', stars: '★★★★☆', rating: '8.2', fav: false },
            { img: '../images/catalog/071.jpg',     title: 'The Revenant',   year: '2015', stars: '★★★★☆', rating: '8.0', fav: false },
            { img: '../images/catalog/054.jpg',     title: 'Peaky Blinders', year: '2013', stars: '★★★★★', rating: '8.8', fav: false },
            { img: '../images/catalog/056.jpg',     title: 'Dark',           year: '2017', stars: '★★★★★', rating: '8.8', fav: false }
        ]
    }
};

let current = 'watched';

function makeCard(c) {
    const div = document.createElement('div');
    div.className = 'movie-card';
    div.innerHTML = `
        <div class="card-img-wrap">
            <img src="${c.img}" alt="${c.title}">
            <button class="card-fav ${c.fav ? 'fav-active' : ''}">${c.fav ? '♥' : '♡'}</button>
        </div>
        <div class="card-info"><span>${c.title}</span><span class="card-year">${c.year}</span></div>
        <div class="card-bottom"><span class="card-stars">${c.stars}</span><span class="card-rating">${c.rating}</span></div>
    `;
    div.querySelector('.card-fav').addEventListener('click', e => {
        e.stopPropagation();
        const btn = e.currentTarget;
        const active = btn.classList.toggle('fav-active');
        btn.textContent = active ? '♥' : '♡';
    });
    return div;
}

function renderCategory(cat) {
    // Update title
    document.getElementById('categoryTitle').textContent = categories[cat].label;

    // Update the "other" buttons — show the other two categories
    const others = Object.keys(categories).filter(k => k !== cat);
    document.getElementById('categoryOthers').innerHTML = others
        .map(k => `<button class="cat-btn" data-cat="${k}">${categories[k].label}</button>`)
        .join('');

    // Re-attach click handlers
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            current = btn.dataset.cat;
            renderCategory(current);
        });
    });

    // Render cards
    const grid = document.getElementById('profileGrid');
    grid.innerHTML = '';
    categories[cat].cards.forEach(c => grid.appendChild(makeCard(c)));

    // Reset search
    document.getElementById('profileSearch').value = '';
}

// Init
renderCategory(current);

// Search
document.getElementById('profileSearch').addEventListener('input', function () {
    const q = this.value.toLowerCase();
    document.querySelectorAll('#profileGrid .movie-card').forEach(card => {
        const title = card.querySelector('.card-info span')?.textContent.toLowerCase() || '';
        card.style.display = title.includes(q) ? '' : 'none';
    });
});
