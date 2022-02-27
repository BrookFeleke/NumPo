const historyButton = document.querySelector(".h-button");
const history = document.querySelector(".history");
const container = document.querySelector(".container");
const game = document.querySelector(".game");
const inputGrid = document.querySelector(".input-c");
const latestResult = document.querySelector(".result-c");
const back = document.querySelector(".back-button")
var width = window.innerWidth > 0 ? window.innerWidth : screen.width;

console.log("width");
console.log(width);

function modileResp() {
  if (width < 640) {
  }
}

back.addEventListener("click", () => {
 
        container.classList.toggle("active");
        history.classList.toggle("mobile");
        game.classList.toggle("mobile");
      
})

historyButton.addEventListener("click", () => {
  if (width > 640) {
    container.classList.toggle("active");
    history.classList.toggle("active");
    game.classList.toggle("active");
  } else {
    container.classList.toggle("active");
    history.classList.toggle("mobile");
    game.classList.toggle("mobile");
  }
});

const randomNumber = [];

function getRan() {
  return Math.floor(Math.random() * 10);
}
//generated random number
function generateRandom() {
  for (var i = 0; i < 4; i++) {
    if (i === 0) {
      var random = getRan();
      while (random === 0) random = getRan();
      randomNumber[i] = random;
    } else {
      var random = getRan();
      while (randomNumber.includes(random)) random = getRan();
      randomNumber[i] = random;
    }
  }
  console.log(randomNumber);
}

function startInteraction() {
  generateRandom();
  document.addEventListener("click", handleMouseClick);
  document.addEventListener("keydown", handleKeyPress);
}

function stopInteraction() {
  document.removeEventListener("click", handleMouseClick);
  document.removeEventListener("keydown", handleKeyPress);
}

function handleMouseClick(e) {
  if (e.target.matches("[data-key]")) {
    pressKey(e.target.dataset.key);
    return;
  }
  if (e.target.matches("[data-enter]")) {
    submitGuess();
  }
  if (e.target.matches("[data-delete]")) {
    deleteKey();
  }
}

function handleKeyPress(e) {
  if (e.key === "Enter") {
    submitGuess();
  }
  if (e.key === "Backspace" || e.key === "Delete") {
    deleteKey();
  }
  if (e.key.match(/^[0-9]$/)) {
    pressKey(e.key);
  }
}

function deleteKey() {
  const activeTiles = getActiveTiles();
  const lastTile = activeTiles[activeTiles.length - 1];

  if (lastTile == null) return;
  lastTile.textContent = "";
  delete lastTile.dataset.state;
  delete lastTile.dataset.number;
}

function pressKey(key) {
  const nextTile = inputGrid.querySelector(":not([data-number])");
  nextTile.dataset.number = key;
  nextTile.textContent = key;
  nextTile.dataset.state = "filled";
}

function getActiveTiles() {
  return inputGrid.querySelectorAll('[data-state="filled"]');
}

function submitGuess() {
  let n = 0;
  let p = 0;
  const userGuess = [];
  const activeTiles = getActiveTiles();
  if (activeTiles.length < 3) {
    console.log(activeTiles.length);
    alert("hello");
    return;
  } else {
    for (var i = 0; i < 4; i++) {
      userGuess[i] = activeTiles[i].innerHTML;
    }

    userGuess.forEach((digit, index) => {
      if (randomNumber.includes(parseInt(digit))) {
        n++;
        if (index === randomNumber.indexOf(parseInt(digit))) p++;
      }
    });
    // for( var i = 0; i < 4; i++){
    //     for( var j = 0; j < 4; j++){
    //         if(userGuess[i] = randomNumber[j]){
    //             n++
    //             if(i === j) p++
    //         }
    //     }
    // }

    const latestR = latestResult.querySelectorAll(".cell");
    for (var i = 0; i < 4; i++) {
      latestR[i].innerHTML = userGuess[i];
    }
    latestR[4].innerHTML = n;
    latestR[5].innerHTML = p;

    createElement(userGuess, n, p);
    for (var i = 0; i < 4; i++) {
      deleteKey();
    }
    console.log(activeTiles);
  }
}

function createElement(userGuess, n, p) {
  console.log(userGuess);
  const createdBlock = document.createElement("div");
  createdBlock.classList.add("result-c");
  for (var i = 0; i < 4; i++) {
    const createdCell = document.createElement("div");
    createdCell.classList.add("cell");
    createdCell.innerHTML = userGuess[i];
    createdBlock.appendChild(createdCell);
  }
  const createdNCell = document.createElement("div");
  createdNCell.classList.add("cell");
  createdNCell.classList.add("result-cell");
  createdNCell.innerHTML = n;
  createdBlock.appendChild(createdNCell);

  const createdPCell = document.createElement("div");
  createdPCell.classList.add("cell");
  createdPCell.classList.add("result-cell");
  createdPCell.innerHTML = p;
  createdBlock.appendChild(createdPCell);
  history.appendChild(createdBlock);
}
startInteraction();
