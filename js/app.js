// Enemies our player must avoid
class Enemy {
    constructor (x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update (dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        // set a random speed for the enemies
        // add the speed to the enemies movement
        this.x += this.speed * dt;
        // relocate enemies at the start when they cross the board
        if (this.x >= 505) {
            this.x = -60;
            this.speed = Math.floor( (Math.random() * 250) + 150 );
        }
    }

    // Draw the enemy on the screen, required method for game
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

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
        // This thing is called over and over again. It is what paints thing on the canvas
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput (keyPressed) {
        // check for pressed keys (these strings come from the eventListener that points to the listenForKey() function) and act accordingly
        if (keyPressed === 'left' && this.x >= 20 ) {
            this.x -= 45;
            console.log (`x: ${this.x} y:${this.y}`);
        }
        if (keyPressed === 'right' && this.x <= 380 ) {
            this.x += 45;
            console.log (`x: ${this.x} y:${this.y}`);
        }
        if (keyPressed === 'down' && this.y <= 405 ) {
            this.y += 45;
            console.log (`x: ${this.x} y:${this.y}`);
        }
        if (keyPressed === 'up' && this.y >= 0) {
            this.y -= 45;
            console.log (`x: ${this.x} y:${this.y}`);       
        }
        // reset game when player reaches water
        if (this.y == -40) {
            console.log ("Congratulation, you've won!");       
            setTimeout ( function () {
                gameRestart();
            }, 500);
        }
    }

    reset () {
        this.x = 200;
        this.y = 410;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
let enemiesYPos = [60, 142, 225];


for (const enemyY of enemiesYPos) {
    let enemy = new Enemy (-60, enemyY, 200);
    // push new instance of Enemy into allEnemies array, so game engine will create it.
    allEnemies.push(enemy);
}
// Place the player object in a variable called player. player is set at the bottom middle of the game-screen
let player = new Player (200, 410);
console.log (`x: ${player.x} y:${player.y}`);



// Restart game
function gameRestart () {
    player.reset();
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function listenForKey (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
