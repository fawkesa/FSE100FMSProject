<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
  <title>Typing Game</title>
</head>
<body>
  <script>
    let words = [];
    let currentWord = "";
    let currentIndex = 0;
    let input = "";
    let startTime;
    let endTime;
    let elapsedTime;
    let correctCount = 0;
    let wrongCount = 0;
    let typingSpeed = 0;
    let accuracy = 0;
    let playing = false;

    function setup() {
      createCanvas(400, 200);
      generateWords();
      textSize(32);
      textAlign(CENTER, CENTER);
    }

    function draw() {
      background(220);
      if (!playing) {
        displayStartScreen();
      } else {
        displayGameScreen();
      }
    }

    function displayStartScreen() {
      fill(0);
      text("Press Enter to Start", width / 2, height / 2);
    }

    function displayGameScreen() {
      fill(0);
      text(currentWord, width / 2, height / 2);

      fill(0);
      text(input, width / 2, height / 2 + 50);

      let timePassed = millis() - startTime;
      fill(0);
      text("Time: " + Math.floor(timePassed / 1000), 100, 50);

      fill(0);
      text("Correct: " + correctCount, 300, 50);

      fill(0);
      text("Wrong: " + wrongCount, 300, 100);

      fill(0);
      text("Speed: " + typingSpeed + " WPM", 100, 100);

      fill(0);
      text("Accuracy: " + accuracy + "%", 100, 150);
    }

    function generateWords() {
      for (let i = 0; i < 100; i++) {
        let length = floor(random(1, 11));
        let word = "";
        for (let j = 0; j < length; j++) {
          word += String.fromCharCode(97 + floor(random(26))); // Random lowercase letter
        }
        words.push(word);
      }
    }

    function startGame() {
      playing = true;
      currentWord = words[currentIndex];
      startTime = millis();
    }

    function keyPressed() {
      if (keyCode === ENTER && !playing) {
        startGame();
      } else if (playing) {
        if (keyCode === BACKSPACE) {
          input = input.slice(0, -1);
        } else if (keyCode >= 65 && keyCode <= 90) {
          input += String.fromCharCode(keyCode).toLowerCase();
        }

        if (input === currentWord) {
          correctCount++;
          currentIndex++;
          if (currentIndex >= words.length) {
            endGame();
          } else {
            currentWord = words[currentIndex];
            input = "";
          }
        } else if (input.length >= currentWord.length || currentWord.indexOf(input) !== 0) {
          wrongCount++;
        }

        calculateStats();
      }
    }

    function endGame() {
      playing = false;
      endTime = millis();
      elapsedTime = (endTime - startTime) / 1000;
    }

    function calculateStats() {
      let typedCharacters = correctCount + wrongCount;
      typingSpeed = Math.floor((typedCharacters / elapsedTime) * 60);
      accuracy = Math.floor((correctCount / typedCharacters) * 100);
    }
  </script>
</body>
</html>
