// Enemies our player must avoid
var Enemy = function(posX, posY, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.posX = posX;
  this.posY = posY;
  this.speed = speed;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

let enemyStartingPosX = -100; //sets starting position of enemy
let loses = -1; //number of loses, starts on -1 because starting game adds +1 to it
let wins = 0; //number of wins

Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.posX = this.speed * dt + this.posX;
  if (this.posX >= 500) {
    this.posX = enemyStartingPosX;
  }
  this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
};

Enemy.prototype.checkCollisions = function() {
  //size of enemies
  let hitBoxSize = 60;

  //checks for colisions with player
  if (
    player.posY + hitBoxSize > this.posY &&
    player.posY < this.posY + hitBoxSize &&
    player.posX < this.posX + hitBoxSize &&
    player.posX + hitBoxSize > this.posX
  ) {
    gameLose();
  }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(posX, posY, speed) {
  this.posX = posX;
  this.posY = posY;
  this.speed = speed;

  this.sprite = "images/char-boy.png";
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
};

Player.prototype.update = function() {};

Player.prototype.handleInput = function(key) {
  //handling input of player
  if (key === "left") {
    this.posX = (this.posX - this.speed + 500) % 500;
  } else if (key === "right") {
    this.posX = (this.posX + this.speed) % 500;
  } else if (key === "up") {
    this.posY = (this.posY - this.speed + 500) % 500;
  } else if (key === "down") {
    this.posY = (this.posY + this.speed) % 500;
  }

  //checking if player is on the water
  if (this.posY <= 35) {
    gameWon();
    return;
  }
};

//reset player position
Player.prototype.reset = function() {
  this.posX = 200;
  this.posY = 380;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [];
let player = new Player(0, 0, 50);
gameLose();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

function scoreBoardUpdate() {
  //this function updates the scoreBoard
  if (loses > 0) {
    document.getElementById("scoreValue").innerHTML =
      "WINS: " +
      wins +
      " | LOSES: " +
      loses +
      " | WINS %: " +
      Math.round((wins / (wins + loses)) * 100);
  } else {
    document.getElementById("scoreValue").innerHTML =
      "WINS: " + wins + " | LOSES: " + loses + " | WINS %: " + 0;
  }
}

function gameWon() {
  player.reset();
  wins++;
  scoreBoardUpdate();
}

function gameLose() {
  let randomRange = 150; //sets random range
  let baseSpeed = 100; //minimum speed of enemies

  player.reset();
  loses++;
  scoreBoardUpdate();
  allEnemies = [];
  //creating enemies, randomizing their speed and starting position
  allEnemies.push(
    new Enemy(
      enemyStartingPosX,
      Math.random() * randomRange + 70,
      Math.random() * randomRange + baseSpeed
    ),
    new Enemy(
      enemyStartingPosX,
      Math.random() * randomRange + 60,
      Math.random() * randomRange + baseSpeed
    ),
    new Enemy(
      enemyStartingPosX,
      Math.random() * randomRange + 50,
      Math.random() * randomRange + baseSpeed
    )
  );
}
