let typedWord = '';
let targetWord;
let lastTargetWord = '';
let progress = 0;
const maxProgress = 100;
const lineHeight = 250;
let lineColor = [0, 0, 0];
const progressBarHeight = 20;

let startTime;
let duration = 120; // Duration of the timer in seconds, now set to 120

function setup() {
  createCanvas(800, 300);
  textAlign(CENTER, CENTER);
  textSize(32);
  targetWord = getRandomWordOrSentence();
  startTime = millis(); // Initialize the timer
}

function draw() {
  background(220);
  text("Type: " + targetWord, width / 2, height / 3);

  stroke(lineColor[0], lineColor[1], lineColor[2]);
  strokeWeight(4);
  line(100, lineHeight, 100 + (progress / maxProgress) * (width - 200), lineHeight);

  drawProgressBar();

  fill(255);
  rect(width / 2 - 150, 2 * height / 3, 300, 50);
  fill(0);
  text(typedWord, width / 2, 2 * height / 3 + 25);

  let currentTime = millis();
  let elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
  let timeLeft = duration - elapsedSeconds;

  textSize(24);
  fill(0, 0, 255);
  text(`Timer: ${timeLeft}s`, width / 2, height - 30);

  if (elapsedSeconds >= duration) {
    startTime = currentTime; // Reset the timer
    progress = 0;
    lastTargetWord = '';
    targetWord = getRandomWordOrSentence();
    lineColor = [0, 0, 0]; // Reset line color
  }
}

function keyPressed() {
  if (keyCode === BACKSPACE) {
    typedWord = typedWord.slice(0, -1);
  } else if (keyCode === ENTER) {
    if (typedWord.toUpperCase() === targetWord.toUpperCase()) {
      lineColor = [0, 255, 0]; // Green
      progress += 10;
      if (progress >= maxProgress) {
        progress = 0;
      }
      lastTargetWord = targetWord;
      targetWord = getRandomWordOrSentence();
    } else {
      lineColor = [255, 0, 0]; // Red
      progress = max(0, progress - 10);
    }
    typedWord = '';
  } else if (keyCode >= 32 && keyCode <= 126) {
    typedWord += key;
  }
}

function drawProgressBar() {
  noStroke();
  fill(100);
  rect(100, height - progressBarHeight - 10, width - 200, progressBarHeight);
  
  fill(0, 255, 0);
  let progressBarWidth = (progress / maxProgress) * (width - 200);
  rect(100, height - progressBarHeight - 10, progressBarWidth, progressBarHeight);

  fill(0);
  textSize(16);
  text(`${progress}%`, 100 + progressBarWidth / 2, height - progressBarHeight / 2 - 5);
  textSize(32); // Resetting textSize back for other texts
}

function getRandomWordOrSentence() {
  const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Evan', 'Fiona', 'George'];
  const sentences = [
    'The quick brown fox jumps over the lazy dog',
    'A journey of a thousand miles begins with a single step',
    'Better late than never',
    'Easy come, easy go'
  ];
  let newTarget;
  do {
    if (progress > 50) {
      newTarget = sentences[int(random(sentences.length))];
    } else {
      newTarget = names[int(random(names.length))];
    }
  } while (newTarget === lastTargetWord);
  return newTarget;
}
