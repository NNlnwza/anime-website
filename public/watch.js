const urlParams = new URLSearchParams(window.location.search);
const animeId = urlParams.get('id');
const episodeNumber = parseInt(urlParams.get('ep')) || 1;

let player;

// เก็บความคิดเห็นทั้งหมด
let allComments = JSON.parse(localStorage.getItem('allComments')) || {};

function loadAnimeDetails() {
    const anime = animeData.find(a => a.id === animeId);
    if (!anime) {
        window.location.href = 'index.html';
        return;
    }

    document.title = `${anime.title} ตอนที่ ${episodeNumber} - AnimeHiHi`;
    document.getElementById('anime-title').textContent = anime.title;
    document.getElementById('episode-number').textContent = `ตอนที่ ${episodeNumber}`;
    document.getElementById('anime-type').textContent = anime.type;
    document.getElementById('anime-description').textContent = anime.description;

    const episodeGrid = document.getElementById('episode-grid');
    episodeGrid.innerHTML = '';

    if (anime.episodes && anime.episodes.length > 0) {
        anime.episodes.forEach(episode => {
            const episodeItem = document.createElement('div');
            episodeItem.className = `episode-item ${episode.number === episodeNumber ? 'active' : ''}`;
            episodeItem.innerHTML = `<span class="episode-number">ตอนที่ ${episode.number}</span>`;
            
            episodeItem.addEventListener('click', () => {
                window.location.href = `watch.html?id=${animeId}&ep=${episode.number}`;
            });

            episodeGrid.appendChild(episodeItem);
        });
    }

    initializePlayer(anime);
}

function initializePlayer(anime) {
    if (!anime || !anime.episodes) {
        alert('ขออภัย ไม่พบวิดีโอที่ต้องการ');
        return;
    }

    const episode = anime.episodes.find(ep => ep.number === episodeNumber);
    if (!episode || !episode.videoUrl) {
        alert('ขออภัย ไม่พบตอนที่ต้องการ');
        return;
    }

    const videoElement = document.getElementById('player');
    const sourceElement = videoElement.querySelector('source');
    sourceElement.src = episode.videoUrl;
    videoElement.load();

    player = new Plyr('#player', {
        controls: [
            'play-large',
            'rewind',
            'play',
            'fast-forward',
            'progress',
            'current-time',
            'duration',
            'mute',
            'volume',
            'captions',
            'settings',
            'pip',
            'airplay',
            'fullscreen'
        ],
        keyboard: { focused: true, global: true },
        tooltips: { controls: true, seek: true },
        seekTime: 10,
        quality: {
            default: 1080,
            options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240]
        }
    });

    player.on('ended', () => {
        if (episodeNumber < anime.episodes.length) {
            window.location.href = `watch.html?id=${animeId}&ep=${episodeNumber + 1}`;
        }
    });

    player.on('timeupdate', () => {
        localStorage.setItem(`${animeId}_ep${episodeNumber}_time`, player.currentTime);
    });

    const savedTime = localStorage.getItem(`${animeId}_ep${episodeNumber}_time`);
    if (savedTime) {
        player.currentTime = parseFloat(savedTime);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadAnimeDetails();
    displayComments();

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

// ฟังก์ชันเพิ่มความคิดเห็น
function addComment() {
    const commentInput = document.getElementById('comment-input');
    const commentText = commentInput.value.trim();
    const animeId = getAnimeIdFromUrl();
    
    if (commentText) {
        // สร้างความคิดเห็นใหม่
        const newComment = {
            id: Date.now(),
            text: commentText,
            timestamp: new Date().toISOString(),
            likes: 0,
            likedBy: []
        };
        
        // เพิ่มความคิดเห็นลงในรายการ
        if (!allComments[animeId]) {
            allComments[animeId] = [];
        }
        allComments[animeId].unshift(newComment);
        
        // บันทึกลง localStorage
        localStorage.setItem('allComments', JSON.stringify(allComments));
        
        // แสดงความคิดเห็นใหม่
        displayComments();
        
        // ล้างช่องกรอก
        commentInput.value = '';
    }
}

// ฟังก์ชันแสดงความคิดเห็น
function displayComments() {
    const commentsContainer = document.getElementById('comments-container');
    const animeId = getAnimeIdFromUrl();
    const comments = allComments[animeId] || [];
    
    commentsContainer.innerHTML = comments.map(comment => `
        <div class="comment">
            <div class="comment-content">
                <p>${comment.text}</p>
                <div class="comment-actions">
                    <button class="like-btn ${comment.likedBy.includes('user') ? 'active' : ''}" 
                            onclick="handleLike(${comment.id})">
                        <i class="fas fa-heart"></i>
                        <span>${comment.likes}</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ฟังก์ชันกดไลค์
function handleLike(commentId) {
    const animeId = getAnimeIdFromUrl();
    const comments = allComments[animeId] || [];
    const comment = comments.find(c => c.id === commentId);
    
    if (comment) {
        const user = 'user'; // ใช้ user เดียวกันสำหรับทุกคน
        const index = comment.likedBy.indexOf(user);
        
        if (index === -1) {
            comment.likes++;
            comment.likedBy.push(user);
        } else {
            comment.likes--;
            comment.likedBy.splice(index, 1);
        }
        
        // บันทึกลง localStorage
        localStorage.setItem('allComments', JSON.stringify(allComments));
        
        // แสดงความคิดเห็นใหม่
        displayComments();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const commentBtn = document.querySelector('.comment-btn');
    if (commentBtn) {
        commentBtn.addEventListener('click', addComment);
    }

    const commentInput = document.querySelector('.comment-input');
    if (commentInput) {
        commentInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addComment();
            }
        });
    }

    displayComments();
});