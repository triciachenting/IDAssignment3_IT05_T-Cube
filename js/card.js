// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];

// deck of all cards in game
const deck = document.getElementById("cards-in-deck");

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

// stars list
let starsList = document.querySelectorAll(".stars li");

const stars = document.querySelectorAll(".fa-star");
// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

//array for opened cards
var openedCards = [];

//opens and shows cards
var cardDisplay = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
}

//add openedcards to list and check if cards are matched or not
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if (len === 2) {
        moveCounter();
        if (openedCards[0].type === openedCards[1].type) {
            matched();
        } else {
            unmatched();
        }
    }
};

//cards match
function matched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}

//cards don't match
function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function () {
        openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
        openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
        enable();
        openedCards = [];
    }, 1100);
}

//disable cards
function disable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('disabled');
    });
}

//enable cards and diable matched cards ??
function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}

// count number of moves
function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 8 && moves < 12) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

//game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

//shuffle cards
function shuffle(array) {
    var current = array.length, temp, random;

    while (current !== 0) {
        random = Math.floor(Math.random() * current);
        current -= 1;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
};

//shuffles cards when reloaded
document.body.onload = startGame();

//RestDB Update
function startGame() {
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
        cardGamesPlayed = response.CardGameTotalPlayed
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
                CardGameTotalPlayed: Number(cardGamesPlayed + 1)
            })
        }).done(function (response) {
            startGame2();
        });
    });
}
//function to start a game
function startGame2() {
    // empty the array for opened cards
    openedCards = [];

    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function (item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.color = "yellow";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

//replay
function playAgain() {
    modal.classList.remove("show");
    startGame2();
}

function congratulations() {
    if (matchedCard.length == 16) {
        clearInterval(interval);
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
            cardGamesHigh = response.CardGameHighScore
            if (moves < cardGamesHigh || cardGamesHigh == 0) {
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
                        CardGameHighScore: Number(moves)
                    })
                }).done(function (response) {
                    console.log("Uploaded")
                });
            }
        });
    };
}
//add event listeners to each card
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", cardDisplay);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
};
