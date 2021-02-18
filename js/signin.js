//Sign In Function
function signinGetValue() {
    $('p.si-invalid').css("opacity", 0);
    document.getElementById('si-button').disabled = true;
    var signupUsername = document.getElementById("si-username").value.toUpperCase();
    var signupPassword = document.getElementById("si-password").value;
    if (signupUsername == "") {
        $('#si-username').addClass('is-invalid');
        $('.si-username-if').text('Username cannot be empty!');
        currentUsername = signupUsername;
        var checkUsername = setInterval(function () {
            if (document.getElementById("si-username").value.toUpperCase() != currentUsername) {
                $('#si-username').removeClass('is-invalid');
                $('.si-username-if').text('');
                document.getElementById('si-button').disabled = false;
                clearInterval(checkUsername);
            }
        }, 100);
    }
    if (signupPassword == "") {
        $('#si-password').addClass('is-invalid');
        $('.si-password-if').text('Password cannot be empty!');
        currentPassword = signupPassword;
        var checkPassword = setInterval(function () {
            if (document.getElementById("si-password").value.toUpperCase() != currentPassword) {
                $('#si-password').removeClass('is-invalid');
                $('.si-password-if').text('');
                document.getElementById('si-button').disabled = false;
                clearInterval(checkPassword);
            }
        }, 100);
    }
    if (signupUsername != "" && signupPassword != "") {
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
                    if (signupUsername == response[i].Username && signupPassword == response[i].Password) {
                        window.localStorage.setItem("AccountInfo", JSON.stringify(response[i]));
                        setTimeout(function () {
                            window.location.replace('../html/index.html');
                        }, 1000);
                        break;
                    } else if ((i + 1) == response.length) {
                        setTimeout(function () {
                            $('#si-username').addClass('is-invalid');
                            $('#si-password').addClass('is-invalid');
                            $('p.si-invalid').css("opacity", 1);
                            currentUsername = signupUsername;
                            currentPassword = signupPassword;
                            var checkBoth = setInterval(function () {
                                if (document.getElementById("si-username").value.toUpperCase() != currentUsername || document.getElementById("si-password").value != currentPassword) {
                                    $('#si-username').removeClass('is-invalid');
                                    $('#si-password').removeClass('is-invalid');
                                    document.getElementById('si-button').disabled = false;
                                    clearInterval(checkBoth);
                                }
                            }, 100);
                        }, 1000);
                    }
                }
            }
            else {
                //#TODO: No accounts exist
                alert("No accounts currently exist.");
            }
        });
    }
}

function checkLocalStorage(){
    if (window.localStorage.getItem('AccountInfo')){
        window.location.replace('../html/index.html');
    }
}