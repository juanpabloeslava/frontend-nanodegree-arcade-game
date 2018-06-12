/* -------------------------------------
------  CLASSES AND VARIABLES ----------
------------------------------------- */
// restart game variables
const restartButton = document.querySelector('#restart-btn');
// timer variables
let timerCounter = document.getElementById('timeCounter');
let minDisplay = document.getElementById('minutes');
let secDisplay = document.getElementById('seconds');
let min = 0;
let sec = 0;
let firstKeypress = 0;
// Enemy Class our player must avoid
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

        this.checkForCollision();
    }

    // Draw the enemy on the screen, required method for game
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    checkForCollision () {
        if ( (player.x < this.x + 80) && (player.x + 80 > this.x)  && (player.y < this.y + 60) && (player.y + 60 > this.y) ) {
            player.die();
        }
    }
}
// Player Class
class Player {
    //constructor
    constructor (x, y) {
        // Initial position and player image
        this.x = x;
        this.y = y;
        this.alive = true;
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
        if (this.alive) {
            if (keyPressed === 'left' && this.x >= 20 ) {
                this.x -= 100;
                firstKeypress++;
                console.log (`x: ${this.x} y:${this.y}`);
            }
            if (keyPressed === 'right' && this.x <= 380 ) {
                this.x += 100;
                firstKeypress++;
                console.log (`x: ${this.x} y:${this.y}`);
            }
            if (keyPressed === 'down' && this.y <= 405 ) {
                this.y += 85;
                firstKeypress++;
                console.log (`x: ${this.x} y:${this.y}`);
            }
            if (keyPressed === 'up' && this.y >= 0) {
                this.y -= 85;
                firstKeypress++;
                console.log (`x: ${this.x} y:${this.y}`);       
            }
            // reset game when player reaches water
            if (this.y <= -10) {
                console.log ("Congratulation, you've won!");       
                setTimeout ( function () {
                    gameRestart();
                }, 500);
            } 
        }
    }

    reset () {
        this.x = 200;
        this.y = 410;
        this.alive = true;
    }

    die () {
        this.alive = false;
        setTimeout (function () {  
            player.reset();
        }, 1000);
    }
}

/* -------------------------------------
----------  OBJECT INSTANCES -----------
------------------------------------- */

// Start Enemies
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
let enemiesYPos = [60, 142, 225];
//
for (const enemyY of enemiesYPos) {
    const initialSpeed = Math.floor( (Math.random() * 250) + 150 );
    const enemyX = Math.floor( (Math.random() * -100) - 50 );
    let enemy = new Enemy (enemyX, enemyY, initialSpeed);
    // push new instance of Enemy into allEnemies array, so game engine will create it.
    allEnemies.push(enemy);
}
// Start player
// Place the player object in a variable called player. player is set at the bottom middle of the game-screen
let player = new Player (200, 410);
console.log (`x: ${player.x} y:${player.y}`);

/* -------------------------------------
-------  FUNCTIONS & LISTENERS  --------
------------------------------------- */
// Event Listeners
restartButton.addEventListener('click', gameRestart);
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
    //
    if (firstKeypress == 1) {
        timer();
    }
});

function timer () {
    timerInterval = setInterval (function (){
        // check the seconds
        if (sec < 59) {
            sec++;
        } else {
            sec = 0;
            min++;
        }   
        // update seconds and minutes label
        secDisplay.innerHTML = addZeroTimer(sec);
        minDisplay.innerHTML = addZeroTimer(min);
    }, 1000); 
}

function resetTimer () {
    firstKeypress = 0;
    clearInterval(timerInterval);
    sec = 0;
    min = 0;
    // update seconds and minutes label
    secDisplay.innerHTML = addZeroTimer(sec);
    minDisplay.innerHTML = addZeroTimer(min);
}

// add 0 if needed to the displayed timer (01:09 instead of 1:9)
function addZeroTimer (val) {
    // convert integers to string, to measure their lenght
    let valString = val.toString();
    // if .lenght is less than two, it means the number is in the single digits
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}
// Restart game Function
function gameRestart () {
    player.reset();
    resetTimer();
}

