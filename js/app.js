var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;


// Enemies our player must avoid
var Enemy = function(x,y,speed) {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.width = 101;
  this.multiplier = Math.floor((Math.random()*5)+1);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

  };


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    if (this.x > TILE_WIDTH + 150) {
        this.speed = Math.floor((Math.random() * 7) + 1);
        this.x -= 125;

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


Enemy.prototype.checkCollisions = function() {
    if (this.y === player.y && (this.x > player.x - 60 && this.x < player.x + 60)){
        this.x = 200;
        this.y = 300;
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
  this.Start_X = 200;
  this.Start_Y = 300;
  this.reset();
  this.sprite = 'images/char-pink-girl.png';
};

Player.prototype.update = function(){
if (this.x < 0){
    this.x = 0;
}else if (this.x > 400) {
    this.x = 400;
} else if (this.y < 10) {
    this.y = -10;
    player.reset();
} else if (this.y > 420) {
    this.y = 420;
}
};

Player.prototype.render = function(x,y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x === 0){
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


Player.prototype.reset = function () {
    this.x = this.Start_X;
    this.y = this.Start_Y;
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