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
    $('#round-info').text(`Round ${level}`);

    let nextSequence = [...sequence];
    nextSequence.push(nextTile());
}

function nextTile() {
    const tileList = ['red', 'green', 'blue', 'yellow'];
    const randomTile = tileList[Math.floor(Math.random() * tiles.length)];

    return randomTile;
}