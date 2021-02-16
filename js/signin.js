//Sign In Function
function signinGetValue() {
    var signupUsername = document.getElementById("si-username").value.toUpperCase();
    var signupPassword = document.getElementById("si-password").value;
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
                        //Redirect to game website.
                    }, 1000);
                    break;
                } else if ((i + 1) == response.length) {
                    setTimeout(function () {
                        //#TODO: Alert user does not exist
                        alert("Account does not exist!");
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

//Clear Local Storage on Load
function clearLocalData() {
    window.localStorage.clear();
}