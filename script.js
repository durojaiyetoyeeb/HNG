// Select elements
const colorBox = document.querySelector("[data-testid='colorBox']");
const colorOptions = document.querySelectorAll("[data-testid='colorOption']");
const gameStatus = document.querySelector("[data-testid='gameStatus']");
const scoreDisplay = document.querySelector("[data-testid='score']");
const newGameButton = document.querySelector("#newGameButton");

// Predefined color choices
const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
let targetColor = "";
let score = 0;

// Function to start a new game
function startGame() {
    // Randomly select a target color
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = targetColor;

    // Shuffle colors for options
    const shuffledColors = [...colors].sort(() => 0.5 - Math.random());

    // Assign colors to buttons
    colorOptions.forEach((button, index) => {
        button.style.backgroundColor = shuffledColors[index];
        button.dataset.color = shuffledColors[index]; // Store color data
    });

    // Reset messages
    gameStatus.textContent = "";
}

// Function to handle user guess
function checkGuess(event) {
    const guessedColor = event.target.dataset.color;
    if (!guessedColor) return;

    if (guessedColor === targetColor) {
        gameStatus.textContent = "Correct!";
        gameStatus.style.color = "green";
        score++;
        scoreDisplay.textContent = score;
        colorBox.classList.add("correct");
    } else {
        gameStatus.textContent = "Wrong! Try again.";
        gameStatus.style.color = "red";
        colorBox.classList.add("wrong");
    }

    // Remove animation class after a short delay
    setTimeout(() => {
        colorBox.classList.remove("correct", "wrong");
    }, 500);
}

// Attach event listeners to color buttons
colorOptions.forEach(button => button.addEventListener("click", checkGuess));

// Attach event listener to the New Game button
newGameButton.addEventListener("click", startGame);

// Start the game initially
startGame();
