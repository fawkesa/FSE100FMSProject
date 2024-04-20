let wordsTwo = ["report", "imprint", "damaged", "arch", "furtive", "joyous", "fulfill", "understand", "imprint", "unnatural", "foregoing", "preside", "shake", "poor", "snail", "square", "guard", "touch", "fluttering", "sweet", "crook", "disappear", "reply", "prickly", "hellish", "desire", "frail", "tell", "innocent", "behavior", "mammoth", "brainy", "afternoon", "enlighten", "number", "gentle", "opt", "swing", "copy", "group", "gusty", "light", "cloud", "love", "uppity", "current", "clocks", "download", "declare", "feel", "light", "sore", "scary", "teach", "fight", "hurt", "use", "expand", "number", "buzz", "ooze", "lame", "sniff", "sock", "nap", "shake", "breathe", "pollute", "approval", "home", "opine", "stride", "large", "hurry", "painful", "hesitant", "dizzy", "scorch", "magical", "harm", "unwieldy", "lavish", "door", "bustling", "silent", "straw", "blow", "stitch", "sincere", "obnoxious", "adjoining", "cake", "office", "wave", "puzzled", "scarce", "stale", "change", "quizzical", "bashful", "exist", "remarkable", "manager", "bereave", "fling", "fork", "grow", "pain", "bizarre", "hot", "recur", "cat", "spy", "shock", "escape", "leaf", "blur", "dinosaur", "visitor", "body", "clever", "nut", "beetle", "shrill", "faint", "stretch", "clumsy", "jagged", "plucky", "concerned", "juvenile", "ablaze", "sudden", "shade", "read", "wicked", "dreary", "passenger", "consecrate", "moan", "voiceless", "pleasant", "paint", "oe", "slimy", "imply", "optimize", "juicy", "overt", "scab", "volleyball", "knowledge", "dip", "typeset", "screw", "whole", "contract", "rest", "attack", "territory", "furry", "curve", "absorbed", "nation", "unsightly", "elbow", "scatter", "act", "wry", "acoustic", "vacation", "parallel", "judge", "own", "yawn", "brick", "stove", "slippery", "afternoon", "flop", "overconfident", "abandoned", "submit", "adaptable", "kick", "activity", "ill", "informed", "hobbies", "place", "grab", "consult", "saddle", "holiday", "wish", "popcorn", "idealize", "careless", "healthy", "spicy", "direct"];


let charactersArrayTwo = [];

for (let i = 0; i < wordsTwo.length; i++) {
    let wordCharactersTwo = wordsTwo[i].split('');
    charactersArrayTwo = charactersArrayTwo.concat(wordCharactersTwo);
}

let textLineTwo = '';
let lineSpeedTwo = 5;
let lineXTwo = 200;
let lineHeightTwo = 50;
let currentTypedTwo = '';
let startTimeTwo;
let endTimeTwo;
let timerIntervalTwo;
let totalCountTwo = 0;
let wrongCountTwo = 0;
let typingSpeedTwo = 0;
let accuracyTwo = 0;
let gameOverTwo = false;
let gameStartedTwo = false;
let startBlinkingTwo = false;
let blinkTimerTwo = 0;
let BackgroundColorTwo = 100;
let spacePressedCountTwo = 0;
let incorrectMessageTwo = '';
let tryAgainButtonTwo;
let variableTimeDuration = 30;
let countdownTimeDuration = variableTimeDuration;
let timeSlider;

function game2Preload(){
  
}

function game2Setup(){
  currentActivity = 2;
  createCanvas(800, 500);
  // Hide the Activity 2 button, show all the other buttons
  menuButton.show();
  game1Button.hide();
  game2Button.hide();
  game3Button.hide();
  game4Button.hide();
  game5Button.hide();
  settingsButton.hide();
  profileButton.hide();
    
  createCanvas(800, 500);
  textAlign(LEFT, CENTER);
  textSize(24);
  
  shuffle(wordsTwo, true);
  generateTextLineTwo();
}

function generateTextLineTwo() {
    let wordsWithSingleSpacesTwo = wordsTwo.map(wordTwo => wordTwo.split('').join(''));
    textLineTwo = wordsWithSingleSpacesTwo.join(' ');
}

function resetGameTwo() {
    gameOverTwo = false;
    gameStartedTwo = false;
    currentTypedTwo = '';
    startTimeTwo = millis();
    totalCountTwo = 0;
    wrongCountTwo = 0;
    typingSpeedTwo = 0;
    accuracyTwo = 0;
    lineXTwo = 200;
    spacePressedCountTwo = 0;
    incorrectMessageTwo = '';
    shuffle(wordsTwo, true);
    generateTextLineTwo();
    countdownTimeDuration = variableTimeDuration;

    if (tryAgainButtonTwo) {
        tryAgainButtonTwo.hide();
        timeSlider.hide();
    }
}

function game2Draw() {
    background(BackgroundColorTwo);  
    if (!gameOverTwo) {
        fill(221);
        text(textLineTwo, lineXTwo, 250);
        fill(255);
        let typedCharactersTwo = currentTypedTwo.split('');
        let expectedCharactersTwo = textLineTwo.substring(0, currentTypedTwo.length).split('');
        for (let i = 0; i < typedCharactersTwo.length; i++) {
            if (typedCharactersTwo[i] === expectedCharactersTwo[i]) {
                fill(255);
            } else {
                fill(255, 0, 0);
            }
            text(typedCharactersTwo[i], lineXTwo + textWidth(currentTypedTwo.substring(0, i)), 300);
        }

        if (incorrectMessageTwo !== '') {
            fill(255, 0, 0);
            text(incorrectMessageTwo, 400, 400);
        }

        if (gameStartedTwo) {
            fill(255);
            let timeTextTwo = '' + countdownTimeDuration;
            text(timeTextTwo, 400, 100);
        }

        if (!gameOverTwo && gameStartedTwo) {
            updateTimerTwo();
        }

        if (gameStartedTwo && !gameOverTwo && millis() % 1000 < 500) {
            fill(255);
            let cursorXTwo = textWidth(textLineTwo.substring(0, textLineTwo.length - currentTypedTwo.length));
            rect(lineXTwo + textWidth(currentTypedTwo) + 2, 310, 18, 2);
        }

        if (!gameStartedTwo && millis() - blinkTimerTwo > 500) {
            startBlinkingTwo = !startBlinkingTwo;
            blinkTimerTwo = millis();
        }
        if (!gameStartedTwo) {
            fill(255);
            text('Begin Typing To Start', 340, 100);
        }
        noStroke();
        fill(BackgroundColorTwo);
        rect(0, 0, 100, 500);
        rect(700, 0, 100, 500);
    } else {
        ScoresEndScreenTwo();
    }
}

function updateTimerTwo() {
    if (millis() - startTimeTwo > 1000) {
        countdownTimeDuration--;
        startTimeTwo = millis();
    }
    if (countdownTimeDuration <= 0) {
        clearInterval(timerIntervalTwo);
        gameOverTwo = true;
        calculateStatsTwo();
    }
}

function game2KeyPressed() {
    if (!gameStartedTwo) {
        gameStartedTwo = true;
        startTimeTwo = millis();
        timerIntervalTwo = setInterval(updateTimerTwo, 1000);
    }

    if (!gameOverTwo) {
        if (keyCode === BACKSPACE) {
            if (currentTypedTwo.endsWith(' ')) {
                currentTypedTwo = currentTypedTwo.slice(0, -1);
                lineXTwo += 10;
            } else {
                currentTypedTwo = currentTypedTwo.slice(0, -1);
                lineXTwo += 10;
            }
            incorrectMessageTwo = '';
        } else if ((keyCode >= 65 && keyCode <= 90) || keyCode === 32) {
            let typedCharTwo = keyCode === 32 ? ' ' : String.fromCharCode(keyCode);
            if (!incorrectMessageTwo) {
                if (typedCharTwo === ' ') {
                    let nextWordIndexTwo = currentTypedTwo.split(' ').length;
                    let nextWordTwo = wordsTwo[nextWordIndexTwo];
                    spacePressedCountTwo++;
                    if (nextWordTwo) {
                        currentTypedTwo += ' ';
                        textLineTwo = textLineTwo.substring(nextWordTwo.length + 1); 
                        generateTextLineTwo();
                        lineXTwo -= 10;
                    }
                } else {
                    currentTypedTwo += typedCharTwo.toLowerCase();
                    lineXTwo -= textWidth(typedCharTwo) - 6.5;
                }
                if (textLineTwo.startsWith(currentTypedTwo)) {
                    if (textLineTwo.length === currentTypedTwo.length) {
                        textLineTwo = '';
                        generateTextLineTwo();
                        currentTypedTwo = '';
                    }
                } else {
                    wrongCountTwo++;
                    incorrectMessageTwo = 'Incorrect';
                }
            }
        }
        totalCountTwo++;
    }
}

function calculateStatsTwo() {
    TestValueSpeedTwo = Math.min(Math.floor((totalCountTwo+spacePressedCountTwo)/5/variableTimeDuration * 100),100);
    TestValueAccuracyTwo = Math.floor(((totalCountTwo - wrongCountTwo) / totalCountTwo) * 100);
}

function ScoresEndScreenTwo() {
    BackgroundTwo = (BackgroundColorTwo);
    background(BackgroundColorTwo);
    let AccuracyPositionXTwo = 200;
    let AccuracyPositionYTwo = 350;


    if (TestValueAccuracyTwo < 50) {
        NewColorTwo = color(255, TestValueAccuracyTwo / 100 * 255, 0);
    } else {
        NewColorTwo = color(255 - (TestValueAccuracyTwo - 50) / 50 * 255, 255, 0);
    }

    if (TestValueAccuracyTwo <= 99) {
        CircumferenceTwo = (TestValueAccuracyTwo / 50 * PI) - HALF_PI;
        fill("Black");
        arc(AccuracyPositionXTwo, AccuracyPositionYTwo, 203, 203, -HALF_PI - 0.01, CircumferenceTwo + 0.01);
        fill(NewColorTwo);
        arc(AccuracyPositionXTwo, AccuracyPositionYTwo, 200, 200, -HALF_PI, CircumferenceTwo);
        fill("Black");
        arc(AccuracyPositionXTwo, AccuracyPositionYTwo, 103, 103, -HALF_PI - 0.01, CircumferenceTwo + 0.01);
        fill(BackgroundColorTwo);
        noStroke();
        arc(AccuracyPositionXTwo, AccuracyPositionYTwo, 100, 100, -HALF_PI - 0.03, CircumferenceTwo + 0.03);
    } else {
        fill("Black");
        arc(AccuracyPositionXTwo, AccuracyPositionYTwo, 203, 203, 0, 2 * PI);
        fill(NewColorTwo);
        arc(AccuracyPositionXTwo, AccuracyPositionYTwo, 200, 200, 0, 2 * PI);
        fill("Black");
        arc(AccuracyPositionXTwo, AccuracyPositionYTwo, 103, 103, 0, 2 * PI);
        fill(BackgroundColorTwo);
        noStroke();
        arc(AccuracyPositionXTwo, AccuracyPositionYTwo, 100, 100, 0, 2 * PI);
    }

    textSize(22);
    fill('Black');
    text(TestValueAccuracyTwo + "%", AccuracyPositionXTwo - 20, AccuracyPositionYTwo);

    textSize(22);
    fill('Black');
    text("Accuracy", AccuracyPositionXTwo - 50, AccuracyPositionYTwo - 120);
    
    //Second Circle Begins Here

    let SpeedPositionXTwo = 600;
    let SpeedPositionYTwo = 350;
  
    if (TestValueSpeedTwo < 50) {
        NewColorTwo = color(255, TestValueSpeedTwo / 100 * 255, 0);
    } else {
        NewColorTwo = color(255 - (TestValueSpeedTwo - 50) / 50 * 255, 255, 0);
    }

    if (TestValueSpeedTwo <= 99) {
        CircumferenceTwo = (TestValueSpeedTwo / 50 * PI) - HALF_PI;
        fill("Black");
        arc(SpeedPositionXTwo, SpeedPositionYTwo, 203, 203, -HALF_PI - 0.01, CircumferenceTwo + 0.01);
        fill(NewColorTwo);
        arc(SpeedPositionXTwo, SpeedPositionYTwo, 200, 200, -HALF_PI, CircumferenceTwo);
        fill("Black");
        arc(SpeedPositionXTwo, SpeedPositionYTwo, 103, 103, -HALF_PI - 0.01, CircumferenceTwo + 0.01);
        fill(BackgroundColorTwo);
        noStroke();
        arc(SpeedPositionXTwo, SpeedPositionYTwo, 100, 100, -HALF_PI - 0.03, CircumferenceTwo + 0.03);
    } else {
        fill("Black");
        arc(SpeedPositionXTwo, SpeedPositionYTwo, 203, 203, 0, 2 * PI);
        fill(NewColorTwo);
        arc(SpeedPositionXTwo, SpeedPositionYTwo, 200, 200, 0, 2 * PI);
        fill("Black");
        arc(SpeedPositionXTwo, SpeedPositionYTwo, 103, 103, 0, 2 * PI);
        fill(BackgroundColorTwo);
        noStroke();
        arc(SpeedPositionXTwo, SpeedPositionYTwo, 100, 100, 0, 2 * PI);
    }

    textSize(22);
    fill('Black');
    text(TestValueSpeedTwo + "%", SpeedPositionXTwo - 20, SpeedPositionYTwo);

    textSize(22);
    fill('Black');
    text("Speed", SpeedPositionXTwo - 30, SpeedPositionYTwo - 120);

    //Composite Circle Begins Here

    let CompositePositionXTwo = 400;
    let CompositePositionYTwo = 150;

    let TestValueCompositeTwo = (TestValueAccuracyTwo + TestValueSpeedTwo) / 2;

    if (TestValueCompositeTwo < 50) {
        NewColorTwo = color(255, TestValueCompositeTwo / 100 * 255, 0);
    } else {
        NewColorTwo = color(255 - (TestValueCompositeTwo - 50) / 50 * 255, 255, 0);
    }

    if (TestValueCompositeTwo <= 99) {
        CircumferenceTwo = (TestValueCompositeTwo / 50 * PI) - HALF_PI;
        fill("Black");
        arc(CompositePositionXTwo, CompositePositionYTwo, 203, 203, -HALF_PI - 0.01, CircumferenceTwo + 0.01);
        fill(NewColorTwo);
        arc(CompositePositionXTwo, CompositePositionYTwo, 200, 200, -HALF_PI, CircumferenceTwo);
        fill("Black");
        arc(CompositePositionXTwo, CompositePositionYTwo, 103, 103, -HALF_PI - 0.01, CircumferenceTwo + 0.01);
        fill(BackgroundColorTwo);
        noStroke();
        arc(CompositePositionXTwo, CompositePositionYTwo, 100, 100, -HALF_PI - 0.03, CircumferenceTwo + 0.03);
    } else {
        fill("Black");
        arc(CompositePositionXTwo, CompositePositionYTwo, 203, 203, 0, 2 * PI);
        fill(NewColorTwo);
        arc(CompositePositionXTwo, CompositePositionYTwo, 200, 200, 0, 2 * PI);
        fill("Black");
        arc(CompositePositionXTwo, CompositePositionYTwo, 103, 103, 0, 2 * PI);
        fill(BackgroundColorTwo);
        noStroke();
        arc(CompositePositionXTwo, CompositePositionYTwo, 100, 100, 0, 2 * PI);
    }

    textSize(22);
    fill('Black');
    text(TestValueCompositeTwo + "%", CompositePositionXTwo - 20, CompositePositionYTwo);

    textSize(22);
    fill('Black');
    text("Composite Score", CompositePositionXTwo - 70, CompositePositionYTwo - 120);

    if (!tryAgainButtonTwo) {
        tryAgainButtonTwo = createButton('Restart');
        tryAgainButtonTwo.position(370, 340);
        tryAgainButtonTwo.style('background-color', BackgroundColorTwo);
        tryAgainButtonTwo.style('border', 'none');
        tryAgainButtonTwo.mousePressed(resetGameTwo);
    } else {
        tryAgainButtonTwo.show();
    }
  
    text("Adjust Time", 350, 380);

    variableTimeDuration = Math.round(variableTimeDuration);

    if (!timeSlider) {
        timeSlider = createSlider(10, 120, 60);
        timeSlider.position(300, 400);
        timeSlider.style('width', 200 + 'px');
        timeSlider.input(updateTimeDuration);
    } else {
        timeSlider.show();
        timeSlider.position(300, 400);
    }
    text("Duration: " + variableTimeDuration, 350, 450);
}

function updateTimeDuration() {
    variableTimeDuration = this.value();
}
