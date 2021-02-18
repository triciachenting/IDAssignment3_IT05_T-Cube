//Sign Up Function
function signupGetValue() {
    document.getElementById('su-button').disabled = true;
    var signupUsername = document.getElementById("su-username").value.toUpperCase();
    var signupPassword = document.getElementById("su-password").value;
    var signupPasswordConfirmation = document.getElementById("su-password2").value;
    if (signupUsername == "") {
        $('#su-username').addClass('is-invalid');
        $('.su-username-if').text('Username cannot be empty!');
        currentUsername = signupUsername;
        var checkUsername = setInterval(function () {
            if (document.getElementById("su-username").value.toUpperCase() != currentUsername) {
                $('#su-username').removeClass('is-invalid');
                $('.su-username-if').text('');
                document.getElementById('su-button').disabled = false;
                clearInterval(checkUsername);
            }
        }, 100);
    }
    if (signupPassword == "") {
        $('#su-password').addClass('is-invalid');
        $('#su-password2').addClass('is-invalid');
        $('.su-password-if').text('Password cannot be empty!');
        currentPassword = signupPassword;
        var checkPassword = setInterval(function () {
            if (document.getElementById("su-password").value.toUpperCase() != currentPassword) {
                $('#su-password').removeClass('is-invalid');
                $('.su-password-if').text('');
                document.getElementById('su-button').disabled = false;
                clearInterval(checkPassword);
            }
        }, 100);
    }
    else if (signupPasswordConfirmation == "") {
        $('#su-password2').addClass('is-invalid');
        $('.su-password2-if').text('Retype password again!');
        currentPassword2 = signupPasswordConfirmation;
        var checkPassword = setInterval(function () {
            if (document.getElementById("su-password2").value.toUpperCase() != currentPassword2) {
                $('#su-password').removeClass('is-invalid');
                $('.su-password-if').text('');
                document.getElementById('su-button').disabled = false;
                clearInterval(checkPassword);
            }
        }, 100);
    }
    if (signupUsername != "" && signupPassword != "" && signupPasswordConfirmation != "") {
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
                        currentUsername = signupUsername;
                        $('#su-username').addClass('is-invalid');
                        $('.su-username-if').text('Username is already taken!');
                        var checkUsername = setInterval(function () {
                            if (document.getElementById("su-username").value.toUpperCase() != currentUsername) {
                                $('#su-username').removeClass('is-invalid');
                                document.getElementById('su-button').disabled = false;
                                clearInterval(checkUsername);
                            }
                        }, 100);
                        checkCPassword(signupPassword, signupPasswordConfirmation);
                        break;
                    }
                    if (i + 1 == response.length) {
                        if (checkCPassword(signupPassword, signupPasswordConfirmation)) {
                            createNewAccount(signupUsername, signupPassword);
                        }
                    }
                }
            } else {
                if (checkCPassword(signupPassword, signupPasswordConfirmation)) {
                    createNewAccount(signupUsername, signupPassword);
                }
            }
        });
    }
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

//Check password confirmation
function checkCPassword(signupPassword, signupPasswordConfirmation) {
    if (signupPassword != signupPasswordConfirmation) {
        $('#su-password').addClass('is-invalid');
        $('#su-password2').addClass('is-invalid');
        $('.su-password2-if').text('Password does not match!');
        var checkPassword = setInterval(function () {
            if (document.getElementById("su-password2").value != signupPasswordConfirmation) {
                $('#su-password').removeClass('is-invalid');
                $('#su-password2').removeClass('is-invalid');
                document.getElementById('su-button').disabled = false;
                clearInterval(checkPassword);
            }
        }, 100);
        return false;
    }
    else {
        return true;
    }
}

function checkLocalStorage(){
    if (window.localStorage.getItem('AccountInfo')){
        window.location.replace('../html/index.html');
    }
}