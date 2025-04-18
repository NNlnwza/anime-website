const urlParams = new URLSearchParams(window.location.search);
const animeId = urlParams.get('id');
const episodeNumber = parseInt(urlParams.get('ep')) || 1;

let player;

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

document.addEventListener('DOMContentLoaded', loadAnimeDetails);

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

document.addEventListener('DOMContentLoaded', () => {
    loadAnimeDetails();

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

function handleComment() {
    const commentInput = document.querySelector('.comment-input');
    const commentText = commentInput.value.trim();
    
    if (!commentText) {
        alert('กรุณาใส่ความคิดเห็น');
        return;
    }

    const comment = {
        id: Date.now(),
        text: commentText,
        timestamp: new Date().toLocaleString('th-TH'),
        animeId: animeId,
        episode: episodeNumber,
        likes: 0,
        likedBy: []
    };

    let comments = JSON.parse(localStorage.getItem('animeComments') || '[]');
    comments.push(comment);
    localStorage.setItem('animeComments', JSON.stringify(comments));

    displayComments();
    commentInput.value = '';
}

function handleLike(commentId) {
    let comments = JSON.parse(localStorage.getItem('animeComments') || '[]');
    const commentIndex = comments.findIndex(c => c.id === commentId);
    
    if (commentIndex === -1) return;
    
    const comment = comments[commentIndex];
    const userId = localStorage.getItem('userId') || Date.now().toString();
    localStorage.setItem('userId', userId);

    if (!comment.likedBy) {
        comment.likedBy = [];
    }

    const hasLiked = comment.likedBy.includes(userId);
    
    if (hasLiked) {
        comment.likes--;
        comment.likedBy = comment.likedBy.filter(id => id !== userId);
    } else {
        comment.likes++;
        comment.likedBy.push(userId);
    }

    comments[commentIndex] = comment;
    localStorage.setItem('animeComments', JSON.stringify(comments));
    displayComments();
}

function displayComments() {
    const commentsContainer = document.querySelector('.comments-container');
    if (!commentsContainer) {
        const commentSection = document.createElement('div');
        commentSection.className = 'comments-container';
        document.querySelector('.comment-section').appendChild(commentSection);
    }

    const comments = JSON.parse(localStorage.getItem('animeComments') || '[]')
        .filter(c => c.animeId === animeId && c.episode === episodeNumber);

    const userId = localStorage.getItem('userId');

    const commentsHTML = comments.map(comment => {
        const isLiked = comment.likedBy && comment.likedBy.includes(userId);
        return `
            <div class="comment-item">
                <div class="comment-text">${comment.text}</div>
                <div class="comment-timestamp">${comment.timestamp}</div>
                <div class="comment-actions">
                    <button onclick="handleLike(${comment.id})" class="like-btn ${isLiked ? 'active' : ''}">
                        <i class="fas fa-heart"></i>
                        <span class="like-count">${comment.likes || 0}</span>
                    </button>
                    <button onclick="deleteComment(${comment.id})" class="delete-comment">ลบ</button>
                </div>
            </div>
        `;
    }).join('');

    document.querySelector('.comments-container').innerHTML = commentsHTML || '<p>ยังไม่มีความคิดเห็น</p>';
}

function deleteComment(commentId) {
    let comments = JSON.parse(localStorage.getItem('animeComments') || '[]');
    comments = comments.filter(c => c.id !== commentId);
    localStorage.setItem('animeComments', JSON.stringify(comments));
    displayComments();
}

document.addEventListener('DOMContentLoaded', () => {
    const commentBtn = document.querySelector('.comment-btn');
    if (commentBtn) {
        commentBtn.addEventListener('click', handleComment);
    }

    const commentInput = document.querySelector('.comment-input');
    if (commentInput) {
        commentInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleComment();
            }
        });
    }

    displayComments();
});