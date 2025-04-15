// คลังอนิเมะที่กดใจ
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
// จำนวนการเข้าชมของแต่ละอนิเมะ
let viewCounts = JSON.parse(localStorage.getItem('viewCounts')) || {};

// ฟังก์ชันเพิ่มจำนวนการเข้าชม
function incrementViewCount(animeId) {
    viewCounts[animeId] = (viewCounts[animeId] || 0) + 1;
    localStorage.setItem('viewCounts', JSON.stringify(viewCounts));
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
    incrementViewCount(animeId);
    window.location.href = `watch.html?id=${animeId}&ep=1`;
}

// ฟังก์ชันสร้างการ์ดอนิเมะ
function createAnimeCard(anime) {
    const card = document.createElement('div');
    card.className = 'anime-card';
    
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.includes(anime.id);
    
    card.innerHTML = `
        <img src="${anime.image}" alt="${anime.title}">
        <div class="anime-info">
            <h3>${anime.title}</h3>
            <span class="type">${anime.type}</span>
            <p class="description">${anime.description}</p>
            <div class="button-group">
                <button class="watch-btn" onclick="playAnime('${anime.id}')">
                    <i class="fas fa-play"></i>
                </button>
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite('${anime.id}', this)">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `;
    return card;
}

// เพิ่ม Event Listeners เมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', () => {
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

    // แสดงอนิเมะแนะนำ (10 เรื่องที่มีคนดูมากที่สุด)
    const recommendedGrid = document.querySelector('#recommended .anime-grid');
    if (recommendedGrid) {
        const sortedByViews = [...animeData].sort((a, b) => {
            const viewsA = viewCounts[a.id] || 0;
            const viewsB = viewCounts[b.id] || 0;
            return viewsB - viewsA;
        });
        
        sortedByViews.slice(0, 10).forEach(anime => {
            const card = createAnimeCard(anime);
            recommendedGrid.appendChild(card);
        });
    }

    // แสดงอนิเมะมาใหม่ (10 เรื่องล่าสุด)
    const newAnimeGrid = document.querySelector('#new-anime .anime-grid');
    if (newAnimeGrid) {
        const latestAnime = [...animeData].reverse().slice(0, 10);
        latestAnime.forEach(anime => {
            const card = createAnimeCard(anime);
            newAnimeGrid.appendChild(card);
        });
    }

    // แสดงอนิเมะทั้งหมด (เรียงตามตัวอักษร)
    const allAnimeGrid = document.querySelector('#all-anime .anime-grid');
    if (allAnimeGrid) {
        const sortedByTitle = [...animeData].sort((a, b) => 
            a.title.localeCompare(b.title, 'th')
        );
        sortedByTitle.forEach(anime => {
            const card = createAnimeCard(anime);
            allAnimeGrid.appendChild(card);
        });
    }

    // เพิ่ม event listener สำหรับการเลื่อนในแต่ละส่วน
    const sections = ['recommended', 'new-anime', 'all-anime'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const animeGrid = section.querySelector('.anime-grid');
            animeGrid.addEventListener('scroll', function() {
                const isAtEnd = this.scrollLeft + this.clientWidth >= this.scrollWidth - 10;
                const scrollLeftBtn = section.querySelector('.scroll-left');
                const scrollRightBtn = section.querySelector('.scroll-right');
                
                if (isAtEnd) {
                    scrollRightBtn.innerHTML = '<i class="fas fa-angle-double-left"></i>';
                    scrollRightBtn.onclick = () => scrollToStart(sectionId);
                    scrollRightBtn.classList.add('to-start');
                } else {
                    scrollRightBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
                    scrollRightBtn.onclick = () => scrollAnimeList('right', sectionId);
                    scrollRightBtn.classList.remove('to-start');
                }
                
                if (this.scrollLeft <= 0) {
                    scrollLeftBtn.style.opacity = '0.5';
                    scrollLeftBtn.style.cursor = 'not-allowed';
                } else {
                    scrollLeftBtn.style.opacity = '1';
                    scrollLeftBtn.style.cursor = 'pointer';
                }
            });
        }
    });
});

function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger-menu');
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function scrollAnimeList(direction, sectionId) {
    const section = document.getElementById(sectionId);
    const animeGrid = section.querySelector('.anime-grid');
    const scrollAmount = direction === 'left' ? -300 : 300;
    animeGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    
    // ตรวจสอบว่าเลื่อนถึงท้ายหรือยัง
    setTimeout(() => {
        const isAtEnd = animeGrid.scrollLeft + animeGrid.clientWidth >= animeGrid.scrollWidth - 10;
        const scrollLeftBtn = section.querySelector('.scroll-left');
        const scrollRightBtn = section.querySelector('.scroll-right');
        
        // แสดง/ซ่อนปุ่มตามตำแหน่งการเลื่อน
        if (isAtEnd) {
            scrollRightBtn.innerHTML = '<i class="fas fa-angle-double-left"></i>';
            scrollRightBtn.onclick = () => scrollToStart(sectionId);
            scrollRightBtn.classList.add('to-start');
        } else {
            scrollRightBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            scrollRightBtn.onclick = () => scrollAnimeList('right', sectionId);
            scrollRightBtn.classList.remove('to-start');
        }
        
        // ตรวจสอบว่าอยู่ที่จุดเริ่มต้นหรือไม่
        if (animeGrid.scrollLeft <= 0) {
            scrollLeftBtn.style.opacity = '0.5';
            scrollLeftBtn.style.cursor = 'not-allowed';
        } else {
            scrollLeftBtn.style.opacity = '1';
            scrollLeftBtn.style.cursor = 'pointer';
        }
    }, 300);
}

function scrollToStart(sectionId) {
    const section = document.getElementById(sectionId);
    const animeGrid = section.querySelector('.anime-grid');
    const scrollRightBtn = section.querySelector('.scroll-right');
    
    animeGrid.scrollTo({ left: 0, behavior: 'smooth' });
    
    // เปลี่ยนปุ่มกลับเป็นปุ่มเลื่อนขวา
    setTimeout(() => {
        scrollRightBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        scrollRightBtn.onclick = () => scrollAnimeList('right', sectionId);
        scrollRightBtn.classList.remove('to-start');
    }, 300);
} 