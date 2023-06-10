const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const startButton = document.querySelector("#start");
const startText = document.querySelector("#startUp");
const gameOverText = document.querySelector("#gameOverText");
const selecDifficulty = document.querySelector("#selectDifficulty");
const difficultyForm = document.querySelector("#radio-form");
const score = document.querySelector("#score");
const timerDisplay = document.querySelector("#timer");
const timerDisplayText = document.querySelector("#timerDisplayText");
const song = document.querySelector("#background");
const hit = document.querySelector("#hit");
let difficulty = "hard";
//document.querySelector('input[name="difficulty"]:checked').value;
let time = 10;
let timer;
let lastHole = null;
let points = 0;
let isMole = false;


/**
 * Generates a random integer within a range.
 *
 * The function takes two values as parameters that limits the range
 * of the number to be generated. For example, calling randomInteger(0,10)
 * will return a random integer between 0 and 10. Calling randomInteger(10,200)
 * will return a random integer between 10 and 200.
 *
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay given a difficulty query.
 *
 * The function takes a `difficulty` value that can have three values: `easy`
 * `normal` or `hard`. If difficulty is "easy" then the function returns a time delay
 * of 1500 milliseconds (or 1.5 seconds). If the difficulty is set to "normal" it should
 * return 1000. If difficulty is set to "hard" it should return a randomInteger between
 * 600 and 1200.
 *
 * Example:
 * setDelay("easy") //> returns 1500
 * setDelay("normal") //> returns 1000
 * setDelay("hard") //> returns 856 (returns a random number between 600 and 1200).
 *
 */

function setDelay(difficulty) {
  
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else if (difficulty === "hard") {
    return randomInteger(600, 1200);
  }
}

/**
 * Chooses a random hole from a list of holes.
 *
 * This function should select a random Hole from the list of holes.
 * 1. generate a random integer from 0 to 8 and assign it to an index variable
 * 2. get a random hole with the random index (e.g. const hole = holes[index])
 * 3. if hole === lastHole then call chooseHole(holes) again.
 * 4. if hole is not the same as the lastHole then keep track of
 * it (lastHole = hole) and return the hole
 */
function chooseHole(holes) {
  const randomNumber = randomInteger(0, 8);
  const hole = holes[randomNumber];

  if (hole === lastHole) {
    return chooseHole(holes);
  } else {
    lastHole = hole;
    return hole;
  }
}

/**
 *
 * Calls the showUp function if time > 0 and stops the game if time = 0.
 *
 * The purpose of this function is simply to determine if the game should
 * continue or stop. The game continues if there is still time `if(time > 0)`.
 * If there is still time then `showUp()` needs to be called again so that
 * it sets a different delay and a different hole. If there is no more time
 * then it should call the `stopGame()` function. The function also needs to
 * return the timeoutId if the game continues or the string "game stopped"
 * if the game is over.
 *
 */


function gameOver() {
  if (time > 0) {
    let timeoutId = showUp();
    return timeoutId;
  } else {
    let gameStopped = stopGame();
    return gameStopped;
  }
}



/**
 *
 * Calls the showAndHide() function with a specific delay and a hole.
 *
 * This function simply calls the `showAndHide` function with a specific
 * delay and hole. The function needs to call `setDelay()` and `chooseHole()`
 * to call `showAndHide(hole, delay)`.
 *
 */

function showUp() {
  
  let delay = setDelay(difficulty);
  const hole = chooseHole(holes);

  return showAndHide(hole, delay);

}




/**
 *
 * The purpose of this function is to show and hide the mole given
 * a delay time and the hole where the mole is hidden. The function calls
 * `toggleVisibility` to show or hide the mole. The function should return
 * the timeoutID
 *
 */
function showAndHide(hole, delay) {

    toggleVisibility(hole);
    const timeoutID = setTimeout(() => {
      
      toggleVisibility(hole);
      gameOver(); 
    
  }, delay);

  return timeoutID;
 
}

/**
 *
 * Adds or removes the 'show' class that is defined in styles.css to
 * a given hole. It returns the hole.
 *
 */
function toggleVisibility(hole) {  
  hole.classList.toggle("show");
  return hole;
}

/**
 *
 * This function increments the points global variable and updates the scoreboard.
 * Use the `points` global variable that is already defined and increment it by 1.
 * After the `points` variable is incremented proceed by updating the scoreboard
 * that you defined in the `index.html` file.
 *
 */
function updateScore() {
  points += 1;

  score.textContent = points;
  return points;
}

/**
 *
 * This function clears the score by setting `points = 0`. It also updates
 * the board using `score.textContent = points`. The function should return
 * the points.
 *
 */
function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

/**
 *
 * Updates the control board with the timer if time > 0
 *
 */
function updateTimer() {
  if (time > 0) {
    time--;
    timerDisplay.textContent = time;
  }
  return time;
}

/**
 *
 * Starts the timer using setInterval. For each 1000ms (1 second)
 * the updateTimer function get called.
 *
 */
function startTimer() {
  timer = setInterval(updateTimer, 1000);

  return timer;
}

/**
 * This function hides the elements found at the beginning of the game on the Start Screen
 */
function hideStartElements() {
  startButton.classList.add("hide");
  startText.classList.add("hide");
  difficultyForm.classList.add("hide");
  selecDifficulty.classList.add("hide");
}

/**
 * This function unhides the elements found at the beginning of the game on the Start Screen
 */
function unhideStartElements() {
  startButton.classList.remove("hide");
  startText.classList.remove("hide");
  difficultyForm.classList.remove("hide");
  selecDifficulty.classList.remove("hide");
}

/**
 * This function hides the Game Over element on the beginning of the game on the Start Screen
 */

function hideGameOver() {
  gameOverText.classList.add("hide");
  timerDisplay.classList.remove("hide");
  timerDisplayText.classList.remove("hide");
}

/**
 * This function unhides the Game Over element at the end of the game.
 */
function unhideGameOver() {
  gameOverText.classList.remove("hide");
  gameOverText.classList.add("gameOverText");
  timerDisplay.classList.add("hide");
  timerDisplayText.classList.add("hide");
}

/**
 *
 * This is the event handler that gets called when a player
 * clicks on a mole. The setEventListeners should use this event
 * handler (e.g. mole.addEventListener('click', whack)) for each of
 * the moles.
 * hit makes the hit sound and will cut off after one second. 
 */
function whack(event) {
   points = updateScore();
  hit.currentTime = 1;
 
  hit.play();
  return points; 
}

/**
 *
 * Adds the 'click' event listeners to the moles. See the instructions
 * for an example on how to set event listeners using a for loop.
 */
function setEventListeners() {
  moles.forEach((mole) => {
    mole.addEventListener("click", whack);
  });
  return moles;
}

/**
 *
 * This function sets the duration of the game. The time limit, in seconds,
 * that a player has to click on the sprites.
 *
 */
function setDuration(duration) {
  time = duration;
  timerDisplay.textContent = time;
  return time;
}

/**
 *
 * This function is called when the game is stopped. It clears the
 * timer using clearInterval. Returns "game stopped".
 *
 */
function stopGame() {
  song.pause();
  song.currentTime = 0;
  clearInterval(timer);
  unhideGameOver();
  unhideStartElements();
  return "game stopped";
}

/**
 *
 * This is the function that starts the game when the `startButton`
 * is clicked.
 *
 */
function startGame() {
  setEventListeners();
  clearScore();
  hideGameOver();
  hideStartElements();
  song.play();
  setDuration(time);
  showUp();
  startTimer();
  updateTimer();
  return "game started";
}

startButton.addEventListener("click", startGame);

// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
