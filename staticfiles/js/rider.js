var canvas;
var canvasContext;
var startRoad = 0;

var carPosX = 0;
var carPosY = 0;
var carWidth = 0;
var carHeight = 0;
var car;

const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;

const MAX_SPEED = 6;
const MIN_SPEED = 1;
var carSpeed = MIN_SPEED; // Speed : low(1) to high(6)

var obstacleWidth = 0;
var obstacleHeight = 0;

var obstacle1Create = false;
var obstacle2Create = false;
var obstacle3Create = false;

var obstacle1X = 0;
var obstacle1Y = 0;

var obstacle2X = 0;
var obstacle2Y = 0;

var obstacle3X = 0;
var obstacle3Y = 0;

var score = 0;
var showScoreScreen = false;

window.onload = function(){
	canvas = document.getElementById("rider_canvas");
	canvasContext = canvas.getContext("2d");

	carWidth = canvas.width/8;
	carHeight = canvas.height/10;

	obstacleWidth = canvas.width/8;
	obstacleHeight = canvas.height/10;

	initGame();

	var framesPerSecond = 30;
	car = new Image();
	car.onload = function() {
		setInterval(updateGame, 1000/framesPerSecond);
	}
	car.src = "images/car.png";

	canvas.addEventListener("keydown", handleKeyEvent);
	canvas.addEventListener("mousedown", handleMouseClick);
}

function initGame() {
	carPosX = canvas.width/4;
	carPosY = 4*canvas.height/5;
	
	obstacle1Y = - obstacleHeight;
	obstacle1X = Math.floor((Math.random() * (canvas.width/2 - obstacleWidth)) + 1);
	obstacle1Create = false;

	obstacle2Y = -canvas.height/3 - obstacleHeight;
	obstacle2X = canvas.width/2 
		+ Math.floor((Math.random() * (canvas.width/2 - obstacleWidth)) + 1);
	obstacle2Create = false;

	obstacle3Y = -2*canvas.height/3 - obstacleHeight;
	obstacle3X = Math.floor((Math.random() * (canvas.width/2 - obstacleWidth)) + 1);
	obstacle3Create = false;
}

function handleKeyEvent(evt) {
	evt = evt || window.event;
	switch(evt.keyCode) {
		case LEFT_KEY:
			if (carPosX > 0) {
				carPosX -= carWidth/8;
			}
			break;
		case RIGHT_KEY:
			if (carPosX < (canvas.width - carWidth)) {
				carPosX += carWidth/8;
			}
			break;
		case UP_KEY:
			if (carPosY > 0) {
				carPosY -= carWidth/8;
			}
			break;
		case DOWN_KEY:
			if (carPosY < (canvas.height - carHeight)) {
				carPosY += carWidth/8;
			}
			break;
		default:
			break;
	}
}

function handleMouseClick(evt) {
	if (showScoreScreen) {
		showScoreScreen = false;
		score = 0;
		initGame();
	}
}

function updateGame() {
	if (showScoreScreen) {
		drawScoreScreen();
	} else {
		drawGame();
		gameLogic();
	}
}

function drawScoreScreen() {
	canvasContext.font="24px Arial";
	colorRect(0, 0, canvas.width, canvas.height, "black");
	colorText("Score : " + score, canvas.width/2 - 50, canvas.height/2, "white");
}

function drawGame() {
	canvasContext.font="16px Arial";
	// Draw canvas
	colorRect(0, 0, canvas.width, canvas.height, "black");

	// Draw road
	drawRoad();

	// Draw car
	canvasContext.drawImage(car, carPosX, carPosY, carWidth, carHeight);

	// Generate obstacles
	generateObstacles();
}

function drawRoad() {
	if (startRoad >= 40) {
		startRoad = 0;
	} else {
		startRoad += carSpeed;
	}

	for (var i = startRoad - 40; i <= canvas.height; i+=40) {
		colorRect(canvas.width/2 - 4, i, 8, 30, "white");
	}
}

function generateObstacles() {
	if (obstacle1Create) {
		obstacle1Y = - obstacleHeight;
		obstacle1X = Math.floor((Math.random() * (canvas.width/2 - obstacleWidth)) + 1);
		obstacle1Create = false;
	}
	colorRect(obstacle1X, obstacle1Y, obstacleWidth, obstacleHeight, "yellow");

	if (obstacle2Create) {
		obstacle2Y = - obstacleHeight;
		obstacle2X = canvas.width/2 
		+ Math.floor((Math.random() * (canvas.width/2 - obstacleWidth)) + 1);
		obstacle2Create = false;
	}
	colorRect(obstacle2X, obstacle2Y, obstacleWidth, obstacleHeight, "blue");

	if (obstacle3Create) {
		obstacle3Y = - obstacleHeight;
		var left = Math.floor((Math.random() * 2) + 1);
		obstacle3X = left == 2 ? obstacle2X : obstacle1X;
		obstacle3Create = false;
	}
	colorRect(obstacle3X, obstacle3Y, obstacleWidth, obstacleHeight, "green");
}

function gameLogic(){
	if (obstacle1Y <= canvas.height) {
		obstacle1Y += carSpeed; 
	} else {
		obstacle1Create = true;
		score++;
	}

	if (obstacle2Y <= canvas.height) {
		obstacle2Y += carSpeed;
	} else {
		obstacle2Create = true;
		score++;
	}

	if (obstacle3Y <= canvas.height) {
		obstacle3Y += carSpeed;
	} else {
		obstacle3Create = true;
		score++;
	}

	detectCollision();
	colorText(""+score, carPosX+carWidth/2-5, carPosY+2*carHeight/3, "white");
	checkScoreAndLevelUp();
}

function checkScoreAndLevelUp() {
	if(carSpeed >= MIN_SPEED) {
		carSpeed = MIN_SPEED + score/5;
	}
}

function detectCollision() {
	if ((obstacle1X + obstacleWidth > carPosX && obstacle1X < carPosX+carWidth)
		&& (obstacle1Y + obstacleHeight > carPosY && obstacle1Y < carPosY+carHeight)) {
		showScoreScreen = true;
	}

	if ((obstacle2X + obstacleWidth > carPosX && obstacle2X < carPosX+carWidth)
		&& (obstacle2Y + obstacleHeight > carPosY && obstacle2Y < carPosY+carHeight)) {
		showScoreScreen = true;
	}

	if ((obstacle3X + obstacleWidth > carPosX && obstacle3X < carPosX+carWidth)
		&& (obstacle3Y + obstacleHeight > carPosY && obstacle3Y < carPosY+carHeight)) {
		showScoreScreen = true;
	}
}

function colorRect(leftX, topY, width, height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
}

function colorText(text, leftX, topY, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillText(text, leftX, topY);
}