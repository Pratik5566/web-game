let currentMoleTile;
let currentPlantTiles = []; // Array to track multiple plants
let score = 0;
let gameOver = false;
let highScore = localStorage.getItem("highScore") || 0; // Retrieve high score from localStorage

window.onload = function () {
    setGame();
    displayHighScore(); // Display high score when the game loads
};

function setGame() {
    // Set up the grid
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);

        document.getElementById("board").appendChild(tile);
    }

    setInterval(setMole, 1000); // 1000 milliseconds
    setInterval(setPlants, 1000); // Update function to handle multiple plants
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }

    if (currentMoleTile) {
        currentMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "./images/monty-mole.png";

    let num = getRandomTile();
    if (currentPlantTiles.some(tile => tile.id == num)) {
        return;
    }

    currentMoleTile = document.getElementById(num);
    currentMoleTile.appendChild(mole);
}

function setPlants() {
    if (gameOver) {
        return;
    }

    currentPlantTiles.forEach(tile => (tile.innerHTML = ""));
    currentPlantTiles = [];

    for (let i = 0; i < 4; i++) {
        let plant = document.createElement("img");
        plant.src = "/images/piranha-plant.png";

        let num = getRandomTile();

        if (currentMoleTile && currentMoleTile.id == num) {
            continue;
        }
        if (currentPlantTiles.some(tile => tile.id == num)) {
            continue;
        }

        let plantTile = document.getElementById(num);
        plantTile.appendChild(plant);
        currentPlantTiles.push(plantTile);
    }
}

function selectTile() {
    if (gameOver) {
        return;
    }

    if (this == currentMoleTile) {
        score += 10;
        document.getElementById("score").innerText = "Score: " + score.toString(); // Update the score
    } else if (currentPlantTiles.includes(this)) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true;

        // Update high score if needed
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore); // Store new high score in localStorage
        }

        // Display the high score
        displayHighScore();

        // Create and display the restart button
        const infoDiv = document.getElementById("info"); // Assuming "info" is the ID of the div
        const restartButton = document.createElement("button");
        restartButton.innerText = "Restart Game";
        restartButton.id = "restartButton";
        restartButton.addEventListener("click", restartGame);
        infoDiv.appendChild(restartButton);
    }
}

function restartGame() {
    // Reset game state
    score = 0;
    gameOver = false;
    currentMoleTile = null;
    currentPlantTiles = [];

    // Clear the board
    for (let i = 0; i < 9; i++) {
        document.getElementById(i.toString()).innerHTML = "";
    }

    // Update score display
    document.getElementById("score").innerText = "Score: " + score.toString();

    // Remove the restart button
    const restartButton = document.getElementById("restartButton");
    if (restartButton) {
        restartButton.remove();
    }
}

function displayHighScore() {
    const highScoreDiv = document.getElementById("highScore"); // Assuming "highScore" is the ID of the div
    if (highScoreDiv) {
        highScoreDiv.innerText = "High Score: " + highScore;
    }
}
