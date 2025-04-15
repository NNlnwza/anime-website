// คลังอนิเมะที่กดใจ
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// ฟังก์ชันสร้างการ์ดอนิเมะ
function createAnimeCards() {
    const animeGrid = document.querySelector('.anime-grid');
    if (!animeGrid) return;

    animeGrid.innerHTML = animeData.map(anime => `
        <div class="anime-card" data-anime-id="${anime.id}">
            <img src="${anime.image}" alt="${anime.title}">
            <div class="anime-info">
                <h3>${anime.title}</h3>
                <span class="type">${anime.type}</span>
                <p class="description">${anime.description}</p>
            </div>
            <div class="button-group">
                <button class="watch-btn" onclick="playAnime('${anime.id}')">
                    <i class="fas fa-play"></i>
                </button>
                <button class="favorite-btn ${favorites.includes(anime.id) ? 'active' : ''}" 
                        onclick="toggleFavorite('${anime.id}', this)">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// ฟังก์ชันเพิ่ม/ลบอนิเมะที่ถูกใจ
function toggleFavorite(animeId, button) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.indexOf(animeId);
    
    if (index === -1) {
        favorites.push(animeId);
        button.classList.add('active');
    } else {
        favorites.splice(index, 1);
        button.classList.remove('active');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// ฟังก์ชันค้นหาอนิเมะ
function searchAnime(query) {
    const searchResults = document.querySelector('.search-results');
    if (!searchResults) return;

    const results = animeData.filter(anime => 
        anime.title.toLowerCase().includes(query.toLowerCase()) ||
        anime.description.toLowerCase().includes(query.toLowerCase())
    );
    
    searchResults.innerHTML = results.map(anime => `
        <div class="search-result-card">
            <img class="search-result-image" src="${anime.image}" alt="${anime.title}">
            <div class="search-result-info">
                <div class="search-result-title">${anime.title}</div>
                <div class="search-result-type">${anime.type}</div>
            </div>
            <div class="search-result-actions">
                <button class="search-result-btn" onclick="playAnime('${anime.id}')">
                    <i class="fas fa-play"></i>
                </button>
                <button class="search-result-btn ${favorites.includes(anime.id) ? 'active' : ''}" 
                        onclick="toggleFavorite('${anime.id}', this)">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// ฟังก์ชันแสดง/ซ่อนหน้าค้นหา
function toggleSearchModal() {
    const modal = document.querySelector('.search-modal');
    if (!modal) return;
    modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
}

// ฟังก์ชันเล่นอนิเมะ
function playAnime(animeId) {
    window.location.href = `watch.html?id=${animeId}&ep=1`;
}

// แก้ไขฟังก์ชัน createAnimeCard
function createAnimeCard(anime) {
    const card = document.createElement('div');
    card.className = 'anime-card';
    
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.includes(anime.id);
    
    card.innerHTML = `
        <img src="${anime.image}" alt="${anime.title}">
        <div class="anime-info">
            <h3>${anime.title}</h3>
            <p>${anime.type}</p>
            <div class="anime-actions">
                <button class="play-btn" onclick="window.location.href='watch.html?id=${anime.id}'">
                    <i class="fas fa-play"></i> ดูตอนนี้
                </button>
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite('${anime.id}', this)">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `;
    return card;
}

// แสดงการ์ดอนิเมะ
function displayAnimeCards(animeList, container) {
    // จัดเรียงอนิเมะใหม่ล่าสุดอยู่บน
    const sortedAnime = [...animeList].reverse();
    
    container.innerHTML = '';
    sortedAnime.forEach(anime => {
        const card = createAnimeCard(anime);
        container.appendChild(card);
    });
}

// เพิ่ม Event Listeners เมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', () => {
    // สร้างการ์ดอนิเมะ
    createAnimeCards();
    
    // ตั้งค่าการค้นหา
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchAnime(e.target.value);
        });
    }
    
    // ปิดหน้าค้นหาเมื่อคลิกนอกพื้นที่
    document.addEventListener('click', (e) => {
        const searchModal = document.querySelector('.search-modal');
        const searchBtn = document.querySelector('.search-btn');
        if (!e.target.closest('.search-container') && 
            !e.target.closest('.search-btn') && 
            searchModal && 
            searchModal.style.display === 'block') {
            searchModal.style.display = 'none';
        }
    });

    // ตั้งค่าปุ่มค้นหา
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', toggleSearchModal);
    }
}); 