
var canvas = document.getElementById('square');
var ctx = canvas.getContext('2d');

let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;

class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let score = 0;

let snakeParts = [];
let snakeLength = 2;


let xVelocity = 0;
let yVelocity = 0;

let appleX = 5;
let appleY = 5;

function drawGame(){
    changeSnakePosition();
    if(gameOver()){
        return;
    }
    clearScreen();
    drawSnake();
    appleCollosition();
    drawApple();
    drawScore();
    setTimeout(drawGame,1000 / speed);
}

function gameOver(){
    let gameOver = false;
    if(xVelocity === 0 && yVelocity === 0)
        return false;
    for(let i = 0;i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }

    ctx.fillStyle = 'white';
    ctx.font = '65px verdana'
    ctx.fillText('Game Over!',0,canvas.height / 2);
    return gameOver;
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.clientWidth,canvas.height);
}

function drawSnake(){
    ctx.fillStyle = 'green';
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

    snakeParts.push(new SnakePart(headX,headY));
    if(snakeParts.length > snakeLength){
        snakeParts.shift();
    }
}

function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = '15px verdana';
    ctx.fillText("Score "+ score, canvas.width-70, 15);
}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    if(headX >= tileCount){
        headX = 0;
    }else if(headX < 0){
        headX = tileCount - 1;
    }
    headY = headY + yVelocity;
    if(headY >= tileCount){
        headY = 0;
    }else if(headY < 0){
        headY = tileCount - 1;
    }
}

function appleCollosition(sec = 0){
    if(appleX === headX && appleY === headY){
        let X = Math.floor(Math.random() * tileCount);
        let Y = Math.floor(Math.random() * tileCount);
        for(let i = 0; i < snakeParts.length; i++){
            let part = snakeParts[i];
            if(part.x === X && part.y === Y){
                appleCollosition(1);
                return;
            }
        }
        appleX = X;
        appleY = Y;
        snakeLength++;
        score++;
    }
}

document.body.addEventListener('keydown',keyAction);

function keyAction(event){
    if(event.keyCode == 40){
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }else if(event.keyCode == 38){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }else if(event.keyCode == 37){
        if(xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }else if(event.keyCode == 39){
        if(xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
}


// functions for touch screen dircetion key
function keyDown(){
    if(yVelocity == -1)
        return;
    yVelocity = 1;
    xVelocity = 0;
}
function keyUp(){
    if(yVelocity == 1)
        return;
    yVelocity = -1;
    xVelocity = 0;
}
function keyLeft(){
    if(xVelocity == 1)
        return;
    yVelocity = 0;
    xVelocity = -1;
}
function keyRight(){
    if(xVelocity == -1)
        return;
    yVelocity = 0;
    xVelocity = 1;
}
drawGame();