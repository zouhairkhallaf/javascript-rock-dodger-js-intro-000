const DODGER = document.getElementById('dodger')
const GAME   = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH  = 400
const LEFT_ARROW  = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')
var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);
  const rockLeftEdge = positionToInteger(rock.style.left)
  const rockRightEdge = rockLeftEdge + 20;
  const dodgerLeftEdge = positionToInteger(DODGER.style.left)
  const dodgerRightEdge = dodgerLeftEdge + 40;
  if (top > 360){
    return (dodgerLeftEdge<=rockLeftEdge  && rockRightEdge<=dodgerRightEdge) ||
                          (dodgerLeftEdge<=rockRightEdge && rockRightEdge<=dodgerRightEdge) ||
                          (dodgerLeftEdge<=rockLeftEdge  && rockLeftEdge <=dodgerRightEdge)
  }
}
/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top
  GAME.appendChild(rock);
  function moveRock() {
    rock.style.top = `${top+=2}px`
     if (checkCollision(rock)) {
       endGame();
     }
     if(top<360){
        window.requestAnimationFrame(moveRock)
     }else{
       rock.remove();
     }
  }
  window.requestAnimationFrame(moveRock)
  ROCKS.push(rock)
  return rock
}

function endGame() {
  clearInterval(gameInterval);
  //removing all ROCKS from the DOM,
  ROCKS.forEach(function(elem){
      elem.remove();
  });
  //removing the `moveDodger` event listener.
  document.removeEventListener('keydown', moveDodger);
  //Finally, alert "YOU LOSE!" to the player.
  alert("YOU LOSE!");
}

function moveDodger(e) {
    if(e.which === LEFT_ARROW){
      e.preventDefault();
      e.stopPropagation();
      moveDodgerLeft();
   }
    if (e.which === RIGHT_ARROW){
      e.preventDefault();
      e.stopPropagation();
      moveDodgerRight();
   }
}

function moveDodgerLeft() {
  var currentValue = DODGER.style.left.replace('px', '')
  var currentValue = parseInt(currentValue, 10)
  if (currentValue-4>0) {
    DODGER.style.left = `${currentValue - 4}px`
  }
}

function moveDodgerRight() {
   var currentValue = DODGER.style.left.replace('px', '')
   var currentValue = parseInt(currentValue, 10)
   if (currentValue+44<400) {
     DODGER.style.left = `${currentValue + 4}px`
   }
}
function start() {
  document.addEventListener('keydown', moveDodger)
  START.style.display = 'none'
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
