
let didWin = false
// Roll dice mechanic
const rollDice = () => {
    if (didWin)  {
        return;
    }
    const dice = 6
    const roll = Math.ceil(Math.random() * dice);
    console.log("You rolled", roll)
    alert(`${players[currentPlayerTurn].name}: You rolled ${roll} `)
    let currentPlayer = players[currentPlayerTurn];
    currentPlayer.position += roll;
    console.log(currentPlayer)

    //checking position of ladder and moving to the end position of ladder
    ladders.forEach(ladder => {
        if (ladder.start == currentPlayer.position) {
            currentPlayer.position = ladder.end
            alert(`${players[currentPlayerTurn].name}: Woohoo!! Climb a ladder on the way to the top`)
        }
    });

    
    //checking position of snake and moving to the end position of snake
    snakes.forEach(snake => {
        if (snake.start == currentPlayer.position) {
            currentPlayer.position = snake.end
            alert(`${players[currentPlayerTurn].name}: Boohoo!! A snake ate you, time to go down`)
        }
    });

    // Both players will move 
    currentPlayerTurn++;
    if (currentPlayerTurn >= players.length) {
        currentPlayerTurn = 0;
    }

    // Reaching last position wins 
    if (currentPlayer.position >= 99) {
        alert(`${players[currentPlayerTurn].name} has won!`)
        didWin = true

    }
    renderBoard();
}

// Making Players
const players = [{
    name: "Player 1",
    position: 0,
    color: "yellow",
}, {
    name: "Player 2",
    position: 0,
    color: "blue",
}]


let currentPlayerTurn = 0

const ladders = [{
    start: 8,
    end: 25
}, {
    start: 64,
    end: 89
}, {
    start: 12,
    end: 59
}, {
    start: 28,
    end: 46
}, {
    start: 36,
    end: 51
}, {
    start: 75,
    end: 82
}
]

const snakes = [{
    start: 97,
    end: 11
},{
    start: 71,
    end: 48
},{
    start: 69,
    end: 59
},{
    start: 42,
    end: 9
},{
    start: 32,
    end: 24
},
]

// Rendering board
const width = 10; // Width of board
const height = 10; // Height of board
const board = [];
let position = 0;

for (let y = height; y >= 1; y--) {
    let row = [];
    board.push(row);
    for (let x = 0; x < width; x++) {
        row.push({ x, y, occupied: null, position });
        position++;
    }
}

console.log(board)

const boardSize = 50; // size of each square
const renderBoard = () => {
    let boardHTML = ``;
    board.forEach(row => {
        row.forEach(square => {
            boardHTML += `<div class = square style ="top: ${square.y * boardSize}px; left:${square.x * boardSize}px"></div>` /// making board
        });
    });

    players.forEach(player => {
        let square = null;
        board.forEach(row => {
            row.forEach(square => {
                if (square.position === player.position) {
                    console.log("Player is on Square:", square) // Telling which position the player is on
                    boardHTML += `<div class= player style="top: ${square.y * boardSize + 5}px; left:${square.x * boardSize + 5}px;background-color:${player.color}"></div>` // Generating player
                }
            })
        })

    });

    // ladder drawing on board
    ladders.forEach(ladder => {

        let startPosL = { x: 0, y: 0 };
        let endPosL = { x: 0, y: 0 };

        board.forEach(row => {
            row.forEach(square => {
                if (square.position == ladder.start) {
                    startPosL.x = square.x * boardSize;
                    startPosL.y = square.y * boardSize;
                }
                if (square.position == ladder.end) {
                    endPosL.x = square.x * boardSize;
                    endPosL.y = square.y * boardSize;
                }

            });
        });
        drawLadder({ color: "green", startPosL, endPosL });
    });

    // Snake drawing on board
    snakes.forEach(snake => {

        let startPosS = { x: 0, y: 0 };
        let endPosS = { x: 0, y: 0 };

        board.forEach(row => {
            row.forEach(square => {
                if (square.position == snake.start) {
                    startPosS.x = square.x * boardSize;
                    startPosS.y = square.y * boardSize;
                }
                if (square.position == snake.end) {
                    endPosS.x = square.x * boardSize;
                    endPosS.y = square.y * boardSize;
                }

            });
        });
        drawSnake({ color: "red", startPosS, endPosS });
    });

    document.getElementById("board").innerHTML = boardHTML;
    console.log("Render Board");
}

const drawLadder = ({ color, startPosL, endPosL }) => {
    const ctx = $("#canvas")[0].getContext("2d")
    ctx.beginPath();
    ctx.moveTo(startPosL.x - 25, startPosL.y - 25);
    ctx.lineTo(endPosL.x - 25, endPosL.y - 25);
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.stroke();
}

const drawSnake = ({ color, startPosS, endPosS }) => {
    const ctx = $("#canvas")[0].getContext("2d")
    ctx.beginPath();
    ctx.moveTo(startPosS.x - 25, startPosS.y - 25);
    ctx.lineTo(endPosS.x - 25, endPosS.y - 25);
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.stroke();
}




const main = () => {
    renderBoard();
    drawLadder();
    drawSnake();
}

$(main)

