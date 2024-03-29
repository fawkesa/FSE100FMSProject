<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
  <title>Typing Game</title>
  <style>
    body {
      font-family: Calibri, sans-serif;
      background-color: #222;
      color: #ddd;
    }
  </style>
</head>
<body>
  <script>
    let words = ["report", "imprint", "damaged", "arch", "furtive", "joyous", "fulfil", "understand", "imprint", "unnatural", "foregoing", "preside", "shake", "poor", "snail", "square", "guard", "touch", "fluttering", "sweet", "crook", "disappear", "reply", "prickly", "hellish", "desire", "frail", "tell", "innocent", "behavior", "mammoth", "brainy", "afternoon", "enlighten", "number", "gentle", "opt", "swing", "copy", "group", "gusty", "light", "cloud", "love", "uppity", "current", "clocks", "download", "declare", "feel", "light", "sore", "scary", "teach", "fight", "hurt", "use", "expand", "number", "buzz", "ooze", "lame", "sniff", "sock", "nap", "shake", "breathe", "pollute", "approval", "home", "opine", "stride", "large", "hurry", "painful", "hesitant", "dizzy", "scorch", "magical", "harm", "unwieldy", "lavish", "door", "bustling", "silent", "straw", "blow", "stitch", "sincere", "obnoxious", "adjoining", "cake", "office", "wave", "puzzled", "scarce", "stale", "change", "quizzical", "bashful", "exist", "remarkable", "manager", "bereave", "fling", "fork", "grow", "pain", "bizarre", "hot", "recur", "cat", "spy", "shock", "escape", "leaf", "blur", "dinosaur", "visitor", "body", "clever", "nut", "beetle", "shrill", "faint", "stretch", "clumsy", "jagged", "plucky", "concerned", "juvenile", "ablaze", "sudden", "shade", "read", "wicked", "dreary", "passenger", "consecrate", "moan", "voiceless", "pleasant", "paint", "oe", "slimy", "imply", "optimize", "juicy", "overt", "scab", "volleyball", "knowledge", "dip", "typeset", "screw", "whole", "contract", "rest", "attack", "territory", "furry", "curve", "absorbed", "nation", "unsightly", "elbow", "scatter", "act", "wry", "acoustic", "vacation", "parallel", "judge", "own", "yawn", "brick", "stove", "slippery", "afternoon", "flop", "overconfident", "abandoned", "submit", "adaptable", "kick", "activity", "ill-informed", "hobbies", "place", "grab", "consult", "saddle", "holiday", "wish", "popcorn", "idealize", "careless", "healthy", "spicy", "direct"];

    let lines = [];
    let lineLength = 40;
    let lineCount = 3;
    let lineHeight = 50;
    let currentTyped = "";
    let currentIndex = 0;
    let startTime;
    let endTime;
    let timeLeft = 60;
    let timerInterval;
    let correctCount = 0;
    let wrongCount = 0;
    let typingSpeed = 0;
    let accuracy = 0;
    let gameOver = false;

    function setup() {
      createCanvas(windowWidth, windowHeight);
      textAlign(CENTER, CENTER);
      textSize(24);
      generateLines();
      startGame();
    }

    function generateLines() {
      for (let i = 0; i < lineCount; i++) {
        let line = "";
        let remainingLength = lineLength;
        while (remainingLength > 0) {
          let word = random(words);
          if (word.length <= remainingLength) {
            line += word + " ";
            remainingLength -= word.length + 1; // Add 1 for space between words
          } else {
            break;
          }
        }
        lines.push(line.trim());
      }
    }

    function startGame() {
      startTime = millis();
      timerInterval = setInterval(updateTimer, 1000);
    }

    function draw() {
      background(34);
      for (let i = 0; i < lines.length; i++) {
        fill(221);
        text(lines[i], width / 2, height / 2 - lineHeight * (lineCount - i - 1));
      }
      fill(255);
      text(currentTyped.toLowerCase(), width / 2, height / 2 + lineHeight);

      if (!gameOver) {
        let timeText = "Time: " + timeLeft;
        fill(255);
        text(timeText, 20, 20);
      } else {
        let stats = "Speed: " + typingSpeed + " WPM | Accuracy: " + accuracy + "%";
        fill(0, 255, 0);
        text("Game Over!", width - 200, 20);
        fill(255);
        text(stats, width - 200, 50);
        if (keyCode === ENTER) {
          gameOver = false;
          resetGame();
        }
      }
    }

    function updateTimer() {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        gameOver = true;
        calculateStats();
      }
    }

    function keyPressed() {
      if (!gameOver) {
        if (keyCode === BACKSPACE) {
          currentTyped = currentTyped.slice(0, -1);
        } else if (keyCode >= 65 && keyCode <= 90 || keyCode === 32) {
          let typedChar = keyCode === 32 ? " " : String.fromCharCode(keyCode);
          currentTyped += typedChar.toLowerCase();
        }

        if (lines[currentIndex].startsWith(currentTyped)) {
          if (lines[currentIndex].length === currentTyped.length) {
            correctCount++;
            lines.splice(currentIndex, 1);
            generateLines();
            currentTyped = "";
          }
        } else {
          wrongCount++;
        }
      }
    }

    function calculateStats() {
      let typedCharacters = correctCount + wrongCount;
      let elapsedTime = 60 - timeLeft;
      typingSpeed = Math.floor((typedCharacters / elapsedTime) * 60);
      accuracy = Math.floor((correctCount / typedCharacters) * 100);
    }

    function resetGame() {
      lines = [];
      currentTyped = "";
      correctCount = 0;
      wrongCount = 0;
      typingSpeed = 0;
      accuracy = 0;
      timeLeft = 60;
      currentIndex = 0;
      generateLines();
      startGame();
    }
  </script>
</body>
</html>
