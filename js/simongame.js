setInterval(function () {
    $('.square').height($('.square').width());
}, 100)

$('#all-tiles').css("pointer-events", "none");
var sequence = [];
var playerSequence = [];
var level = 0;

function sgStartGame() {
    $('#sg-button').prop('disabled', true)
    $('#sg-button').text("Starting.....")
    userGameID = JSON.parse(window.localStorage.getItem('AccountInfo')).Highscores[0]._id;
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://friesforguys-c324.restdb.io/rest/highscores/" + `${userGameID}`,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "602ac81a5ad3610fb5bb6085",
            "cache-control": "no-cache"
        }
    }).done(function (response) {
        simonGamesPlayed = response.SimonGameTotalPlayed
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "https://friesforguys-c324.restdb.io/rest/highscores/" + `${userGameID}`,
            "method": "PUT",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "602ac81a5ad3610fb5bb6085",
                "cache-control": "no-cache"
            },
            "data": JSON.stringify({
                SimonGameTotalPlayed: Number(simonGamesPlayed + 1)
            })
        }).done(function (response) {
            $('#sg-button').css('opacity', 0);
            nextRound();
        });
    });
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
    if (playerSequence[index] !== sequence[index]) {
        alert('You pressed the wrong tile, gameover!'); userGameID = JSON.parse(window.localStorage.getItem('AccountInfo')).Highscores[0]._id;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "https://friesforguys-c324.restdb.io/rest/highscores/" + `${userGameID}`,
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "602ac81a5ad3610fb5bb6085",
                "cache-control": "no-cache"
            }
        }).done(function (response) {
            simonGamesHigh = response.SimonGameHighScore
            if (level - 1 > simonGamesHigh) {
                $('#sg-button').text('Updating..')
                $('#sg-button').css('opacity', 1)
                $.ajax({
                    "async": true,
                    "crossDomain": true,
                    "url": "https://friesforguys-c324.restdb.io/rest/highscores/" + `${userGameID}`,
                    "method": "PUT",
                    "headers": {
                        "content-type": "application/json",
                        "x-apikey": "602ac81a5ad3610fb5bb6085",
                        "cache-control": "no-cache"
                    },
                    "data": JSON.stringify({
                        SimonGameHighScore: Number(level - 1)
                    })
                }).done(function (response) {
                    sequence = [];
                    playerSequence = [];
                    level = 0;
                    $('#sg-button').text('Restart')
                    $('#sg-button').prop('disabled', false)
                    $('#round-info').text('Round 0');
                    $('#all-tiles').css("pointer-events", "none");
                    return;
                });
            }
            else {
                sequence = [];
                playerSequence = [];
                level = 0;
                $('#sg-button').prop('disabled', false)
                $('#sg-button').text('Restart')
                $('#sg-button').css('opacity', 1)
                $('#round-info').text('Round 0');
                $('#all-tiles').css("pointer-events", "none");
                return;
            }
        });
    }
    else if (playerSequence.length === sequence.length) {
        playerSequence = [];
        $('#round-info').text(`Round ${level} | Level Done!`);
        setTimeout(() => {
            nextRound();
        }, 1000);
        return;
    }
    else {
        $('#round-info').text(`Round ${level} | Tiles Left: ${remainingTaps}`);
    }
}