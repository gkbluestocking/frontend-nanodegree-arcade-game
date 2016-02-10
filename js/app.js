//Tile size
var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;

//Canvas
var CANVAS_WIDTH = 505;
var CANVAS_HEIGHT = 606;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started


    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 101;
    this.multiplier = Math.floor((Math.random() * 5) + 1);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    if (this.x > 500) {
        this.speed = Math.floor((Math.random() * 7) + 1);
        this.x -= 650;

        if (Math.random() >= 0.66) {
            this.y = 60;
        } else if (Math.random() >= 0.33) {
            this.y = 140;
        } else {
            this.y = 220;
        }
    } else {
        this.x += this.speed + dt;
    }
};
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = 200;
    this.y = 300;
    this.startX = 200;
    this.startY = 300;
    this.sprite = 'images/char-pink-girl.png';
};

Player.prototype.update = function() {
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y < 10) {
        this.y = -10;
        this.reset();
    } else if (this.y > 410) {
        this.y = 410;
    }
    for (var i = 0; i < allEnemies.length; i++) {
        allEnemies[i].checkCollisions();
    }
};


Player.prototype.render = function(x, y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x === 0) {
        this.x = this.x;
    } else if (direction == 'right' && this.x === 400) {
        this.x = this.x;
    } else if (direction === 'down' && this.y === 60) {
        this.x = 200;
        this.y = 380;
    } else if (direction === 'left') {
        this.x -= 100;
    } else if (direction === 'right') {
        this.x += 100;
    } else if (direction === 'up') {
        this.y -= 80;
    } else {
        this.y += 80;
    }
};

Enemy.prototype.checkCollisions = function() {
    if (player.x < this.x + 50 &&
        player.x + 50 > this.x &&
        player.y < this.y + 50 &&
        player.y + 50 > this.y) {
        console.log("hit");
        alert("You hit my ladybug!");
        player.reset();
    }
};



Player.prototype.reset = function() {
    this.x = this.startX;
    this.y = this.startY;

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var bug1 = new Enemy(75, 230, 20);
var bug2 = new Enemy(200, 150, 20);
var bug3 = new Enemy(10, 60, 30);
var allEnemies = [bug1, bug2, bug3];


// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});