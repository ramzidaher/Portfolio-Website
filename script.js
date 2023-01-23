/*****************************************
 **  Simple fullpage Parallax Scroll Effect
 **  with touch support
 **  https://codepen.io/franzk/pen/aNxQxP
 **
 **  based on work by Emily Hayman
 **  https://codepen.io/eehayman/pen/qdGZJr
 **
 *****************************************/

// ------------- VARIABLES ------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = $(".background").length;

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function wheelScroll(evt) {
  if (isFirefox) {
    //Set delta for Firefox
    delta = evt.detail * (-120);
  } else if (isIe) {
    //Set delta for IE
    delta = -evt.deltaY;
  } else {
    //Set delta for all other browsers
    delta = evt.wheelDelta;
  }
  if (ticking != true) {
    if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
      }
      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
}

function touchScroll(ts, te) {
  delta = te - ts;
  console.log('para');
  if (ticking != true) {
    if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
      }
      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
}

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
var ts;

//window.addEventListener(mousewheelEvent, _.throttle(wheelScroll, 60), false);
window.addEventListener(mousewheelEvent, $.throttle(60, wheelScroll), false);
window.addEventListener("touchstart", function(e) {
  ts = e.touches[0].clientY;
}, false);
window.addEventListener("touchend", function(e) {
  var te = e.changedTouches[0].clientY;
  touchScroll(ts, te);
}, false);

// ------------- SLIDE MOTION ------------- //
function nextItem() {
  var $previousSlide = $(".background").eq(currentSlideNumber - 1);
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
}

function previousItem() {
  var $currentSlide = $(".background").eq(currentSlideNumber);
  $currentSlide.removeClass("down-scroll").addClass("up-scroll");
}

// const btn = document.querySelector('button')
// const inputs = document.querySelector('form')
// btn.addEventListener('click',() => {
//   Email.send({
//     Host: "smtp.mailtrap.io",
//     Username: "ce5da0986d1422",
//     Password:"90145a70b0189c",
//     To: "ramzi.daher@gmail.com",
//     From: inputs.elements["email"].value,
//     Subject: "New Contact Form Enquiry",
//     Body: inputs.elements["message"].value + "<br>" + inputs.elements["name"].value + "<br>" + inputs.elements["phone"].value,
//     // Body: "worked"
//   }).then(msg=>alert("The email succefully sent"))

// })
// function sendEmail(){  
//   Email.send({
//       Host : "smtp.elasticemail.com",
//       Username : "ramzi.daher@gmail.com",
//       Password : "887601573B4B254A47088DE4321DBAE78243",
//       To : 'ramzi.j,daher@gmail.com',
//       From : input.elements["email"].value,
//       // From: "ramzi.daher@gmail.com",
//       Subject : "New Contact Form Enquiry",
//       Body : "And this is the body"
//   }).then(
//   message => alert(message)
//   );
// }


const btn = document.querySelector('button')
const inputs = document.querySelector('form')
btn.addEventListener('click', () => {
    const name = (inputs.elements["name"].value).trim()
    const email = (inputs.elements["email"].value).trim()
    const msg = (inputs.elements["message"].value.trim())
    const phone = (inputs.elements["phone"].value).trim()
    // if (!name.length > 0 || !email.length > 0 || !msg.length > 0 || !phone.length > 0) {
    //     alert("All fields are mandatory")
    //     return
    // }
  email.send({
        Host: "smtp.mailtrap.io",
        Username: "ce5da0986d1422",
        Password: "90145a70b0189c",
        To: "ramzi.daher@gmail.com",
        From: email,
        Subject: "Contact Us Query By the Customer",
        Body: msg + "<br>" + name + "<br>" + phone
    }).then(msg => alert("The email successfully sent"))
})


