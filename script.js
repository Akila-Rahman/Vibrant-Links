const grid = document.getElementById("grid");
const resetButton = document.getElementById("reset-button");
const messageDisplay = document.getElementById("message");
const scoreDisplay = document.getElementById("score");
const winnerBanner = document.getElementById("winner-banner");
const newGameButton = document.getElementById("new-game-button");

const colors = ['#d90368', '#FF7F50', '#c01883', '#FF0000', '#820263', '#ffd400'];
let pairs = [];
let selectedDots = [];
let completedPairs = 0;
let attempts = 0;
const maxScore = 100; // Maximum score

// Create the grid
function createGrid() {
    const colorPairs = [...colors, ...colors];
    shuffle(colorPairs);

    colorPairs.forEach(color => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.style.backgroundColor = color;
        dot.dataset.color = color;
        dot.onclick = () => selectDot(dot);
        grid.appendChild(dot);
        pairs.push(dot);
    });

    winnerBanner.style.display = "none"; // Hide winner banner at start
}

// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Select a dot
function selectDot(dot) {
    if (selectedDots.length < 2 && !selectedDots.includes(dot)) {
        selectedDots.push(dot);
        dot.classList.add("selected");

        if (selectedDots.length === 2) {
            attempts++; // Increment attempts
            checkMatch();
        }
    }
}

// Check for a match
function checkMatch() {
    const [firstDot, secondDot] = selectedDots;

    if (firstDot.dataset.color === secondDot.dataset.color) {
        completedPairs++;
        firstDot.style.visibility = "hidden"; // Hide matched dots
        secondDot.style.visibility = "hidden"; // Hide matched dots
        scoreDisplay.textContent = `Attempts: ${attempts}`;
        messageDisplay.textContent = `Matched ${firstDot.dataset.color}!`;
    } else {
        setTimeout(() => {
            firstDot.classList.remove("selected");
            secondDot.classList.remove("selected");
            messageDisplay.textContent = "Try again!";
        }, 1000);
    }

    selectedDots = [];
    checkGameOver();
}

// Check if the game is over
function checkGameOver() {
    if (completedPairs === colors.length) {
        const finalScore = maxScore - attempts * 10; // Example scoring formula
        messageDisplay.textContent = `Congratulations! You've matched all pairs! Your score: ${Math.max(finalScore, 0)}`;
        winnerBanner.style.display = "block"; // Show winner banner
        launchConfetti(); // Call confetti function
    }
}

// Reset the game
resetButton.onclick = () => {
    grid.innerHTML = "";
    pairs = [];
    selectedDots = [];
    completedPairs = 0;
    attempts = 0; // Reset attempts
    messageDisplay.textContent = "";
    scoreDisplay.textContent = "Attempts: 0"; // Reset score display
    createGrid();
};

// New Game button
newGameButton.onclick = () => {
    resetButton.onclick(); // Call reset function to start a new game
    winnerBanner.style.display = "none"; // Hide winner banner
};

// Start the game
createGrid();


function checkGameOver() {
    if (completedPairs === colors.length) {
        const finalScore = maxScore - attempts * 10; // Example scoring formula
        messageDisplay.textContent = `Congratulations! You've matched all pairs! Your score: ${Math.max(finalScore, 0)}`;
        winnerBanner.style.display = "block"; // Show winner banner
        launchConfetti(); // Call confetti function
    }
}
