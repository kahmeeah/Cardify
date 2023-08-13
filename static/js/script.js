/* TO-DO: 

* add button for range

* user select custom themes

* user download screencap of id cards


*/


// #region login button
var loginBtn = document.getElementById('loginBtn');
if (loginBtn){
    var isLoggedIn = loginBtn.getAttribute('data-isloggedin');
    var loginRoute = loginBtn.getAttribute('data-login-route');
    var genRoute = loginBtn.getAttribute('data-gen-route');
    loginBtn.innerText = 'Login with Spotify';

    if (isLoggedIn === 'true') {
        loginBtn.innerText = 'Generate';
        loginBtn.addEventListener('click', function() {
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
    console.log(formattedDate);
    currentDate.textContent = formattedDate;
 }

 var futureDate = document.querySelector("#futureDate");
 if (futureDate){
    var today = new Date();
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var formattedDate = today.getDate().toString().padStart(2, '0') + ' ' + monthNames[today.getMonth()] + ' 20XX';
    console.log(formattedDate);
    futureDate.textContent = formattedDate;
 }


 // #endregion

 