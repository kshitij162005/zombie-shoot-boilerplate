// Iteration 1: Declare variables required for this game
const gameBody = document.getElementById("game-body");
var seconds = document.getElementById("timer").textContent;
// console.log(seconds)  // text content considers the time written i html like 60 is written
const lives = document.getElementById("lives");
var zombieId = 0;
const img = [
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png",
]

// Iteration 1.2: Add shotgun sound
const shotgunSound = new Audio("./assets/shotgun.wav");
shotgunSound.volume = 1; // for volume 

gameBody.onclick = () => {
    shotgunSound.pause();
    shotgunSound.currentTime = 0;
    shotgunSound.play();
}

// Iteration 1.3: Add background sound

const backgroundSound = new Audio("./assets/bgm.mp3");
backgroundSound.play()
backgroundSound.loop = true;

// Iteration 1.4: Add lives
const maxlives = 4;
var noOflives = 4;


// Iteration 2: Write a function to make a zombie
function makeZombie() {
    let randomImage = img[getRandomInt(0,img.length)]
    gameBody.innerHTML += `<img src="./assets/${randomImage}" class = "zombie-image" id = "zombie${zombieId}">`;
    let zombie = document.getElementById("zombie"+zombieId);
    zombie.style.transform = `translateX(${getRandomInt(20,70)}vw)`;
    zombie.style.animationDuration = `${getRandomInt(2,6)}s`;
    zombie.onclick = () => {
        zombieDestroy(zombie)
    }
}


// Iteration 3: Write a function to check if the player missed a zombie
function checkCollision(zombie){
    if (zombie.getBoundingClientRect().top <= 0) {
        noOflives--;
        console.log("Getting collided")
        return true;
    }
    return false;

}
// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function zombieDestroy(zombie){
    zombie.style.display = "none";
    zombieId++
    makeZombie()
}

// Iteration 5: Creating timer
var timer = setInterval(() => {
    seconds--;
    document.getElementById("timer").textContent = seconds;
    let zombie = document.getElementById("zombie" + zombieId);

    if (checkCollision(zombie) == true) {
        zombieDestroy(zombie);
        if (noOflives == 0) {
            location.href = "./game-over.html";
        }
    }
    if (seconds === 0) {
        location.href = "./win.html";
    }
}, 1000);

// Check for winning condition outside the timer


// Iteration 6: Write a code to start the game by calling the first zombie
makeZombie()

// Iteration 7: Write the helper function to get random integer
function getRandomInt(min,max){
    min = Math.ceil(min);   //min should be exclusive thats why we took ceil
    max = Math.floor(max)   // max should be inclusive thats why we took floor


    return Math.floor(Math.random()*(max-min)+min);
}
