let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game is started");
        started = true;
        level = 0; // Reset level
        gameSeq = []; // Reset game sequence
        levelup();
    }
});

function gameFlash(btn) {
    if (btn) {
        btn.classList.add("flash");
        setTimeout(() => {
            btn.classList.remove("flash");
        }, 250);
    } else {
        console.error("gameFlash received a null button!");
    }
}

function userFlash(btn) {
    if (btn) {
        btn.classList.add("userflash");
        setTimeout(() => {
            btn.classList.remove("userflash");
        }, 250);
    } else {
        console.error("userFlash received a null button!");
    }
}

function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let btns = ["red", "yellow", "purple", "green"];
    let randIdx = Math.floor(Math.random() * 4); // Fix: Generate a random number between 0-3
    let randcolor = btns[randIdx];
    let randbtn = document.querySelector(`.${randcolor}`);

    if (randbtn) {
        gameSeq.push(randcolor);
        console.log("Game Sequence:", gameSeq);
        gameFlash(randbtn);
    } else {
        console.error(`No button found with class: ${randcolor}`);
    }
}

function checkans(idx) {
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game over!Your score was <b> ${level}</b> <br>Press any key to restart.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
       reset ();
    }
}

function btnpress() {
    let btn = this;
    userFlash(btn);

    let usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);

    checkans(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level=0;
}