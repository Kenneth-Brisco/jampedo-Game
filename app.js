let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 10;
let ballSpeedY = 4;

let player1Score = 0;
let player2Score = 0;
const WINNING_SCORE = 3;

let showingWinScreen = false;

let paddle1Y = 250;
let paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;



function calculateMousePos(evt) {
      let rect = canvas.getBoundingClientRect();
      let root = document.documentElement;
      let mouseX = evt.clientX - rect.left - root.scrollLeft;
      let mouseY = evt.clientY - rect.top - root.scrollTop;
      return {
        x:mouseX,
        y:mouseY
      }
}

function handleMouseClick(evt) {
    if (showingWinScreen) { 
          player1Score = 0;
          player2Score = 0;
          showingWinScreen = false;
    }
}


window.onload = function() {
  
      canvas= document.getElementById('gameCanvas');
      canvasContext = canvas.getContext('2d');


      const framesPerSecond = 30;
      setInterval(function() {
                moveEverything();
                drawEverything();
      }, 1000/framesPerSecond);

      canvas.addEventListener('mousedown',handleMouseClick);
      
      canvas.addEventListener('mousemove', 
          function(evt) {
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
          });
}

//BALL RESET

function ballReset() {
      if (player1Score >= WINNING_SCORE ||
      
          player2Score >= WINNING_SCORE) {
           
            showingWinScreen = true;
          }

      ballSpeedX = -ballSpeedX;
      ballX = canvas.width/2;
      ballY = canvas.height/2;

  
      
}

function computerMovement() {
      let paddle2YCenter  = paddle2Y + (PADDLE_HEIGHT/2);
      if (paddle2YCenter < ballY-35)  {
            paddle2Y += 6;
      } else if (paddle2YCenter > ballY+35){
             paddle2Y -= 6;
      }
}


function moveEverything() {
    if (showingWinScreen) {
      return;
    }
    computerMovement();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

      if (ballX < 0) {
          if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
                    ballSpeedX = -ballSpeedX;
                    
                    let deltaY = ballY -(paddle1Y+PADDLE_HEIGHT/2);
                    ballSpeedY = deltaY * 0.35;
          } else {
            player2Score++; //must be before ball reset
            ballReset();
          }
      }
      if (ballX > canvas.width) {
        if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {
          ballSpeedX = -ballSpeedX;

          let deltaY = ballY -(paddle2Y+PADDLE_HEIGHT/2);
                    ballSpeedY = deltaY * 0.35;
            } else {
              player1Score++;
              ballReset();
            }
      } 

      if (ballY < 0) {
        return ballSpeedY = -ballSpeedY;
      }
      if (ballY > canvas.height) {
        return ballSpeedY = -ballSpeedY;
      } 
}

function drawNet() {
  for(i=0; i<canvas.height; i+=50) {
      colorRect(canvas.width/2-1, i, 2, 20, 'white');
  }
}

function drawEverything() {        
        //next line blanks out the screen with black
        colorRect(0,0,canvas.width, canvas.height, 'black');

        if (showingWinScreen) {
          canvasContext.fillStyle = 'white';

          if (player1Score >= WINNING_SCORE) {
            canvasContext.fillText('Left Player Won!', 350, 200);
          } 
          else if (player2Score >= WINNING_SCORE) {
            canvasContext.fillText('Right Player Won!', 350, 200);
          }
          
          canvasContext.fillText('click to continue', 350, 500);
          return;
        }
          

        drawNet();
        // this is the left player paddle
        colorRect(0, paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT, 'white');

         // this is the right computer paddle
         colorRect(canvas.width-10, paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT, 'white');

        // next line draws the ball
        colorCircle(ballX, ballY, 10, 'white');

        canvasContext.fillText(player1Score, 100, 100);
        canvasContext.fillText(player2Score, canvas.width-100, 100);
}

function colorCircle(centerX, centerY, radius, drawColor) {
          canvasContext.fillStyle = 'drawColor';
          canvasContext.beginPath();
          canvasContext.arc(centerX,centerY, radius, 0, Math.PI*2, true);
          canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.fillRect(leftX, topY, width, height);
}