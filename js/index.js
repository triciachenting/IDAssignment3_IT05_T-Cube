tagNoAccount = '<a class="nav-link" href="signin.html">Sign In</a>\
                    <a class="nav-link" href="signup.html">Sign Up</a>';
tagWithAccount = '<a class="nav-link" href="cardmemory.html">Card Memory</a>\
                    <a class="nav-link" href="simongame.html">Simons Game</a>\
                    <a class="nav-link" href="#" onclick="logout();">Log Out</a>';
tagOriginal = $('.index-nav-list').html();

mainNoAccount = '<h1 class="cover-heading">Memory Games</h1>\
                <p class="lead">A simple page with two memory games.</p>\
                <p class="lead">\
                    <a href="signin.html" class="btn btn-lg btn-secondary">Sign In</a>\
                    <a href="signup.html" class="btn btn-lg btn-secondary">Sign Up</a>\
                </p>\
                <a href="#"><u>Continue as a guest.</u></a>'

mainWithAccount = '<h1 class="cover-heading">Memory Games</h1>\
                <p class="lead">The two memory games.</p>\
                <p class="lead">\
                    <a href="cardmemory.html" class="btn btn-lg btn-secondary">Card Memory</a>\
                    <a href="simongame.html" class="btn btn-lg btn-secondary">Simons Game</a>\
                </p>'

function checkLocalStorage() {
    if (window.localStorage.getItem('AccountInfo')) {
        $('.index-nav-list').html(tagOriginal + tagWithAccount);
        $('.index-main').html(mainWithAccount);
    } else {
        $('.index-nav-list').html(tagOriginal + tagNoAccount);
        $('.index-main').html(mainNoAccount);
    }
}

function logout() {
    window.localStorage.removeItem('AccountInfo');
    alert('You have successfully logged out!');
    location.replace('../html/index.html');
}