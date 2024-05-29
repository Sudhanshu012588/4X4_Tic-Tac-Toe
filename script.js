let boxes = document.querySelectorAll(".box");
let winPat = [
    [0, 1, 2], [4, 5, 6], [8, 9, 10], [9, 10, 11],
    [1, 2, 3], [5, 6, 7], [12, 13, 14], [13, 14, 15],
    [0, 4, 8], [1, 5, 9], [4, 6, 10], [3, 7, 11],
    [4, 8, 12], [5, 9, 13], [6, 10, 14], [7, 11, 15],
    [0, 5, 10], [1, 6, 11], [2, 5, 8], [3, 6, 9],
    [4, 9, 14], [5, 10, 15], [6, 9, 12], [7, 10, 13],
    [8, 5, 4], [9, 6, 3], [10, 5, 0], [11, 6, 1],
    [12, 9, 6], [13, 10, 7], [14, 9, 4], [15, 10, 5],[2,6,10]
];
let turnO = true;
let resetBtn = document.querySelector("#reset");
let newGamebtn = document.querySelector("#new_game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let X = 0;
let O = 0;


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Click");
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disable = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enable = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
let X_score = document.querySelector(".X");
let O_score = document.querySelector(".O");
const showWinner = (winner) => {
    console.log(winner)
    if(winner == "X"){
        X=X+1;
        X_score.textContent="X->" + X;
    }
    if(winner == "O"){
        O=O+1;
        O_score.textContent="O->" + O;
    }
    setTimeout(()=>{
        msg.innerText = `WINNER IS ${winner}`;
        msgContainer.classList.remove("hide");

    },500);
    setTimeout(()=>{
        
        msgContainer.classList.add("hide");

    },2000);
}

const checkWinner = () => {
    for (let pattern of winPat) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val == pos2val && pos2val == pos3val) {
                disable();
                showWinner(pos1val);
                return;  // Exit function if we have a winner
            }
        }
    }

    // Check for a tie
    let isTie = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            isTie = false;
            break;
        }
    }
    if (isTie) {
        msg.innerText = "Game Tie";
        msgContainer.classList.remove("hide");
    }
}

const resetgame = () => {
    turnO = true;
    enable();
    
    msgContainer.classList.add("hide");
}
const newgame=()=>{
    turnO = true;
    enable();
    X=0;
    O=0;
    O_score.textContent = "O->" + O;
    X_score.textContent = "X->" + X;
    msgContainer.classList.add("hide");
}

newGamebtn.addEventListener("click", newgame);
resetBtn.addEventListener("click", resetgame);
