// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    //constructor
    constructor (x, y) {
        // Initial position and player image
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';

    }
    //Methods for Player's Prototype
    update (dt) {
        // This thing is called over and over again. If it's not there, nothing shows
        //console.log (`This is ${this}'s update() Method.`);
    }

    render () {
        // This thing is called over and over again
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput (keyPressed) {
        // This thing is called everytime an allowedKey is pressed
        console.log (`This is ${this}'s handleInput() Method.`);
        // check for pressed keys (these strings come from the eventListener that points to the listenForKey() function) and act accordingly
        if (keyPressed === 'left' ) {
            this.x -= 50;
        }
        if (keyPressed === 'right' ) {
            this.x += 50;
        }
        if (keyPressed === 'up' ) {
            this.y -= 50;
        }
        if (keyPressed === 'down' ) {
            this.y += 50;
        }
    }

    reset () {
        this.x = 200;
        this.y = 400;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
// Place the player object in a variable called player. player is set at the bottom middle of the game-screen
let player = new Player (200, 400);



// Initiate and Restart game
function gameRestart () {
    player.reset();
}


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
