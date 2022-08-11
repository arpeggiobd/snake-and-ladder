

// dice rolling
const randomNum = () => {
    const dice = 6
    const roll = Math.ceil(Math.random() * dice);
    console.log("You rolled", roll)
    return roll
}

// roll dice on click
const rollDice = () => {

}

// Rendering board
const width = 10; // Width of board
const height = 10; // Height of board
const board = [];

for (let y = 0; y < height; y++) {
    let row = [];
    board.push(row);
    for (let x = 0; x < width; x++) {
        row.push({ x, y, occupied: null })
    }
}

console.log(board)

const boardSize = 50; // size of each square
const renderBoard = () => {
    let boardHTML = ``;
    board.forEach(row => {
        row.forEach(square => {
            boardHTML += `<div class = square style ="top: ${square.y * boardSize}px; left:${square.x * boardSize}px"></div>`
        });
    });
    document.getElementById("board").innerHTML = boardHTML;
    console.log("Render Board");
}



const main = () => {
    renderBoard();
}

$(main)

