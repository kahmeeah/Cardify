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
const originalOptions = options.innerHTML;
options.style.visibility='hidden'

if (cog){

    cog.addEventListener('click', () => {
        console.log("cog clicked")
        if (options.style.visibility==='visible'){
            options.style.visibility='hidden'
            options.innerHTML = originalOptions;

        } else{

        options.style.visibility='visible'

        const shortRangeBtn = document.querySelector('#short')
        const mediumRangeBtn = document.querySelector('#medium')
        const longRangeBtn = document.querySelector('#long')

        shortRangeBtn.addEventListener("click", () => {
            sendDataToFlask("short")
        })
        mediumRangeBtn.addEventListener("click", () => {
            sendDataToFlask("medium")
        })
        longRangeBtn.addEventListener("click", () => {
            sendDataToFlask("long")
        })

        }
    })
}


 
function sendDataToFlask(timeframe) {
    fetch('/set_time', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ time: timeframe })
    })
    .then(() => fetch('/api/card_data'))
    .then(res => res.json())
    .then(data => {

        const topGenres = document.querySelector('#top-genres');
        if (topGenres) topGenres.innerText = data.top_genres;

        const obscurity = document.querySelector('#obscurity');
        if (obscurity) obscurity.innerText = `Your songs are ${data.obscurity_lvl}% obscure`;

        const favArtists = document.querySelector('#fav-artists');
        if (favArtists) {
            const names = data.top_artists.map(a => a.name).join(', ');
            favArtists.innerText = names; }

        const trackImg = document.querySelector('#top-track-img');
        if (trackImg) trackImg.src = data.top_track.album_image;

        const trackName = document.querySelector('#top-track-name');
        if (trackName) trackName.innerText = data.top_track.name;

        const trackArtist = document.querySelector('#top-track-artist');
        if (trackArtist) trackArtist.innerHTML = `by <i>${data.top_track.artists[0]}</i>`;

        const timeframeName = document.querySelector('#timeframe-heading');
        if (timeframeName) timeframeName.innerHTML = data.timeframe_name;

    })
    .catch(error => console.error("Error:", error));
}



// when cog/option shape is clicked
// remove all elememts in hidden options
// add several new option buttons
// these option buttons will do different things


// shapefunc(shape)
// datefunc (date)
// colorfunc (color)


//for the shapefunc
// when shape is clicked, a shape variable is set
// variable will change js---js will remove the existing shapes on the page
//      & replace them with new divs containing the new shape
//or: use js to update the existing divs w new class - that class will contain the svg?

//for the datefunc
// when date variable is clicked
// it will be sent to flask/backend so it can all the api accordingly, that new info is sent to frontend html
// js will remove&replace the existing text div on page to say wtv unless this can be done using spotifys api

//for the colorfunc
//create css variables for the colors
// update/set the variable dynamically from js


// #endregion