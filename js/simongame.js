setInterval(function(){
    $('.square').height($('.square').width());
}, 100)

let sequence = [];
let playerSequence = [];

function sgStartGame() {
    $('#sg-button').prop('disabled', true)
    $('#sg-button').text("Starting.....")
    setTimeout(() => {
        $('#sg-button').css('opacity', 0)
    }, 1000);
}