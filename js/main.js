//MODEL
const grid = document.querySelector(".grid");
createBoard();
const squares = document.querySelectorAll('.square');
const mole = document.querySelector(".mole");
let timeLeft = document.querySelector("#time");
let score = document.querySelector("#score");
let result = 0;
let randomMolePosition = 0;
let hitPosition;
let timeLeftId = null;
let timerId = null;
let currentTime = 60;

function moveMole() {
  squares[randomMolePosition].classList.remove('mole');
  randomMolePosition = Math.floor(Math.random() * 9);
  squares[randomMolePosition].classList.add("mole");
  hitPosition = randomMolePosition.toString();
}

//CONTROLLER
squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id === hitPosition) { //square.id is of type string, so we need to make hitPosition a string
      result++;
      score.textContent = result.toString();
      hitPosition = -1;
    }
  })
})

//VIEW
function createBoard() {
  for (let i = 0; i < 9; i++) {
    const gridChild = document.createElement("div");
    gridChild.classList.add("square");
    gridChild.setAttribute("id", i.toString());
    grid.appendChild(gridChild);
  }
}

function showNewMolePosition() {
  timerId = setInterval(moveMole, 500);
}

showNewMolePosition();

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime.toString();
  if (currentTime === 0) {
    clearInterval(timeLeftId);
    clearInterval(timerId);
    alert("Game Over! Your final score is: " + result);
  }
}

timeLeftId = setInterval(countDown, 1000);
