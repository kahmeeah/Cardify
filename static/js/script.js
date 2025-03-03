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

    // SHAPE OPTION BUTTON
       const shape = document.querySelector('#shape');
        if (shape){
            shape.addEventListener('click', () =>{
                console.log("shape clicked")
                options.innerHTML = '';

                // const heart = document.createElement

                // Create the SVG element dynamically
                const starSVG = createSVG('star', '../static/images/cardify-shapes.svg#star')
                options.appendChild(starSVG);

                const heartSVG = createSVG('heart', '../static/images/cardify-shapes.svg#heart')
                options.appendChild(heartSVG);

                const cloverSVG = createSVG('clover', '../static/images/cardify-shapes.svg#clover')
                options.appendChild(cloverSVG);

                const flowerSVG = createSVG('flower', '../static/images/cardify-shapes.svg#flower')
                options.appendChild(flowerSVG);

            })
        }

        const color = document.querySelector('#color');

        const date = document.querySelector('#date');
        if (date){
            date.addEventListener('click', () => {
                console.log("date clicked")
                options.innerHTML = '';

                const dateWeeks = createDateButton("Past 4 Weeks", "short")
                options.appendChild(dateWeeks)

                const dateYear = createDateButton("Past Year", "medium")
                options.appendChild(dateYear)

                const dateLifetime = createDateButton("Lifetime", "long")
                options.appendChild(dateLifetime)
            })
        }
        //lifetime
        //past 4 wks
        //past yr
        //
        // .bc-para{
        //     font-family: Arial, Helvetica, sans-serif;
        //     text-transform: capitalize;
        //     font-size: 14px;
        //     line-height: 1;
        //     font-weight: 100;
        //     letter-spacing: -1px;
        //   }

       

        }
    })
}

function createSVG(id, href) {
    // Create the SVG element dynamically
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("class", "option-item svg-buttons");
    svg.setAttribute("id", id);

    // Create the <use> element
    const use = document.createElementNS(svgNamespace, "use");
    use.setAttribute("href", href);

    // Append the <use> element to the SVG
    svg.appendChild(use);

    return svg;
}

function createDateButton(datevar, timeframe){

    const dateButton = document.createElement("button")
    dateButton.textContent = datevar
    dateButton.classList.add("dateBtn")

    dateButton.addEventListener("click", () => {
        sendDataToFlask(timeframe);
    })
    return dateButton
}

function sendDataToFlask(timeframe) {
    fetch('/set_time', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ time: timeframe })
    })
    .then(response => response.json())
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