//Sign Up Function
function signupGetValue() {
    var signupUsername = document.getElementById("su-username").value.toUpperCase();
    var signupPassword = document.getElementById("su-password").value;
    var signupPasswordConfirmation = document.getElementById("su-password2").value;
    if (signupPassword != signupPasswordConfirmation){
        // #TODO: Alert user if password does not match (without alert)
        alert("Password does not match!");
        return;
    }
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://friesforguys-c324.restdb.io/rest/accounts",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "602ac81a5ad3610fb5bb6085",
            "cache-control": "no-cache"
        }
    }).done(function (response) {
        if (response.length != 0) {
            for (i = 0; i < response.length; i++) {
                if (signupUsername == response[i].Username) {
                    // #TODO: Change if username exist.
                    alert("Username already exist!")
                    break;
                }
                if (i + 1 == response.length) {
                    createNewAccount(signupUsername, signupPassword);
                }
            }
        } else {
            createNewAccount(signupUsername, signupPassword);
        }
    });
}

//Creates a new account
function createNewAccount(signupUsername, signupPassword) {
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://friesforguys-c324.restdb.io/rest/highscores",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "602ac81a5ad3610fb5bb6085",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify({
            CardGameHighScore: 0,
            SimonGameHighScore: 0,
            CardGameTotalPlayed: 0,
            SimonGameTotalPlayed: 0
        })
    }).done(function (response) {
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "https://friesforguys-c324.restdb.io/rest/accounts",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "602ac81a5ad3610fb5bb6085",
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify({
                Username: signupUsername,
                Password: signupPassword,
                Highscores: response._id
            })
        }).done(function (response) {
            for (i = 0; i < response.length; i++) {
                if (signupUsername == response[i].Username && encryptedPassword == response[i].AccountDetails[0].Password) {
                    window.localStorage.setItem("AccountInfo", JSON.stringify(response[i]));
                    setTimeout(function () {
                        //#TODO: Redirect to game site.
                    }, 1000);
                }
            }
        })
    })
}

//Clear Local Storage on Load
function clearLocalData() {
    window.localStorage.clear();
}