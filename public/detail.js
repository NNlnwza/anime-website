const urlParams = new URLSearchParams(window.location.search);
const animeId = urlParams.get('id');
const episodeNumber = parseInt(urlParams.get('ep')) || 1;

let player;

// เก็บความคิดเห็นทั้งหมด
let allComments = JSON.parse(localStorage.getItem('allComments')) || {};

function loadAnimeDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get('id');
    const anime = animeData.find(a => a.id === animeId);

    if (anime) {
        // Set anime details
        document.getElementById('anime-title').textContent = anime.title;
        document.getElementById('anime-type').textContent = anime.type;
        if (anime.releaseDate) {
            document.getElementById('release-date').textContent = `วันที่ออกอากาศ: ${anime.releaseDate}`;
        } else {
            document.getElementById('release-date').textContent = '';
        }
        document.getElementById('total-episodes').textContent = `จำนวนตอน: ${anime.episodes.length}`;
        document.getElementById('anime-description').textContent = anime.description;

        // Load trailer video
        const videoPlayer = document.getElementById('player');
        const videoSource = videoPlayer.querySelector('source');
        videoSource.src = anime.trailerUrl;
        videoPlayer.load();

        // Set up play/pause button
        const playTrailerBtn = document.querySelector('.play-trailer-btn');
        const playIcon = playTrailerBtn.querySelector('i');
        const playText = playTrailerBtn.querySelector('span');

        playTrailerBtn.onclick = () => {
            if (videoPlayer.paused) {
                videoPlayer.play();
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
                playText.textContent = 'หยุด';
            } else {
                videoPlayer.pause();
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
                playText.textContent = 'เล่น';
            }
        };

        // Set up mute button
        const muteBtn = document.querySelector('.mute-btn');
        const muteIcon = muteBtn.querySelector('i');
        muteBtn.onclick = () => {
            if (videoPlayer.muted) {
                videoPlayer.muted = false;
                muteIcon.classList.remove('fa-volume-mute');
                muteIcon.classList.add('fa-volume-up');
            } else {
                videoPlayer.muted = true;
                muteIcon.classList.remove('fa-volume-up');
                muteIcon.classList.add('fa-volume-mute');
            }
        };

        // Handle video end
        videoPlayer.addEventListener('ended', () => {
            videoPlayer.currentTime = 0;
            videoPlayer.play();
        });

        // Load episodes
        const episodeGrid = document.getElementById('episode-grid');
        episodeGrid.innerHTML = '';
        anime.episodes.forEach((episode, index) => {
            const episodeCard = document.createElement('div');
            episodeCard.className = 'episode-card';
            episodeCard.innerHTML = `
                <div class="episode-number">ตอนที่ ${index + 1}</div>
                <div class="episode-title">${episode.title || ''}</div>
                <button class="watch-episode-btn" onclick="window.location.href='watch.html?id=${anime.id}&episode=${index + 1}'">
                    <i class="fas fa-play"></i>
                </button>
            `;
            episodeGrid.appendChild(episodeCard);
        });
    }
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
            window.location.href = `detail.html?id=${animeId}&ep=${episodeNumber + 1}`;
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
        <div class="search-result-item" onclick="window.location.href='detail.html?id=${anime.id}'">
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
            likedBy: []
        };
        
        // ตรวจสอบการเชื่อมต่อ Firebase
        if (!firebase.apps.length) {
            alert('ไม่สามารถเชื่อมต่อกับระบบได้');
            return;
        }

        // บันทึกลง Firebase ระดับอนิเมะ (ไม่แยกตอน)
        const commentsRef = firebase.database().ref(`animeComments/${animeId}`);
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

// แสดงความคิดเห็นทั้งหมด
function displayComments() {
    const commentsContainer = document.querySelector('.comments-container');
    const commentsList = document.querySelector('.comments-list');
    const commentsTitle = document.querySelector('.comments-episode-title');
    
    if (!commentsContainer || !commentsList) return;
    
    // แสดงชื่อหัวข้อของคอมเมนต์
    if (commentsTitle) {
        commentsTitle.textContent = `ความคิดเห็นสำหรับ ${animeTitle}`;
    }
    
    // แสดงข้อความกำลังโหลด
    const loadingMessage = document.createElement('p');
    loadingMessage.className = 'loading-message';
    loadingMessage.textContent = 'กำลังโหลดความคิดเห็น...';
    commentsList.innerHTML = '';
    commentsList.appendChild(loadingMessage);
    
    // ดึงข้อมูลความคิดเห็นจาก Firebase
    firebase.database().ref(`animeComments/${animeId}`).once('value').then(snapshot => {
        // ลบข้อความกำลังโหลด
        commentsList.innerHTML = '';
        
        const commentsData = snapshot.val();
        
        if (!commentsData) {
            const noComments = document.createElement('p');
            noComments.className = 'no-comments';
            noComments.textContent = 'ยังไม่มีความคิดเห็น เป็นคนแรกที่แสดงความคิดเห็น!';
            commentsList.appendChild(noComments);
            return;
        }
        
        // แปลงข้อมูลจาก object เป็น array
        const commentsArray = Object.keys(commentsData).map(key => {
            const comment = commentsData[key];
            // เพิ่มฟิลด์ที่จำเป็นถ้าไม่มี
            comment.id = key;
            comment.likedBy = comment.likedBy || [];
            comment.likes = comment.likes || 0;
            comment.timestamp = comment.timestamp || Date.now();
            return comment;
        });
        
        // เรียงลำดับความคิดเห็นจากใหม่ไปเก่า
        commentsArray.sort((a, b) => b.timestamp - a.timestamp);
        
        if (commentsArray.length === 0) {
            const noComments = document.createElement('p');
            noComments.className = 'no-comments';
            noComments.textContent = 'ยังไม่มีความคิดเห็น เป็นคนแรกที่แสดงความคิดเห็น!';
            commentsList.appendChild(noComments);
            return;
        }
        
        // สร้าง HTML สำหรับแต่ละความคิดเห็น
        commentsArray.forEach(comment => {
            // ตรวจสอบว่าผู้ใช้ปัจจุบันกดไลค์แล้วหรือไม่
            const userLiked = comment.likedBy.includes('user'); // แทนที่ด้วย user ID จริง
            
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `
                <div class="comment-avatar">
                    <img src="https://api.dicebear.com/7.x/bottts/svg?seed=${comment.username}" alt="Avatar">
                </div>
                <div class="comment-content">
                    <div class="comment-header">
                        <span class="comment-username">${comment.username}</span>
                        <span class="comment-time">${formatTimestamp(comment.timestamp)}</span>
                    </div>
                    <p class="comment-text">${comment.text}</p>
                    <div class="comment-actions">
                        <button class="like-btn ${userLiked ? 'active' : ''}" onclick="handleLike('${comment.id}')">
                            <i class="fas fa-heart"></i> <span>${comment.likes}</span>
                        </button>
                    </div>
                </div>
            `;
            commentsList.appendChild(commentElement);
        });
    }).catch(error => {
        console.error('Error fetching comments:', error);
        commentsList.innerHTML = '<p class="error-message">ไม่สามารถโหลดความคิดเห็นได้</p>';
    });
}

// เพิ่มฟังก์ชัน focusCommentInput
function focusCommentInput() {
    const input = document.getElementById('comment-input');
    if (input) {
        input.focus();
        // เลื่อนไปที่ช่องแสดงความคิดเห็น
        input.scrollIntoView({ behavior: 'smooth' });
    }
}

// ฟังก์ชันจัดการกับไลค์ความคิดเห็น
function handleLike(commentId) {
    // ใช้ userId คงที่สำหรับตัวอย่าง (ในระบบจริงควรใช้ ID ของผู้ใช้ที่ล็อกอิน)
    const userId = 'user';
    
    // สร้างอ้างอิงไปยังความคิดเห็นใน Firebase
    const commentRef = firebase.database().ref(`animeComments/${animeId}/${commentId}`);
    
    // ดึงข้อมูลความคิดเห็นปัจจุบัน
    commentRef.once('value').then(snapshot => {
        const comment = snapshot.val();
        if (!comment) return;
        
        // สร้างอาร์เรย์ likedBy หากยังไม่มี
        if (!comment.likedBy) comment.likedBy = [];
        
        // ตรวจสอบว่าผู้ใช้กดไลค์แล้วหรือไม่
        const likeButton = document.querySelector(`.comment button.like-btn[onclick="handleLike('${commentId}')"]`);
        const likeCount = likeButton.querySelector('span');
        
        if (comment.likedBy.includes(userId)) {
            // ถ้ากดไลค์แล้ว ให้ยกเลิกการไลค์
            comment.likedBy = comment.likedBy.filter(id => id !== userId);
            comment.likes = (comment.likes || 1) - 1;
            likeButton.classList.remove('active');
        } else {
            // ถ้ายังไม่ได้กดไลค์ ให้เพิ่มการไลค์
            comment.likedBy.push(userId);
            comment.likes = (comment.likes || 0) + 1;
            likeButton.classList.add('active');
        }
        
        // อัพเดตจำนวนไลค์ในหน้าเว็บทันที
        likeCount.textContent = comment.likes;
        
        // บันทึกข้อมูลกลับไปยัง Firebase
        return commentRef.update({
            likedBy: comment.likedBy,
            likes: comment.likes
        });
    }).catch(error => {
        console.error('Error updating like:', error);
    });
}

// ฟังก์ชันแปลงเวลาให้อยู่ในรูปแบบที่อ่านง่าย
function formatTimestamp(timestamp) {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - commentTime) / 1000);
    
    if (diffInSeconds < 60) {
        return 'เมื่อสักครู่';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} นาทีที่แล้ว`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} ชั่วโมงที่แล้ว`;
    } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} วันที่แล้ว`;
    } else {
        // แสดงวันที่แบบเต็ม
        const day = commentTime.getDate();
        const month = commentTime.getMonth() + 1;
        const year = commentTime.getFullYear();
        return `${day}/${month}/${year}`;
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

        // เช็ค userId จาก localStorage
        currentUserId = localStorage.getItem('userId');
        if (!currentUserId) {
            currentUserId = 'user-' + Date.now();
            localStorage.setItem('userId', userId);
        }

        // โหลดข้อมูลจาก Firebase
        const ratingsRef = firebase.database().ref(`ratings/${currentAnimeId}`);
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
            updateRatingDisplay(averageRating, count);
            
            // อัพเดทการแสดงดาว
            if (userHasRated) {
                updateStarsDisplay(currentRating * 5 / 10);
                enableRatingEdit(); // เปิดให้แก้ไขคะแนนได้
            } else {
                // ถ้ายังไม่เคยให้คะแนน ให้แสดงตามค่าเฉลี่ย
                updateStarsDisplay(averageRating * 5 / 10);
            }
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
            if (index < Math.round(rating)) {
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
        if (isRated) {
            updateStarsDisplay(currentRating * 5 / 10);
        } else {
            const averageRating = parseFloat(document.querySelector('.average-rating').textContent);
            updateStarsDisplay(averageRating * 5 / 10);
        }
    }

    // ส่งคะแนนไปยัง Firebase
    function submitRating(rating) {
        if (!currentAnimeId) return;

        const ratingRef = firebase.database().ref(`ratings/${currentAnimeId}/${currentUserId}`);
        
        ratingRef.set(rating)
            .then(() => {
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
                if (!isRated) { // ถ้ายังไม่เคยให้คะแนน หรือสามารถแก้ไขได้
                    const rating = (index + 1) * 2;
                    updateStarsHover(index + 1);
                    star.setAttribute('title', isRated ? 'คลิกเพื่อแก้ไขคะแนนเป็น ' + rating + ' คะแนน' : rating + ' คะแนน');
                }
            });

            star.addEventListener('mouseout', () => {
                clearStarsHover();
            });

            star.addEventListener('click', () => {
                if (!isRated) { // ถ้ายังไม่เคยให้คะแนน จึงจะสามารถให้คะแนนได้
                    const rating = (index + 1) * 2;
                    submitRating(rating);
                } else {
                    // ถ้าเคยให้คะแนนแล้ว ให้แจ้งเตือน
                    alert('คุณได้ให้คะแนนอนิเมะเรื่องนี้ไปแล้ว');
                }
            });
        });
    }

    // โหลดคะแนนเมื่อเริ่มต้น
    loadRatings();
} 