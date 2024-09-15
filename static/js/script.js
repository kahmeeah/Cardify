/* TO-DO: 

* add button for range

* user select custom themes

* user download screencap of id cards


*/


// #region login button
var loginBtn = document.getElementById('loginBtn');
const loader = document.querySelector('.loader');
const maincontainer = document.querySelector('.main-container');
if (loader){
loader.style.visibility='hidden';
}
if (loginBtn){
    var isLoggedIn = loginBtn.getAttribute('data-isloggedin');
    var loginRoute = loginBtn.getAttribute('data-login-route');
    var genRoute = loginBtn.getAttribute('data-gen-route');
    loginBtn.innerText = 'Login with Spotify';

    if (isLoggedIn === 'true') {
        loginBtn.innerText = 'Generate';
        loginBtn.addEventListener('click', function() {
            maincontainer.style.visibility='hidden';
            loader.style.visibility='visible';
            window.location.href = genRoute;

        });
    } else {
    
    loginBtn.addEventListener('click', function() {
        window.location.href = loginRoute;
    });}
}
// #endregion


 // #region get the current/future date
 var currentDate = document.querySelector("#currentDate");
 if (currentDate){
    var today = new Date();
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var formattedDate = today.getDate().toString().padStart(2, '0') + ' ' + monthNames[today.getMonth()] + ' ' + today.getFullYear();
    // console.log(formattedDate);
    currentDate.textContent = formattedDate;
 }

 var futureDate = document.querySelector("#futureDate");
 if (futureDate){
    var today = new Date();
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var formattedDate = today.getDate().toString().padStart(2, '0') + ' ' + monthNames[today.getMonth()] + ' 20XX';
    // console.log(formattedDate);
    futureDate.textContent = formattedDate;
 }


 // #endregion

// #region cards onclick
const frontcard = document.querySelector('.card-background-front');
const backcard = document.querySelector('.card-background-back');


if (frontcard&&backcard){
frontcard.addEventListener('click', () => {
    frontcard.classList.remove('front-animation'); // remove existing class first
    void frontcard.offsetWidth; // trigger reflow (forces the browser to repaint)
    frontcard.classList.add('front-animation');
    frontcard.style.zIndex='200';
    backcard.style.zIndex='0';
})



backcard.addEventListener('click', () => {
    backcard.classList.remove('back-animation'); // remove existing class first
    void backcard.offsetWidth; // trigger reflow (forces the browser to repaint)
    backcard.classList.add('back-animation');
    backcard.style.zIndex='200';
    frontcard.style.zIndex='0';
})
}


// #endregion


// #region setting/options buttons

const cog = document.querySelector('.cog')
const options = document.querySelector('#hidden-options')
options.style.visibility='hidden'

if (cog){

    cog.addEventListener('click', () => {
        if (options.style.visibility=='visible'){
            options.style.visibility='hidden'

        } else{
       options.style.visibility='visible'

        }

    })
}

// #endregion