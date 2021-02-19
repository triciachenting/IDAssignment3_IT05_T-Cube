setInterval(function () {
    $('.square').height($('.square').width());
}, 100)

var sequence = [];
var playerSequence = [];
var level = 0;

function sgStartGame() {
    $('#sg-button').prop('disabled', true)
    $('#sg-button').text("Starting.....")
    setTimeout(() => {
        $('#sg-button').css('opacity', 0)
        nextRound();
    }, 1000);
}

function nextRound() {
    level += 1;
    $('#all-tiles').css("pointer-events", "none");
    $('#round-info').text(`Round ${level} | Tiles Left: ${level}`);

    let nextSequence = [...sequence];
    nextSequence.push(nextTile());
    playRound(nextSequence);

    sequence = [...nextSequence];
    setTimeout(() => {
        $('#all-tiles').css("pointer-events", "auto");
    }, level * 600 + 1000);
}

const tileList = ['red', 'green', 'blue', 'yellow'];

function nextTile() {
    const randomTile = tileList[Math.floor(Math.random() * tileList.length)];

    return randomTile;
}

var redSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var greenSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var blueSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var yellowSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

const soundList = [redSound, greenSound, blueSound, yellowSound];

function activateTile(color) {
    index = tileList.indexOf(color)
    const tile = $(`.tile-${color}`);
    const sound = soundList[index];

    tile.addClass('tile-activated');
    sound.play();

    setTimeout(() => {
        tile.removeClass('tile-activated');
    }, 300);
}

function playRound(nextSequence) {
    nextSequence.forEach((color, index) => {
        setTimeout(() => {
            activateTile(color);
        }, (index + 1) * 600);
    });
}

function activate(tileIndex) {
    const index = playerSequence.push(tileList[tileIndex]) - 1;
    soundList[tileIndex].play();

    const remainingTaps = sequence.length - playerSequence.length;

    if (playerSequence.length === sequence.length) {
        playerSequence = [];
        $('#round-info').text(`Round ${level} | Level Done!`);
        setTimeout(() => {
            nextRound();
        }, 1000);
        return;
    }
    $('#round-info').text(`Round ${level} | Tiles Left: ${remainingTaps}`);
}