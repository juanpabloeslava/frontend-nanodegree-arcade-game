"use strict";
/* -------------------------------------
------  CLASSES AND VARIABLES ----------
------------------------------------- */
// start/restart game variables
const startButton = document.getElementById('start-game');
const restartButton = document.getElementById('restart-btn');
const restartButton2 = document.getElementById('play-again-btn');
// timer variables
let timerInterval;
let firstKeypress = 0;
let minDisplay = document.getElementById('minutes');
let secDisplay = document.getElementById('seconds');
let min = 0;
let sec = 0;
// lives
let justDied = 0;
let livesDisplay = document.getElementById('lives');
// levels
let gameLevel = 1;
// modal windows
const completionScreen = document.querySelector('#completion-screen');
const startScreen = document.querySelector('#start-screen');
let winText = document.querySelector('#completion-text');
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
        this.x += this.speed * dt;
        // relocate enemies at the start when they cross the board
        if (this.x >= 505) {
            this.x = -60;
            // set random speed for each enemy. It gets faster as the player earns points (lives) in the game.
            if (gameLevel == 1) {
                this.speed = Math.floor( (Math.random() * 250) + 150 );
            }
            if (gameLevel == 2) {
                this.speed = Math.floor( (Math.random() * 350) + 200 );
            }
            if (gameLevel == 3) {
                this.speed = Math.floor( (Math.random() * 350) + 250 );
            }
            if (gameLevel == 4) {
                this.speed = Math.floor( (Math.random() * 450) + 300 );
            }
        }
        this.checkForCollision();
    }

    // Draw the enemy on the screen, required method for game
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    checkForCollision () {
        if ( (player.x < this.x + 80) && (player.x + 80 > this.x)  && (player.y < this.y + 60) && (player.y + 60 > this.y) ) {
            justDied++;
            console.log(this.speed);
            if (justDied == 1) {
                player.die();
            }
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
        this.lives = 3;
        this.alive = true;
        this.sprite = 'images/char-boy.png';

    }
    //Methods for Player's Prototype
    update (dt) {
        // This thing is called over and over again byt the game engine. If it's not there, nothing shows
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
                console.log (`firstKeypress: ${firstKeypress}`);
            }
            if (keyPressed === 'right' && this.x <= 380 ) {
                this.x += 100;
                firstKeypress++;
                console.log (`firstKeypress: ${firstKeypress}`);
            }
            if (keyPressed === 'down' && this.y <= 405 ) {
                this.y += 85;
                firstKeypress++;
                console.log (`firstKeypress: ${firstKeypress}`);
            }
            if (keyPressed === 'up' && this.y >= 0) {
                this.y -= 85;
                firstKeypress++;
                console.log (`firstKeypress: ${firstKeypress}`);       
            }
            // reset game when player reaches water
            if (this.y <= -10) {
                this.alive = false;     
                setTimeout ( function () {
                    player.getPoint();
                }, 500);
            } 
        }
    }

    respawn () {
        this.checkGameLevel();
        this.x = 200;
        this.y = 410;
        this.alive = true;
        justDied = 0;
    }

    reset () {
        gameLevel = 1;
        this.restoreLives();
        this.respawn();
    }

    die () {
        this.alive = false;
        this.loseLive();
        setTimeout (function () {  
            player.respawn();
        }, 300);
    }

    getPoint () {
        this.gainLive();
        this.respawn();
    }

    gainLive () {
        this.lives++;
        displayLives();
    }

    loseLive () {
        this.lives--;
        displayLives();
    }

    restoreLives () {
        this.lives = 3;
        displayLives();
    }

    checkGameLevel () {
        if (this.lives == 0) {
            // player looses
            youLose();
        } 
        if (this.lives > 0) {
            // level 1
            gameLevel = 1;
            console.log('level 1');
        } 
        if (this.lives >= 5) {
            // level 2
            gameLevel = 2;
            console.log('level 2');
        } 
        if (this.lives >= 7) {
            // level 3
            gameLevel = 3;
            console.log('level 3');
        } 
        if (this.lives >= 9) {
            // level 4
            gameLevel = 4;
            console.log('level 4!');
        } 
        if (this.lives == 10) {
            // player wins
            youWin();    
        }
    }

}

/* -------------------------------------
----------  OBJECT INSTANCES -----------
------------------------------------- */

// Start Enemies
// Place all enemy objects in an array called allEnemies (otherwise nothing works)
let allEnemies = [];
let enemiesYPos = [60, 142, 225];
//
for (const enemyY of enemiesYPos) {
    // intial speed and x position are random (within a range)
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

// start / restart game
//startButton.addEventListener('click', closeStartWindow);
startButton.addEventListener('click', closeStartWindow);
restartButton.addEventListener('click', gameRestart);
restartButton2.addEventListener('click', gameRestart);
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
    // Start game on first keyPress
    if (firstKeypress == 1) {
        gameInit();
    }
});
// init game
function closeStartWindow () {
    startScreen.style.display = 'none';
}
function gameInit () {
    livesDisplay.innerHTML = '3';
    //start timer
    timer();
    // display lives
    displayLives();
}
// lives
function displayLives () {
    let currentLives = player.lives;
    livesDisplay.innerHTML = currentLives; 
    //console.log (`display lives says: ${livesDisplay.innerHTML}`); 
}
// time
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
        secDisplay.innerHTML = addZeroNumber(sec);
        minDisplay.innerHTML = addZeroNumber(min);
    }, 1000); 
}
function resetTimer () {
    firstKeypress = 0;
    clearInterval(timerInterval);
    sec = 0;
    min = 0;
    // update seconds and minutes label
    secDisplay.innerHTML = addZeroNumber(sec);
    minDisplay.innerHTML = addZeroNumber(min);
}
// add 0 if needed to the displayed timer (01:09 instead of 1:9)
function addZeroNumber (val) {
    // convert integers to string, to measure their lenght
    let valString = val.toString();
    // if .lenght is less than two, it means the number is in the single digits
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}
// win and lose
function youWin () {
    // stop timer from going on
    clearInterval(timerInterval);
    secDisplay.innerHTML = addZeroNumber(sec);
    minDisplay.innerHTML = addZeroNumber(min);
    // show message
    completionScreen.style.display = 'block';
    // update message content
    winText.innerText =  `Congratulations, you've won!
    Your time : ${addZeroNumber(min)} : ${addZeroNumber(sec)}`;
}

function youLose () {
    // stop timer from going on
    clearInterval(timerInterval);
    secDisplay.innerHTML = addZeroNumber(sec);
    minDisplay.innerHTML = addZeroNumber(min);
    // show message
    completionScreen.style.display = 'block';
    // update message content
    winText.innerText =  `Unfortunately, you lost. 
    Would you like to try again?
    Your time : ${addZeroNumber(min)} : ${addZeroNumber(sec)}`;
}

// Restart game
function gameRestart () {
    completionScreen.style.display = 'none';
    player.reset();
    resetTimer();
}

