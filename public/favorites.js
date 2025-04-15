// โหลดรายการอนิเมะที่ถูกใจ
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesGrid = document.getElementById('favorites-grid');
    const noFavoritesMessage = document.querySelector('.no-favorites-message');
    
    if (favorites.length === 0) {
        favoritesGrid.style.display = 'none';
        noFavoritesMessage.style.display = 'block';
        return;
    }

    noFavoritesMessage.style.display = 'none';
    favoritesGrid.style.display = 'grid';
    
    favoritesGrid.innerHTML = '';
    favorites.forEach(animeId => {
        const anime = animeData.find(a => a.id === animeId);
        if (anime) {
            const card = createAnimeCard(anime);
            favoritesGrid.appendChild(card);
        }
    });
}

// สร้างการ์ดอนิเมะ
function createAnimeCard(anime) {
    const card = document.createElement('div');
    card.className = 'anime-card';
    
    card.innerHTML = `
        <img src="${anime.image}" alt="${anime.title}">
        <div class="button-group">
            <button class="watch-btn" onclick="window.location.href='watch.html?id=${anime.id}'">
                <i class="fas fa-play"></i>
            </button>
            <button class="favorite-btn active" onclick="toggleFavorite('${anime.id}', this)">
                <i class="fas fa-heart"></i>
            </button>
        </div>
        <div class="anime-info">
            <h3>${anime.title}</h3>
            <p class="type">${anime.type}</p>
            <p class="description">${anime.description || ''}</p>
        </div>
    `;
    return card;
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
        // รีโหลดหน้าเมื่อลบออกจากรายการโปรด
        loadFavorites();
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// ฟังก์ชันค้นหา
function toggleSearchModal() {
    const modal = document.querySelector('.search-modal');
    if (!modal) return;
    
    if (modal.style.display === 'none' || modal.style.display === '') {
        modal.style.display = 'block';
        document.querySelector('.search-input').focus();
    } else {
        modal.style.display = 'none';
    }
}

// เพิ่ม Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
    
    // ตั้งค่าการค้นหา
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }
            
            const results = animeData.filter(anime => 
                anime.title.toLowerCase().includes(query) ||
                anime.description.toLowerCase().includes(query)
            );
            
            displaySearchResults(results);
        });
    }
    
    // ปิดหน้าค้นหาเมื่อคลิกนอกพื้นที่
    document.addEventListener('click', (e) => {
        const searchModal = document.querySelector('.search-modal');
        if (!e.target.closest('.search-container') && 
            !e.target.closest('.search-btn') && 
            searchModal && 
            searchModal.style.display === 'block') {
            searchModal.style.display = 'none';
        }
    });
});

// ฟังก์ชันแสดงผลการค้นหา
function displaySearchResults(results) {
    const searchResults = document.querySelector('.search-results');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p class="no-results">ไม่พบอนิเมะที่ค้นหา</p>';
        return;
    }
    
    searchResults.innerHTML = results.map(anime => `
        <div class="search-result-item" onclick="window.location.href='watch.html?id=${anime.id}'">
            <img src="${anime.image}" alt="${anime.title}">
            <div class="search-result-info">
                <h3>${anime.title}</h3>
                <p>${anime.type}</p>
            </div>
        </div>
    `).join('');
}

// แสดงอนิเมะที่ถูกใจ
function displayFavorites() {
    const favoritesContainer = document.getElementById('favorites-grid');
    const noFavoritesMessage = document.querySelector('.no-favorites-message');
    
    // ดึงรายการอนิเมะที่ถูกใจจาก localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.length === 0) {
        favoritesContainer.style.display = 'none';
        noFavoritesMessage.style.display = 'flex';
        return;
    }
    
    // จัดเรียงอนิเมะใหม่ล่าสุดอยู่บน
    const sortedFavorites = [...favorites].reverse();
    
    favoritesContainer.style.display = 'grid';
    noFavoritesMessage.style.display = 'none';
    favoritesContainer.innerHTML = '';
    
    sortedFavorites.forEach(animeId => {
        const anime = animeData.find(a => a.id === animeId);
        if (anime) {
            const card = createAnimeCard(anime);
            favoritesContainer.appendChild(card);
        }
    });
} 