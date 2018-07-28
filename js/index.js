// Smoothscroll
$(function () {
  $('a[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
      this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top
          },
          1000
        );
        return false;
      }
    }
  });
});
// Contact section
$("#contactForm").submit(function (e) {
  var errormessage = "";
  if ($("#name").val() === "") {
    errormessage += "<br/>" + "Please enter your name.";
  }

  if ($("#email").val() === "") {
    errormessage += "<br/>" + "Please enter an email address.";
  } else {
    function isValidEmailAddress(emailAddress) {
      var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      return pattern.test(emailAddress);
    }
    //! before isValidEmailAddress will search if value returns as false.
    if (!isValidEmailAddress($("#email").val())) {
      essage += "<br/>" + "Please enter a valid email address.";
    }
  }

  if ($("#subject").val() === "") {
    errormessage += "<br/>" + "Please write a message.";
  }

  if ($("#message").val() === "") {
    errormessage += "<br/>" + "Please write a message.";
  }

  if (errormessage !== "") {
    $("#error").html(
      "<div class='alert alert-danger' role='alert'><p><strong>There seems to be some errors in your form.</strong></p>" +
      errormessage +
      "</div>"
    );
    return false;
  } else {
    return true;
  }
});

//assigns the class 'loaded' to all main images after they have loaded, which then removes the placeholder dominant colour background
$('.pImageMain').each(function () {
  var $wrapper = $(this);
  var img = $wrapper.find('img')[0];

  var tempImg = new Image();
  tempImg.src = img.src;
  tempImg.onload = function () {
    $wrapper.addClass('loaded');
  };
});

//assigns the class 'loaded' to all mobile images after they have loaded, which then removes the placeholder dominant colour background
$('.pImageMobile').each(function () {
  var $wrapper = $(this);
  var img = $wrapper.find('img')[0];

  var tempImg = new Image();
  tempImg.src = img.src;
  tempImg.onload = function () {
    $wrapper.addClass('loaded');
  };
});

const nav = document.querySelector('.navbar');
const topOfNav = nav.offsetTop;
var scrollValue = 0;
//hides nav above window after scrolling past first section, nav reappears on scroll up
function fixNav() {
  if (window.scrollY >= topOfNav + 130) {
    document.body.classList.add("logo-show");
  } else if (window.scrollY < topOfNav + 130) {
    document.body.classList.remove("logo-show");
  }
  // set to offsetbottom of H1
  if (window.scrollY < scrollValue) { //scrolling up
    nav.style.top = 0; //set nav top to top of screen
  }

  const divi2 = document.querySelector('#divider2');//divider line 2
  if (window.scrollY > scrollValue && window.scrollY >= (topOfNav + divi2.offsetTop - nav.offsetHeight)) { //if scrolling down and at first dividing line
    nav.style.top = `-${nav.offsetHeight - 0}px`;//move nav out of screen by height of nav

  }
  scrollValue = window.scrollY; //set scrollValue to current window.scrollY so scroll direction can be ascertained
}

window.addEventListener('scroll', fixNav);

// Controlling the opening and closing of the flex panels section

const panels = document.querySelectorAll(".panel");

function toggleOpen() {
  panels.forEach(function (panel) {
    panel.classList.remove("open");
  });
  this.classList.toggle("open");

}

panels.forEach(panel => panel.addEventListener("click", toggleOpen));


// Using API to get visitor header information
function getDeets() {

  $.getJSON("https://cors-anywhere.herokuapp.com/https://header--parser.glitch.me/whoami", (data) => {
    $(".deets").append(`Your IP Address is: ${data.ipaddress}<br/>Browser: ${data.browser}<br/>Local time: ${data.time}<br/>Date: ${data.date}`);

  });
}

getDeets();
//APIs

//Wikipedia Search
var maxResults = 6;
var extractLength = 250;
$('.search').on('click', function (WikipediaSearch) {
  var imageW = [];
  var searchitem = $('.wikisearch').val();
  if (searchitem === '') {
    //$('.resultstitle').html('');
    $('.wikisearch').attr('placeholder', 'Please enter a search term...');
  } else {
    $('.imageButton').attr('id', 'unclicked');
    $('.imageButton').html('Show Images');
    var divConstructor = '';
    for (a = 0; a < maxResults; a++) {
      divConstructor += '<div class="result"><div class="resultsTitle' + a + '"></div><div class="resultsExtract' + a + '"></div><div class="resultsImage' + a + '"></div></div>';
    }
    $('.results').html(divConstructor);
    console.log(divConstructor);
    $('.resultstitle').html('<h3>Results for <em>' + searchitem + '</em></h3>');
    $.getJSON('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&indexpageids=1&generator=search&utf8=1&exchars=' + extractLength + '&exlimit=' + maxResults + '&exintro=1&exsectionformat=plain&gsrlimit=' + maxResults + '&origin=*&gsrsearch=' + searchitem, function (json) {
      var results = (JSON.stringify(json));
      //gets pages key of json
      var pagesw = json.query.pages;
      //gets array of values for pages key of json (contains page ids)
      var keysW = json.query.pageids;
      console.log(keysW);
      var imagelist = "";
      //alert(pagesw[keysW[0]].extract)
      //alert (pagesw[keysVar].title);
      for (i = 0; i < maxResults; i++) {
        //creates dynamic variable to assign resulting title string to
        var resultTitleClass = '.resultsTitle' + i;
        var num = i;
        //gets id for each page as i increases for each value in array
        var keysVar = keysW[num];
        // gets title string for each pageid in results
        var title = pagesw[keysVar].title;
        //creates dynamic variable to assign resulting extract string to
        var resultExtractClass = '.resultsExtract' + i;
        //gets extract string for each pageid in results
        var extracts = pagesw[keysVar].extract;
        //gets extract length
        var extractLength = extracts.length;
        //shortens extract length (removes closing <p> and subsequent ...)
        var shortExtract = extracts.substring(0, extractLength - 7);
        imagelist += keysVar + '%7C';
        //assigns title string to corresponding numbered title div
        $(resultTitleClass).html('<h><a class="titleLink" href="https://en.wikipedia.org/wiki/' + title + '" target="_blank">' + title + '</a></h3>' + shortExtract + '<a href="https://en.wikipedia.org/wiki/' + title + '" target="_blank"><em>...(read more)</em></a></p>');
        //assigns extract string to corresponding numbered title div
        //$(resultExtractClass).html(shortExtract + '<a href="https://en.wikipedia.org/wiki/' + title + '" target="_blank"><em>...(read more)</em></a></p>');
        //console.log(keysW);
      }
      console.log(imagelist);
      $.getJSON('https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pilicense=free&origin=*&piprop=original&pilimit=' + maxResults + '&pageids=' + imagelist, function (imgsource) {
        for (j = 0; j < maxResults; j++) {
          var resultsImageClass = '.resultsImage' + j;
          var propcheckoriginal = imgsource.query.pages[keysW[j]];
          var propchecksource = imgsource.query.pages[keysW[j]].original;
          if (propcheckoriginal.hasOwnProperty('original')) {
            if (propchecksource.hasOwnProperty('source')) {
              var imageURL = imgsource.query.pages[keysW[j]].original.source;
              $(resultsImageClass).html('<img src="' + imageURL + '" class="resultsImage"/>');
              if ($('.imageOff').attr('id') == 'active') {
                $(resultsImageClass).css({
                  'overflow': 'hidden',
                  'display': 'none',
                  'align-self': 'end',
                  'margin': '10px 20% 20px 20%',
                  'border': '2px #222534 solid',
                  'border-radius': '10px'
                });
                var imageW = $('.resultsImage').width();
                $('.resultsImage').css('height', imageW + 'px');
              } else if ($('.imageOff').attr('id') == 'inactive') {
                $(resultsImageClass).css({
                  'overflow': 'hidden',
                  'display': 'grid',
                  'align-self': 'end',
                  'margin': '10px 20% 20px 20%',
                  'border': '2px #222534 solid',
                  'border-radius': '10px'
                });
                var imageW = $('.resultsImage').width();
                $('.resultsImage').css('height', imageW + 'px');
                $('.imageButton').html('Hide Images');
                $('.imageButton').attr('id', 'clicked');
              }
            }
          } else {
            $(resultsImageClass).html('');
            $(resultsImageClass).css({
              'overflow': 'hidden',
              'display': 'grid',
              'align-self': 'end',
              'margin': '10px 20% 20px 20%',
              'border': '0',
              'border-radius': '0'
            });
          }
        }
      });
      $('.testing').html(results);
      $('.results').css('display', 'grid');
      $('.imageButton').css('visibility', 'visible');
    });
  }
  $(window).resize(function () {
    var imageW = $('.resultsImage').width();
    $('.resultsImage').css('height', imageW + 'px');
  });
});
$('.imageButton').on('click', function () {
  if ($('.imageButton').attr('id') == 'unclicked') {
    $('.imageButton').html('Hide Images');
    $('.imageButton').attr('id', 'clicked');
    for (k = 0; k < maxResults; k++) {
      var resultsImageClass2 = '.resultsImage' + k;
      var imageW = $('.resultsImage').width();
      $('.resultsImage').css('height', imageW + 'px');
      $(resultsImageClass2).css('display', 'grid');
    }
  } else if ($('.imageButton').attr('id') == 'clicked') {
    $('.imageButton').html('Show Images');
    $('.imageButton').attr('id', 'unclicked');
    for (l = 0; l < maxResults; l++) {
      var resultsImageClass3 = '.resultsImage' + l;
      $(resultsImageClass3).css('display', 'none');
    }
  }
});
$('.minus').on('click', function () {
  if ($('.resultsNumber').html() <= 20 && $('.resultsNumber').html() > 1) {
    var numbers = +$('.resultsNumber').html();
    $('.resultsNumber').html(numbers - 1);
    maxResults -= 1;
  }
});
$('.plus').on('click', function () {
  if ($('.resultsNumber').html() >= 0 && $('.resultsNumber').html() <= 20) {
    var numbers = +$('.resultsNumber').html();
    console.log(numbers);
    $('.resultsNumber').html(numbers + 1);
    maxResults += 1;
  }
  if ($('.resultsNumber').html() == 21) {
    alert('20 is the maximum number of results');
    $('.resultsNumber').html(20);
    maxResults = 20;
  }
});
$('.settingsButton').on('click', function () {
  $('.settings').css('z-index', '0');
  $('.settings').css('opacity', '0');
  $('.details').css('z-index', '1');
  $('.details').css('opacity', '1');
});
$('.closer').click(function () {
  $('.settings').css('z-index', '1');
  $('.settings').css('opacity', '1');
  $('.details').css('z-index', '0');
  $('.details').css('opacity', '0');
})
$('.searchIconShow').click(function () {
  $('.wikisearch').css({
    'width': '70%',
    'opacity': '1'
  });
  $('.searchIconShow').css('display', 'none');
  $('.searchArea').css('opacity', '1');
  $('hr').css('width', '90%');
});
$('.wikisearch').keypress(function (e) {
  if (e.which == 13) {
    console.log('You pressed enter!');
    $('.search').click();
  }
});
$('.imageOn').click(function () {
  $('.imageOff').css({
    'background-color': '#CBCEDD',
    'color': '#222534',
    'font-weight': 'normal'
  });
  $('.imageOff').attr('id', 'inactive');
  $('.imageOn').attr('id', 'active');
  $('.imageOn').css({
    'background-color': 'red',
    'color': '#CBCEDD',
    'font-weight': 'bold'
  });
})
$('.imageOff').click(function () {
  $('.imageOn').css({
    'background-color': '#CBCEDD',
    'color': '#222534',
    'font-weight': 'normal'
  });
  $('.imageOn').attr('id', 'inactive');
  $('.imageOff').attr('id', 'active');
  $('.imageOff').css({
    'background-color': 'red',
    'color': '#CBCEDD',
    'font-weight': 'bold'
  });
})

// URL shortner service

const urlInput = document.querySelector(".urlInput");
const url = "https://shorts.glitch.me/new/";
const result = document.querySelector(".result");
const results = document.querySelector(".results");
const copy = document.querySelector(".copy");
const submit = document.querySelector(".submit");
const clear = document.querySelector(".clear");
const initial = "Paste your link here...";

function shorten() {
  if (!urlInput.value) {
    urlInput.placeholder = "You need to enter a link to shorten...";
  } else {
    urlInput.placeholder = initial;
    getURL();
  }
}


function getURL() {
  const site = urlInput.value;
  const requestURL = `${url}${site}`;

  fetch(requestURL)
    .then((res) => {
      if (res.status !== 200) {
        return;
      }
      return res.json();
    })
    .then((data) => {
      if (data.error) {
        urlInput.value = "";
        urlInput.placeholder = data.error;
        setTimeout(() => {
          urlInput.placeholder = initial;
        }, 4000)

      } else {
        urlInput.value = data.newUrl;

        results.classList.toggle("hidden");
        submit.classList.toggle("hidden");
        clear.classList.toggle("hidden");
        urlInput.select();
      }
    })
    .catch((err) => console.log('Fetch Error', err));
}

function reset() {
  urlInput.value = "";
  results.classList.toggle("hidden");
  submit.classList.toggle("hidden");
  clear.classList.toggle("hidden");
}

submit.addEventListener("click", shorten);
copy.addEventListener("click", () => document.execCommand("Copy"));
clear.addEventListener("click", reset)

//Get user's geolocation data and create local map
function Geo() {
  const arrow = document.querySelector(".arrow");
  const speed = document.querySelector(".speed-value");
  const mapSize = 300;

  navigator.geolocation.watchPosition((data) => {
    const lat = (data.coords.latitude);
    const long = (data.coords.longitude);
    const mapURL = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=${mapSize}x${mapSize}&maptype=map&key=AIzaSyBjxPMm6RJMnj4SILUqpTfyTSX8Crn_O_M`;

    $(".map").attr("src", mapURL);
  }, (err) => {
    // Show placeholder map with question mark if user doesn't allow location
    $(".map").attr("src", "images/Question_Mark_Map.png");
  });
};

// Geo();


//Random Quote

$(document).ready(function() {
  $.ajaxSetup({ cache: false });
});

$(function () {
$.getJSON("https://cors-anywhere.herokuapp.com/https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",function (data) {
  var post = data.shift();
  var colourStart = "#0A5CD4";
  $('#quote-title').html('<em>- ' + post.title + '</em>');
  $('#quote-title').css('color', colourStart);
  $('#quote-content').html(post.content);
  $('#quote-content').css('color', colourStart);
  $('#quoteMark').css('color', colourStart);

} )

});

$("#quoter").on("click", function () {
  var letters = '0123456789ABCDEF';
  var colour = '#';
  var colour2 = '#';
  for (var i = 0; i < 6; i++) {
    colour += letters[Math.floor(Math.random() * 16)];
    colour2 += letters[Math.floor(Math.random() * 16)]
  }
$.getJSON("https://cors-anywhere.herokuapp.com/https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function (data) {
  var post = data.shift(); // The data is an array of posts. Grab the first one.
  console.log(post);
  $('#quoter').css('background-color', colour2);
  $('#quote-title').html('- ' + post.title);
  $('#quote-title').css('color', colour2);
  $('#quote-content').html(post.content);
  $('#quote-content p').css('color', colour2);
  $('#quoteMark').css('color', colour2);
  $('#tweetButton').css('color', colour2);
})

});

$("a#tweetButton").on("click", function () {
  var _href = $("a#tweetButton").attr("href");
  var quote = $("#quote-content").text();
  var quotee = $("#quote-title").text();
  $('a#tweetButton').attr('href', 'https://twitter.com/intent/tweet?text=' + quote + quotee);
});
