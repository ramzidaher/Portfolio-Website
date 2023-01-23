// ------------- VARIABLES ------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive) 
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = $(".background").length;

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScroll(evt) {
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

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

// var touchEvent = isFirefox ? "touchstart" : "touchmove" ;
// window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);
//  window.addEventListener('scroll', parallaxScroll(evt){
  
//  }

 
// ------------- SLIDE MOTION ------------- //
function nextItem() {
  var $previousSlide = $(".background").eq(currentSlideNumber - 1);
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
}

function previousItem() {
  var $currentSlide = $(".background").eq(currentSlideNumber);
  $currentSlide.removeClass("down-scroll").addClass("up-scroll");
}



// // ------------- VARIABLES ------------- //
// var ticking = false;
// var isFirefox = (/Firefox/i.test(navigator.userAgent));
// var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
// var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive) 
// var slideDurationSetting = 600; //Amount of time for which slide is "locked"
// var currentSlideNumber = 0;
// var totalSlideNumber = $(".background").length;

// // ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
// function parallaxScroll(evt) {
//   if (isFirefox) {
//     //Set delta for Firefox
//     delta = evt.detail * (-120);
//   } else if (isIe) {
//     //Set delta for IE
//     delta = -evt.deltaY;
//   } else {
//     //Set delta for all other browsers
//     delta = evt.wheelDelta;
//   }

//   if (ticking != true) {
//     if (delta <= -scrollSensitivitySetting) {
//       //Down scroll
//       ticking = true;
//       if (currentSlideNumber !== totalSlideNumber - 1) {
//         currentSlideNumber++;
//         nextItem();
//       }
//       slideDurationTimeout(slideDurationSetting);
//     }
//     if (delta >= scrollSensitivitySetting) {
//       //Up scroll
//       ticking = true;
//       if (currentSlideNumber !== 0) {
//         currentSlideNumber--;
//       }
//       previousItem();
//       slideDurationTimeout(slideDurationSetting);
//     }
//   }
// }

// // ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
// function slideDurationTimeout(slideDuration) {
//   setTimeout(function() {
//     ticking = false;
//   }, slideDuration);
// }

// // ------------- ADD EVENT LISTENER ------------- //
// var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
// var touchEvent = isFirefox ? "touchstart" : "touchmove" ;
// window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);
// window.addEventListener(touchEvent, _.throttle(parallaxScroll, 60), false);
// // window.addEventListener("touchmove", _.throttle(parallaxScroll, 60), false);
// // ------------- SLIDE MOTION ------------- //
// function nextItem() {
//   var $previousSlide = $(".background").eq(currentSlideNumber - 1);
//   $previousSlide.removeClass("up-scroll").addClass("down-scroll");
// }

// function previousItem() {
//   var $currentSlide = $(".background").eq(currentSlideNumber);
//   $currentSlide.removeClass("down-scroll").addClass("up-scroll");
// }

// // $(document.body).on(mousewheelEvent, parallaxScroll(60)); // for mobile
// // $(window).on('touch', parallaxScroll(60)); 

// // callback


// var TxtType = function(el, toRotate, period) {
//   this.toRotate = toRotate;
//   this.el = el;
//   this.loopNum = 0;
//   this.period = parseInt(period, 10) || 2000;
//   this.txt = '';
//   this.tick();
//   this.isDeleting = false;
// };

// TxtType.prototype.tick = function() {
//   var i = this.loopNum % this.toRotate.length;
//   var fullTxt = this.toRotate[i];

//   if (this.isDeleting) {
//   this.txt = fullTxt.substring(0, this.txt.length - 1);
//   } else {
//   this.txt = fullTxt.substring(0, this.txt.length + 1);
//   }

//   this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

//   var that = this;
//   var delta = 200 - Math.random() * 100;

//   if (this.isDeleting) { delta /= 2; }

//   if (!this.isDeleting && this.txt === fullTxt) {
//   delta = this.period;
//   this.isDeleting = true;
//   } else if (this.isDeleting && this.txt === '') {
//   this.isDeleting = false;
//   this.loopNum++;
//   delta = 500;
//   }

//   setTimeout(function() {
//   that.tick();
//   }, delta);
// };

// window.onload = function() {
//   var elements = document.getElementsByClassName('typewrite');
//   for (var i=0; i<elements.length; i++) {
//       var toRotate = elements[i].getAttribute('data-type');
//       var period = elements[i].getAttribute('data-period');
//       if (toRotate) {
//         new TxtType(elements[i], JSON.parse(toRotate), period);
//       }
//   }
//   // INJECT CSS
//   var css = document.createElement("style");
//   css.type = "text/css";
//   css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
//   document.body.appendChild(css);
// };

// $( window ).resize(function() {
//   $window = $(window);
//   if( $window .width() < 1000){
  
//    $('section[data-type="background"]').each(function(){
//    var $bgobj = $(this); // assigning the object
  
//     $(window).scroll(function() {
  
//       // Scroll the background at var speed
//       // the yPos is a negative value because we're scrolling it UP!                              
//       var yPos = -( ($window.scrollTop() - $bgobj.offset().top) / $bgobj.data('speed'));
  
//       // Put together our final background position
//       var coords = '50% '+ yPos + 'px';
  
//       // Move the background
//       $bgobj.css({ backgroundPosition: coords });
  
//    }); // window scroll Ends
  
//    });    
//   }
//   });
  
  
  
//   $(document).ready(function(){
//   $window = $(window);
//   if( $window.width() > 800){
//   // Cache the Window object
  
//    $('section[data-type="background"]').each(function(){
//    var $bgobj = $(this); // assigning the object
  
//     $(window).scroll(function() {
  
//       // Scroll the background at var speed
//       // the yPos is a negative value because we're scrolling it UP!                              
//       var yPos = -( ($window.scrollTop() - $bgobj.offset().top) / $bgobj.data('speed'));
  
//       // Put together our final background position
//       var coords = '50% '+ yPos + 'px';
  
//       // Move the background
//       $bgobj.css({ backgroundPosition: coords });
  
//    }); // window scroll Ends
  
//    });    
//   }
//   });

var myElement = document.getElementById('myElement');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(myElement);

// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element
mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

// listen to events...
mc.on("panleft panright panup pandown tap press", function(ev) {
    myElement.textContent = ev.type +" gesture detected.";
});


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