function checkLocalStorageAccount() {
    if (window.localStorage.getItem('AccountInfo')) {
        checkLiveData();
        username = JSON.parse(window.localStorage.getItem('AccountInfo')).Username;
        tagWithAccount = `<a class="nav-link" href="cardmemory.html">Card Memory</a>\
                    <a class="nav-link" href="simongame.html">Simons Game</a>\
                    <a class="nav-link active" href="#">Account(${username})</a>\
                    <a class="nav-link" href="#" onclick="logout();">Log Out</a>`;
        tagOriginal = $('.accountdetails-nav-list').html();
        $('.accountdetails-nav-list').html(tagOriginal + tagWithAccount);
        mainHTML = '<div class="d-flex row mx-auto justify-content-center">\
                        <div class="col-sm-3 d-flex flex-column" id="scoreContainer" style="border: 4px solid black; background-color: rgb(223, 223, 223, 1); border-radius: 40px; color: black; ">\
                            <div class="score-item" style="margin-top: 10px;"><strong>Card Memory</strong></div>\
                            <div class="score-item">Games Played:</div>\
                            <div class="score-item" id="cgtp">Loading Data...</div>\
                            <div class="score-item">High Score:</div>\
                            <div class="score-item" id="cghs">Loading Data...</div>\
                        </div>\
                        <div class="col-sm-1" style="background-color: transparent; height: 10px;"></div>\
                        <div class="col-sm-3 d-flex flex-column" id="scoreContainer" style="background-color: black; border: 2px solid rgb(223, 223, 223, 1); border-radius: 40px;">\
                            <div class="score-item" style="margin-top: 10px;"><strong>Simons Game</strong></div>\
                            <div class="score-item">Games Played:</div>\
                            <div class="score-item" id="sgtp">Loading Data...</div>\
                            <div class="score-item">High Score:</div>\
                            <div class="score-item" id="sghs">Loading Data...</div>\
                        </div>\
                    </div>';

        $('.accountdetails-main').html(mainHTML)

        $('#scoreContainer').height($('#scoreContainer').width())
        $('.score-item').height($('#scoreContainer').width() / 5)
        setInterval(function () {
            $('.score-item').css('font-size', $('#scoreContainer').width() / 10);
        }, 100)
    } else {
        alert("You need to be logged in to see your profile!");
        location.replace("../html/index.html");
    }
}

var checkLiveData = function () {
    setInterval(() => {
        if (!window.localStorage.getItem('AccountInfo')) {
            location.reload();
        }
        else {
            userID = ""
            userID = JSON.parse(window.localStorage.getItem('AccountInfo'))._id;
            $.ajax({
                "async": true,
                "crossDomain": true,
                "url": "https://friesforguys-c324.restdb.io/rest/accounts/" + `${userID}`,
                "method": "GET",
                "headers": {
                    "content-type": "application/json",
                    "x-apikey": "602ac81a5ad3610fb5bb6085",
                    "cache-control": "no-cache"
                }
            }).done(function (response) {
                window.localStorage.removeItem('AccountInfo');
                window.localStorage.setItem('AccountInfo', JSON.stringify(response));
                $('#cgtp').text(response.Highscores[0].CardGameTotalPlayed);
                $('#cghs').text(response.Highscores[0].CardGameHighScore + " moves");
                $('#sgtp').text(response.Highscores[0].SimonGameTotalPlayed);
                $('#sghs').text("Level " + response.Highscores[0].SimonGameHighScore);
            });
        }
    }, 2000);
}