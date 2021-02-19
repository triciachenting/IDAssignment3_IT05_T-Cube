setInterval(function(){
    $('.square').height($('.square').width());
}, 100)

let sequence = [];
let playerSequence = [];
let level = 0;

function sgStartGame() {
    $('#sg-button').prop('disabled', true)
    $('#sg-button').text("Starting.....")
    setTimeout(() => {
        $('#sg-button').css('opacity', 0)
        nextRound();
    }, 1000);
}

function nextRound(){
    level += 1;
    $('#all-tiles').css("pointer-events", "none");
    $('#round-info').text(`Round ${level}`);
}