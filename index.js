console.log('Happy developing ✨')
// Biến game
var score = 0;
var timeLeft = 30;
var gameRunning = false;
var gameInterval;
var timerInterval;
var flowerInterval;
var giftShown = false;

// Danh sách hoa emoji
var flowers = ['🌸', '🌺', '🌻', '🌼', '🌷', '🌹', '💐', '🏵️', '🌴'];

// Danh sách lời chúc
var messages = [
    'Chúc anh chị luôn xinh đẹp và tràn đầy năng lượng! 💕',
    'Cảm ơn anh chị đã dạy dỗ chúng em! 📚',
    'Chúc anh chị luôn khỏe mạnh và hạnh phúc! 🌟',
    'Anh chị là người thầy tuyệt vời nhất! ⭐',
    'Chúc anh chị thành công trong sự nghiệp! 🎓',
    'Cảm ơn anh chị vì những bài học quý giá! 💝',
    'Chúc anh chị ngày 20/11 vui vẻ! 🎉',
    'Anh chị mãi là người truyền cảm hứng! 🌈',
    'Chúc anh chị luôn may mắn và hạnh phúc! 🍀',
    'Em yêu anh chị nhiều lắm! ❤️'
];

// Tạo mây nền
function createClouds() {
    for (var i = 0; i < 5; i++) {
        var cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.width = Math.random() * 100 + 80 + 'px';
        cloud.style.height = Math.random() * 40 + 30 + 'px';
        cloud.style.top = Math.random() * 40 + '%';
        cloud.style.animationDuration = Math.random() * 10 + 15 + 's';
        cloud.style.animationDelay = Math.random() * 5 + 's';
        document.getElementById('gameContainer').appendChild(cloud);
    }
}

// Bắt đầu game
function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    gameRunning = true;
    score = 0;
    timeLeft = 30;
    giftShown = false;
    updateScore();
    updateTimer();

    createClouds();

    // Tạo hoa liên tục
    flowerInterval = setInterval(createFlower, 800);

    // Đếm ngược thời gian
    timerInterval = setInterval(function () {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// Tạo hoa rơi
function createFlower() {
    if (!gameRunning) return;

    var flower = document.createElement('div');
    flower.className = 'flower';
    flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
    flower.style.left = Math.random() * (window.innerWidth - 60) + 'px';
    flower.style.top = '-60px';

    var duration = Math.random() * 3 + 3;
    flower.style.animationDuration = duration + 's';

    // Biến để đánh dấu hoa đã được click
    var clicked = false;

    flower.onclick = function () {
        if (!clicked) {
            clicked = true;
            catchFlower(this);
        }
    };

    document.getElementById('gameContainer').appendChild(flower);

    // Xóa hoa sau khi rơi hết
    setTimeout(function () {
        if (flower.parentNode && !clicked) {
            flower.parentNode.removeChild(flower);
        }
    }, duration * 1000);
}

// Bắt hoa
function catchFlower(flower) {
    if (!gameRunning) return;

    // Xóa hoa ngay lập tức để tránh click nhiều lần
    if (flower.parentNode) {
        flower.parentNode.removeChild(flower);
    }

    score += 30;
    updateScore();

    // Tạo hiệu ứng lấp lánh tại vị trí cũ
    var rect = flower.getBoundingClientRect();
    createSparklesAt(rect.left + rect.width / 2, rect.top + rect.height / 2);

    // Kiểm tra nếu đạt 300 điểm
    if (score >= 300 && !giftShown) {
        giftShown = true;
        // Dừng game ngay lập tức
        gameRunning = false;
        clearInterval(flowerInterval);
        clearInterval(timerInterval);

        // Xóa tất cả hoa còn lại
        var allFlowers = document.querySelectorAll('.flower');
        allFlowers.forEach(function (f) {
            if (f.parentNode) {
                f.parentNode.removeChild(f);
            }
        });

        // Hiển thị quà sau 500ms
        setTimeout(function () {
            showGiftReward();
        }, 500);
    } else {
        // Hiển thị lời chúc ngẫu nhiên nếu chưa đạt 300 điểm
        setTimeout(function () {
            showMessage();
        }, 100);
    }
}

// Tạo hiệu ứng lấp lánh tại vị trí cụ thể
function createSparklesAt(x, y) {
    var colors = ['#ff1493', '#ffd700', '#00ff00', '#00bfff', '#ff69b4'];

    for (var i = 0; i < 10; i++) {
        var particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = '✨';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.setProperty('--x', (Math.random() - 0.5) * 200 + 'px');
        particle.style.setProperty('--y', (Math.random() - 0.5) * 200 + 'px');

        document.body.appendChild(particle);

        setTimeout(function (p) {
            if (p.parentNode) {
                p.parentNode.removeChild(p);
            }
        }, 1000, particle);
    }
}

// Tạo hiệu ứng lấp lánh
function createSparkles(element) {
    var rect = element.getBoundingClientRect();
    createSparklesAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
}

// Hiển thị lời chúc
function showMessage() {
    var messageDiv = document.createElement('div');
    messageDiv.className = 'message-popup';

    var randomMessage = messages[Math.floor(Math.random() * messages.length)];
    messageDiv.innerHTML = '<h2>🌸 Lời Chúc 🌸</h2><p>' + randomMessage + '</p>';

    document.body.appendChild(messageDiv);

    setTimeout(function () {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'popOut 0.5s forwards';
            setTimeout(function () {
                messageDiv.parentNode.removeChild(messageDiv);
            }, 500);
        }
    }, 2000);
}

// Hiển thị phần quà khi đạt 300 điểm
function showGiftReward() {
    var giftDiv = document.createElement('div');
    giftDiv.style.position = 'fixed';
    giftDiv.style.top = '50%';
    giftDiv.style.left = '50%';
    giftDiv.style.transform = 'translate(-50%, -50%) scale(0)';
    giftDiv.style.background = 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)';
    giftDiv.style.padding = '50px';
    giftDiv.style.borderRadius = '30px';
    giftDiv.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5)';
    giftDiv.style.zIndex = '1000';
    giftDiv.style.textAlign = 'center';
    giftDiv.style.animation = 'popIn 0.5s forwards';
    giftDiv.style.maxWidth = '600px';

    var gifts = [
        {
            name: 'MacBook Pro M4',
            image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290'
        },
        {
            name: 'iPhone 17 Pro Max',
            image: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-17-pro-max_3.jpg?_gl=1*1b0uz64*_gcl_aw*R0NMLjE3NjAyNzgzMDIuQ2owS0NRandvNjNIQmhDS0FSSXNBSE9IVl9YUV9GTU9nZHhoT3VuM2xiWWdBWXVjNnZaWksyTHdmNGlGRjkwaWJDTzQ0blE5U2NWX2lBOGFBbllhRUFMd193Y0I.*_gcl_au*MjAxODk5MzA0MS4xNzYwMDc3NzEy*_ga*MTY1MDY1NTI2MC4xNzYwMDc3NzEz*_ga_QLK8WFHNK9*czE3NjMwOTUzMTkkbzI5JGcwJHQxNzYzMDk1MzIxJGo1OCRsMCRoMjAzNzcyNjQ5OA..'
        },
        {
            name: 'Apple Watch Ultra 3',
            image: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/1/2/1222.png?_gl=1*52xrzr*_gcl_aw*R0NMLjE3NjAyNzgzMDIuQ2owS0NRandvNjNIQmhDS0FSSXNBSE9IVl9YUV9GTU9nZHhoT3VuM2xiWWdBWXVjNnZaWksyTHdmNGlGRjkwaWJDTzQ0blE5U2NWX2lBOGFBbllhRUFMd193Y0I.*_gcl_au*MjAxODk5MzA0MS4xNzYwMDc3NzEy*_ga*MTY1MDY1NTI2MC4xNzYwMDc3NzEz*_ga_QLK8WFHNK9*czE3NjMwOTUzMTkkbzI5JGcxJHQxNzYzMDk1NDIxJGo0NyRsMCRoMjAzNzcyNjQ5OA..'
        },
        {
            name: 'AirPods Pro Max',
            image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-silver-202011?wid=940&hei=1112&fmt=png-alpha&.v=1604709508000'
        }
    ];

    var randomGift = gifts[Math.floor(Math.random() * gifts.length)];

    giftDiv.innerHTML =
        '<h1 style="font-size: 80px; margin: 0;">🎁</h1>' +
        '<h2 style="font-size: 48px; color: #ff1493; margin: 20px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">CHÚC MỪNG!</h2>' +
        '<div style="margin: 20px 0;"><img src="' + randomGift.image + '" style="max-width: 400px; max-height: 300px; object-fit: contain; border-radius: 20px;" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'block\';"><div style="display: none; font-size: 100px;">🎁</div></div>' +
        '<p style="font-size: 32px; color: #333; font-weight: bold; margin: 10px 0;">' + randomGift.name + '</p>' +
        '<p style="font-size: 24px; color: #666; margin: 20px 0;">Bạn đã đạt 300 điểm!<br>Chúc mừng bạn nhận được phần quà đặc biệt! 🎉</p>' +
        '<button onclick="restartGame()" style="padding: 15px 50px; font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: white; border: none; border-radius: 50px; cursor: pointer; margin-top: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">CHƠI LẠI</button>';

    document.body.appendChild(giftDiv);
}

// Cập nhật điểm
function updateScore() {
    document.getElementById('score').textContent = score;
}

// Cập nhật thời gian
function updateTimer() {
    document.getElementById('timer').textContent = timeLeft;
}

// Kết thúc game
function endGame() {
    gameRunning = false;
    clearInterval(flowerInterval);
    clearInterval(timerInterval);

    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOver').classList.add('show');

    // Xóa tất cả hoa còn lại
    var flowers = document.querySelectorAll('.flower');
    flowers.forEach(function (flower) {
        flower.parentNode.removeChild(flower);
    });
}

// Chơi lại
function restartGame() {
    document.getElementById('gameOver').classList.remove('show');

    // Xóa popup quà nếu có
    var giftPopup = document.querySelectorAll('[style*="fixed"]');
    giftPopup.forEach(function (popup) {
        if (popup.parentNode && popup !== document.getElementById('gameOver') && popup !== document.getElementById('startScreen')) {
            popup.parentNode.removeChild(popup);
        }
    });

    // Xóa mây cũ
    var clouds = document.querySelectorAll('.cloud');
    clouds.forEach(function (cloud) {
        cloud.parentNode.removeChild(cloud);
    });

    startGame();
}

// CSS animation thêm
var style = document.createElement('style');
style.textContent = '@keyframes popOut { to { transform: translate(-50%, -50%) scale(0); opacity: 0; } }';
document.head.appendChild(style);