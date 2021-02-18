tagNoAccount = '<a class="nav-link" href="signin.html">Sign In</a>\
                    <a class="nav-link" href="signup.html">Sign Up</a>';
tagWithAccount = '<a class="nav-link" href="cardmemory.html">Card Memory</a>\
                    <a class="nav-link" href="simongame.html">Simons Game</a>\
                    <a class="nav-link" href="#" onclick="logout();">Log Out</a>';
tagOriginal = $('.index-nav-list').html();

function checkLocalStorage() {
    if (window.localStorage.getItem('AccountInfo')) {
        $('.index-nav-list').html(tagOriginal + tagWithAccount);
    } else {
        $('.index-nav-list').html(tagOriginal + tagNoAccount);
    }
}

function logout(){
    window.localStorage.removeItem('AccountInfo');
    alert('You have successfully logged out!');
    location.reload();
}