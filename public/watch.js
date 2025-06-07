const urlParams = new URLSearchParams(window.location.search);
const animeId = urlParams.get('id');
const episodeNumber = parseInt(urlParams.get('episode')) || 1;

let player;

function loadAnimeDetails() {
    const anime = animeData.find(a => a.id === animeId);
    if (!anime) {
        window.location.href = 'index.html';
        throw new Error('Anime not found');
    }

    document.title = `${anime.title} ตอนที่ ${episodeNumber} - AnimeHiHi`;
    document.getElementById('anime-title').textContent = anime.title;
    document.getElementById('episode-number').textContent = `ตอนที่ ${episodeNumber}`;
    document.getElementById('anime-type').textContent = anime.type;
    document.getElementById('anime-description').textContent = anime.description;

    document.querySelector('.comments-episode-title').textContent = `ความคิดเห็น`;

    loadRating();

    const episodeGrid = document.getElementById('episode-grid');
    episodeGrid.innerHTML = '';

    if (anime.episodes && anime.episodes.length > 0) {
        anime.episodes.forEach(episode => {
            const episodeItem = document.createElement('div');
            episodeItem.className = `episode-item${episode.number === episodeNumber ? ' active' : ''}`;
            episodeItem.innerHTML = `<span class="episode-number">ตอนที่ ${episode.number}</span>`;
            episodeItem.addEventListener('click', () => {
                window.location.href = `watch.html?id=${animeId}&episode=${episode.number}`;
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
            'rewind',
            'play',
            'fast-forward',
            'progress',
            'current-time',
            'duration',
            'mute',
            'volume',
            'settings',
            'pip',
            'fullscreen'
        ],
        keyboard: { focused: true, global: true },
        tooltips: { controls: true, seek: true },
        seekTime: 10,
        quality: {
            default: 1080,
            options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240]
        },
        clickToPlay: true,
        displayDuration: true,
        iconUrl: "https://cdn.plyr.io/3.7.8/plyr.svg",
        blankVideo: "https://cdn.plyr.io/static/blank.mp4",
        enabled: true,
        resetOnEnd: false,
        debug: false,
        autoplay: false,
        playsinline: true,
        fullscreen: { enabled: true, fallback: true, iosNative: true },
        storage: { enabled: true, key: 'plyr' },
        invertTime: true,
        toggleInvert: true,
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] },
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
            'settings',
            'pip',
            'fullscreen'
        ]
    });

    player.on('ended', () => {
        if (episodeNumber < anime.episodes.length) {
            window.location.href = `watch.html?id=${animeId}&episode=${episodeNumber + 1}`;
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

function loadRating() {
    const ratingStars = document.querySelectorAll('.rating-stars i');
    const averageRatingElement = document.querySelector('.average-rating');
    const ratingCountElement = document.querySelector('.rating-count');
    
    let currentRating = 0;
    let isRated = false;
    let currentUserId = '';
    
    // เช็ค userId จาก localStorage
    currentUserId = localStorage.getItem('userId');
    if (!currentUserId) {
        currentUserId = 'user-' + Date.now();
        localStorage.setItem('userId', currentUserId);
    }
    
    // โหลดคะแนนจาก Firebase
    const ratingsRef = firebase.database().ref(`ratings/${animeId}`);
    ratingsRef.on('value', (snapshot) => {
        const ratings = snapshot.val() || {};
        
        // คำนวณค่าเฉลี่ย
        let totalScore = 0;
        let count = 0;
        let userHasRated = false;
        
        Object.entries(ratings).forEach(([uid, rating]) => {
            totalScore += rating;
            count++;
            
            // ตรวจสอบว่าผู้ใช้นี้เคยให้คะแนนหรือไม่
            if (uid === currentUserId) {
                userHasRated = true;
                currentRating = rating;
                isRated = true;
            }
        });
        
        const averageRating = count > 0 ? (totalScore / count).toFixed(1) : 0;
        
        // อัพเดตการแสดงผล
        averageRatingElement.textContent = averageRating;
        ratingCountElement.textContent = `(${count} รีวิว)`;
        
        // อัพเดทการแสดงดาว
        if (userHasRated) {
            updateStarDisplay(currentRating * 5 / 10);
        } else {
            // ถ้ายังไม่เคยให้คะแนน ให้แสดงตามค่าเฉลี่ย
            updateStarDisplay(averageRating * 5 / 10);
        }
    });
    
    // เพิ่ม event listeners สำหรับดาว
    ratingStars.forEach((star, index) => {
        star.addEventListener('click', () => {
            if (!isRated) { // ถ้ายังไม่เคยให้คะแนน จึงจะสามารถให้คะแนนได้
                const rating = (index + 1) * 2; // แปลงคะแนน 1-5 ดาว เป็น 2-10
                submitRating(rating);
            } else {
                // ถ้าเคยให้คะแนนแล้ว ให้แจ้งเตือน
                alert('คุณได้ให้คะแนนอนิเมะเรื่องนี้ไปแล้ว');
            }
        });
        
        star.addEventListener('mouseover', () => {
            if (!isRated) { // ถ้ายังไม่เคยให้คะแนน จึงจะสามารถ hover ได้
                updateStarDisplay(index + 1);
            }
        });
    });
    
    document.querySelector('.rating-stars').addEventListener('mouseleave', () => {
        if (isRated) {
            updateStarDisplay(currentRating * 5 / 10);
        } else {
            updateStarDisplay(parseFloat(averageRatingElement.textContent) * 5 / 10);
        }
    });
}

function updateStarDisplay(rating) {
    document.querySelectorAll('.rating-stars i').forEach((star, index) => {
        star.classList.toggle('active', index < Math.round(rating));
    });
}

function submitRating(rating) {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = 'user-' + Date.now();
        localStorage.setItem('userId', userId);
    }
    
    // บันทึกลง Firebase
    const ratingRef = firebase.database().ref(`ratings/${animeId}/${userId}`);
    
    ratingRef.set(rating)
        .then(() => {
            console.log('บันทึกคะแนนสำเร็จ');
        })
        .catch((error) => {
            console.error('Error submitting rating:', error);
            alert('ไม่สามารถบันทึกคะแนนได้');
        });
}

function handleComment() {
    const commentInput = document.getElementById('comment-input');
    const commentText = commentInput.value.trim();
    
    if (!commentText) {
        return;
    }

    try {
        // สร้างความคิดเห็นใหม่
        const newComment = {
            id: Date.now(),
            text: commentText,
            timestamp: new Date().toISOString(),
            likes: 0,
            likedBy: [],
            episode: episodeNumber // เพิ่ม episode number
        };
        
        // ตรวจสอบการเชื่อมต่อ Firebase
        if (!firebase.apps.length) {
            alert('ไม่สามารถเชื่อมต่อกับระบบได้');
            return;
        }

        // บันทึกลง Firebase โดยแยกตามอนิเมะและตอน
        const commentsRef = firebase.database().ref(`comments/${animeId}/episode${episodeNumber}`);
        commentsRef.push(newComment)
            .then(() => {
                // ล้างช่องกรอก
                commentInput.value = '';
                console.log('บันทึกความคิดเห็นสำเร็จ');
            })
            .catch((error) => {
                console.error('เกิดข้อผิดพลาด:', error);
                alert('ไม่สามารถบันทึกความคิดเห็นได้');
            });
    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
        alert('เกิดข้อผิดพลาดในการบันทึกความคิดเห็น');
    }
}

function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    const intervals = {
        ปี: 31536000,
        เดือน: 2592000,
        สัปดาห์: 604800,
        วัน: 86400,
        ชั่วโมง: 3600,
        นาที: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? '' : ''}ที่แล้ว`;
        }
    }

    return 'เมื่อสักครู่';
}

// ฟังก์ชันจัดรูปแบบเวลา
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    // แปลงเวลาเป็นภาษาไทย
    if (diff < 60000) { // น้อยกว่า 1 นาที
        return 'เมื่อสักครู่';
    } else if (diff < 3600000) { // น้อยกว่า 1 ชั่วโมง
        const minutes = Math.floor(diff / 60000);
        return `${minutes} นาทีที่แล้ว`;
    } else if (diff < 86400000) { // น้อยกว่า 1 วัน
        const hours = Math.floor(diff / 3600000);
        return `${hours} ชั่วโมงที่แล้ว`;
    } else {
        return date.toLocaleDateString('th-TH');
    }
}

function displayComments() {
    const commentsContainer = document.getElementById('comments-container');
    const commentsRef = firebase.database().ref(`comments/${animeId}/episode${episodeNumber}`);
    
    // เพิ่มหัวข้อแสดงว่าเป็นคอมเมนต์ของตอนไหน
    const episodeTitle = document.querySelector('.comments-episode-title');
    if (episodeTitle) {
        episodeTitle.textContent = `ความคิดเห็น`;
    }

    const commentsList = document.querySelector('.comments-list');
    if (!commentsList) return;
    
    // ติดตามการเปลี่ยนแปลงของข้อมูล
    commentsRef.on('value', (snapshot) => {
        const comments = [];
        snapshot.forEach((childSnapshot) => {
            const comment = childSnapshot.val();
            if (comment) {
                // ตรวจสอบและเพิ่ม property ที่จำเป็นถ้าไม่มี
                if (!comment.likedBy) comment.likedBy = [];
                if (!comment.likes) comment.likes = 0;
                if (!comment.timestamp) comment.timestamp = new Date().toISOString();
                
                comment.key = childSnapshot.key;
                comments.unshift(comment);
            }
        });
        
        const commentsHTML = comments.map(comment => `
            <div class="comment">
                <div class="comment-content">
                    <p>${comment.text}</p>
                    <div class="comment-info">
                        <span class="comment-time">${formatTimestamp(comment.timestamp)}</span>
                    </div>
                    <div class="comment-actions">
                        <button class="like-btn ${comment.likedBy && comment.likedBy.includes('user') ? 'active' : ''}" 
                                onclick="handleLike('${comment.key}')">
                            <i class="fas fa-heart"></i>
                            <span>${comment.likes}</span>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        commentsList.innerHTML = commentsHTML || '<p class="no-comments">ยังไม่มีความคิดเห็น</p>';
    }, (error) => {
        console.error('Error fetching comments:', error);
        commentsList.innerHTML = '<p class="error-message">ไม่สามารถโหลดความคิดเห็นได้</p>';
    });
}

function handleLike(commentKey) {
    const commentsRef = firebase.database().ref(`comments/${animeId}/episode${episodeNumber}/${commentKey}`);
    
    commentsRef.once('value').then((snapshot) => {
        const comment = snapshot.val();
        if (!comment) return;

        if (!comment.likedBy) comment.likedBy = [];
        if (!comment.likes) comment.likes = 0;

        const user = 'user';
        const likedIndex = comment.likedBy.indexOf(user);
        
        if (likedIndex === -1) {
            comment.likes++;
            comment.likedBy.push(user);
        } else {
            comment.likes--;
            comment.likedBy.splice(likedIndex, 1);
        }
        
        commentsRef.update({
            likes: comment.likes,
            likedBy: comment.likedBy
        }).then(() => {
            // อัพเดทเฉพาะปุ่มไลค์แทนที่จะโหลดคอมเมนต์ใหม่ทั้งหมด
            const likeBtn = document.querySelector(`[onclick="handleLike('${commentKey}')"]`);
            if (likeBtn) {
                // อัพเดทสถานะ active
                if (likedIndex === -1) {
                    likeBtn.classList.add('active');
                } else {
                    likeBtn.classList.remove('active');
                }
                
                // อัพเดทจำนวนไลค์
                const likeCount = likeBtn.querySelector('span');
                if (likeCount) {
                    likeCount.textContent = comment.likes;
                }
            }
        }).catch(error => {
            console.error('Error updating like:', error);
        });
    }).catch(error => {
        console.error('Error fetching comment for like:', error);
    });
}

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

document.addEventListener('DOMContentLoaded', () => {
    loadAnimeDetails();
    displayComments();
    
    // Event listeners สำหรับความคิดเห็น
    const commentBtn = document.getElementById('comment-btn');
    if (commentBtn) {
        commentBtn.addEventListener('click', handleComment);
    }
    
    const commentInput = document.getElementById('comment-input');
    if (commentInput) {
        commentInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                handleComment();
            }
        });
    }

    // Event listeners สำหรับการค้นหา
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', toggleSearchModal);
    }
    
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
    
    // Event listener สำหรับการปิดกล่องค้นหา
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