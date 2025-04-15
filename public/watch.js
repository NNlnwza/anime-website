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
    initRatingSystem();

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

    // เพิ่ม event listener สำหรับปุ่มส่งความคิดเห็น
    const commentBtn = document.getElementById('comment-btn');
    if (commentBtn) {
        commentBtn.addEventListener('click', addComment);
    }

    // เพิ่ม event listener สำหรับช่อง input เมื่อกด Enter
    const commentInput = document.getElementById('comment-input');
    if (commentInput) {
        commentInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addComment();
            }
        });
    }
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

// ฟังก์ชันแสดงความคิดเห็น
function displayComments() {
    const commentsContainer = document.getElementById('comments-container');
    const commentsRef = firebase.database().ref(`comments/${animeId}/episode${episodeNumber}`);
    
    // เพิ่มหัวข้อแสดงว่าเป็นคอมเมนต์ของตอนไหน
    const episodeTitle = document.createElement('h4');
    episodeTitle.textContent = `ความคิดเห็น - ตอนที่ ${episodeNumber}`;
    episodeTitle.className = 'comments-episode-title';
    commentsContainer.innerHTML = '';
    commentsContainer.appendChild(episodeTitle);
    
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
        
        // เพิ่ม comments หลังจากหัวข้อ
        const commentsDiv = document.createElement('div');
        commentsDiv.className = 'comments-list';
        commentsDiv.innerHTML = commentsHTML || '<p class="no-comments">ยังไม่มีความคิดเห็น</p>';
        commentsContainer.appendChild(commentsDiv);
    }, (error) => {
        console.error('Error fetching comments:', error);
        commentsContainer.innerHTML += '<p class="error-message">ไม่สามารถโหลดความคิดเห็นได้</p>';
    });
}

// ฟังก์ชันจัดการไลค์
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
        }).catch(error => {
            console.error('Error updating like:', error);
        });
    }).catch(error => {
        console.error('Error fetching comment for like:', error);
    });
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

// เพิ่มฟังก์ชัน toggleMenu
function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger-menu');
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// เพิ่มฟังก์ชัน getAnimeIdFromUrl
function getAnimeIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// ระบบการให้คะแนน
function initRatingSystem() {
    const ratingStars = document.querySelectorAll('.rating-stars i');
    const ratingInfo = document.querySelector('.rating-info');
    let currentRating = 0;
    let isRated = false;
    let currentUserId = '';
    const currentAnimeId = getAnimeIdFromUrl();

    // โหลดคะแนนจาก Firebase
    function loadRatings() {
        if (!currentAnimeId) return;

        // เช็คว่าเคยให้คะแนนแล้วหรือไม่
        const savedRating = localStorage.getItem(`rating_${currentAnimeId}`);
        if (savedRating) {
            const ratingData = JSON.parse(savedRating);
            currentRating = ratingData.rating;
            currentUserId = ratingData.userId;
            isRated = true;
            updateStarsDisplay(currentRating);
            enableRatingEdit();
        }

        const ratingsRef = firebase.database().ref(`ratings/${currentAnimeId}`);
        ratingsRef.on('value', (snapshot) => {
            const ratings = snapshot.val() || {};
            
            // คำนวณค่าเฉลี่ย
            let totalScore = 0;
            let count = 0;
            Object.values(ratings).forEach(rating => {
                totalScore += rating;
                count++;
            });
            
            const averageRating = count > 0 ? (totalScore / count).toFixed(1) : 0;
            updateRatingDisplay(averageRating, count);
        });
    }

    // อัพเดทการแสดงผลคะแนน
    function updateRatingDisplay(average, count) {
        if (ratingInfo) {
            ratingInfo.innerHTML = `
                <span class="average-rating">${average}</span>
                <span class="rating-count">(${count} รีวิว)</span>
            `;
        }
    }

    // เปิดใช้งานการแก้ไขคะแนน
    function enableRatingEdit() {
        ratingStars.forEach(star => {
            star.style.pointerEvents = 'auto';
            star.title = 'คลิกเพื่อแก้ไขคะแนน';
            star.classList.add('editable');
        });
    }

    // อัพเดทการแสดงผลดาว
    function updateStarsDisplay(rating) {
        ratingStars.forEach((star, index) => {
            if (index < Math.round(rating * 5 / 10)) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    // เมื่อเมาส์ hover บนดาว
    function updateStarsHover(rating) {
        ratingStars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('hover');
            } else {
                star.classList.remove('hover');
            }
        });
    }

    // เมื่อเมาส์ออกจากดาว
    function clearStarsHover() {
        ratingStars.forEach(star => {
            star.classList.remove('hover');
        });
        updateStarsDisplay(currentRating);
    }

    // ส่งคะแนนไปยัง Firebase
    function submitRating(rating) {
        if (!currentAnimeId) return;

        let userId = currentUserId;
        if (!userId) {
            userId = 'user-' + Date.now();
            currentUserId = userId;
        }

        const ratingRef = firebase.database().ref(`ratings/${currentAnimeId}/${userId}`);
        
        ratingRef.set(rating)
            .then(() => {
                currentRating = rating;
                isRated = true;
                // บันทึกลงใน localStorage พร้อม userId
                localStorage.setItem(`rating_${currentAnimeId}`, JSON.stringify({
                    rating: rating,
                    userId: userId
                }));
                updateStarsDisplay(rating);
                enableRatingEdit();
                console.log('บันทึกคะแนนสำเร็จ');
            })
            .catch((error) => {
                console.error('Error submitting rating:', error);
                alert('ไม่สามารถบันทึกคะแนนได้');
            });
    }

    // เพิ่ม Event listeners สำหรับดาว
    if (ratingStars) {
        ratingStars.forEach((star, index) => {
            star.addEventListener('mouseover', () => {
                const rating = (index + 1) * 2;
                updateStarsHover(index + 1);
                star.setAttribute('title', isRated ? 'คลิกเพื่อแก้ไขคะแนนเป็น ' + rating + ' คะแนน' : rating + ' คะแนน');
            });

            star.addEventListener('mouseout', () => {
                clearStarsHover();
            });

            star.addEventListener('click', () => {
                const rating = (index + 1) * 2;
                submitRating(rating);
            });
        });
    }

    // โหลดคะแนนเมื่อเริ่มต้น
    loadRatings();
}