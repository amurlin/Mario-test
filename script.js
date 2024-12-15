const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Canvasiin size
canvas.width = 1100;
canvas.height = 400;

// Backround
const testLevel = new Image();
testLevel.src = 'assets/test-lvl.png';

// Playeriin model
const marioIdle = new Image();
marioIdle.src = 'assets/mario/small/mario-idle.png';

// Objectuudiin model
const obstacleImage1 = new Image();
obstacleImage1.src = 'assets/pipe-s.png'; // Small Pipe

const obstacleImage2 = new Image();
obstacleImage2.src = 'assets/pipe-m.png'; // Medium pipe

const obstacleImage0 = new Image();
obstacleImage0.src = 'assets/brick.png'; // Brick

const obstacleImageL = new Image();
obstacleImageL.src = 'assets/luckybox.gif'; // Luckybox

// Player object
const player = {
    position: {x: 100, y:100},
    velocity: {x: 0, y: 0},
    gravity: 0.5,
    width: 25,
    height: 25,
    marioIdle: marioIdle,
    draw: function () {
        c.drawImage(this.marioIdle, this.position.x, this.position.y, this.width, this.height)
    },

    update: function () {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.velocity.y + this.height <= canvas.height - 75)
           this.velocity.y += this.gravity
        else this.velocity.y = 0
    }
}

testLevel.onload = () => {
    // Дэлгэц дээр background зурна
    c.drawImage(testLevel, 0, 0, canvas.width, canvas.height);

    // Тоглогчийг draw хийх
    player.draw();  
};

// Controller keys boolean check (default)
const keys = {
    ArrowUp: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false }
}

addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            player.velocity.y -= 13;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true; 
            break;
    }
}
)

addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;   
    }
}
)

// Player movement logic
function updateMovement() {
    if (keys.ArrowRight.pressed)  player.position.x += 2; // Move player right
    if (keys.ArrowLeft.pressed) player.position.x -= 2; // Move player left
}

// Obstacles
const obstacles = [
    { position: { x: 600, y: 275 }, width: 50, height: 50, image: obstacleImage1 }, // Small pipe
    { position: { x: 850, y: 245 }, width: 50, height: 80, image: obstacleImage2 }, // Medium pipe
    { position: { x: 400, y: 224 }, width: 27, height: 27, image: obstacleImage0 }, // Brick
    { position: { x: 454, y: 224 }, width: 27, height: 27, image: obstacleImage0 }, // Brick
    { position: { x: 427, y: 224 }, width: 27, height: 27, image: obstacleImageL } // Luckybox
];

// Draw obstacles
function drawObstacles() {
    obstacles.forEach(obstacle => {
      c.drawImage(obstacle.image, obstacle.position.x, obstacle.position.y, obstacle.width, obstacle.height);
    });
}

// Check collision with obstacles
function checkCollision() {
    obstacles.forEach(obstacle => {
        // Check for horizontal collision (left and right sides)
        if (player.position.x < obstacle.position.x + obstacle.width &&
            player.position.x + player.width > obstacle.position.x &&
            player.position.y + player.height > obstacle.position.y &&
            player.position.y < obstacle.position.y + obstacle.height) {

            // If collision detected, stop player movement
            player.velocity.x = 0;  // Stop horizontal movement
        }
    });
}

function animate () {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(testLevel, 0, 0, canvas.width, canvas.height);
    player.update();
    updateMovement();
    drawObstacles();
    checkCollision();
    requestAnimationFrame(animate)
}

animate()





