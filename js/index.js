// Smoothscroll
$(() => {
  $('a[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname
    ) {
      let target = $(this.hash);
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

// assigns the class "loaded" to all main images after they have loaded, which then removes the placeholder dominant colour background
$(".pImageMain").each(function () {
  const $wrapper = $(this);
  const img = $wrapper.find("img")[0];
  const tempImg = new Image();
  tempImg.src = img.src;
  tempImg.onload = function () {
    $wrapper.addClass("loaded");
  };
});

const nav = document.querySelector(".navbar");
const topOfNav = nav.offsetTop;
let scrollValue = 0;
// hides nav above window after scrolling past first section, nav reappears on scroll up
function fixNav() {
  if (window.scrollY >= topOfNav + 80) {
    document.body.classList.add("logo-show");
  } else if (window.scrollY < topOfNav + 80) {
    document.body.classList.remove("logo-show");
  }
  // set to offsetbottom of H1
  if (window.scrollY < scrollValue) { // scrolling up
    nav.style.top = 0; //set nav top to top of screen
  }

  const divi2 = document.querySelector("#divider2");// divider line 2
  if (window.scrollY > scrollValue && window.scrollY >= (topOfNav + divi2.offsetTop - nav.offsetHeight)) { // if scrolling down and at first dividing line
    nav.style.top = `-${nav.offsetHeight - 0}px`;// move nav out of screen by height of nav
  }
  scrollValue = window.scrollY; // set scrollValue to current window.scrollY so scroll direction can be ascertained
}

window.addEventListener("scroll", fixNav);

// Controlling the opening and closing of the flex panels section

const panels = document.querySelectorAll(".panel");

function toggleOpen() {
  panels.forEach(panel => {
    panel.classList.remove("open");
  });
  this.classList.toggle("open");
}

panels.forEach(panel => panel.addEventListener("click", toggleOpen));

// Using API to get visitor header information
function getDeets() {
  $.getJSON("https://cors-anywhere.herokuapp.com/https://header--parser.glitch.me/whoami", data => {
    $(".deets").append(`Your IP Address is: ${data.ipaddress}<br/>Browser: ${data.browser}<br/>Local time: ${data.time.slice(0, data.time.length - 3)}<br/>Date: ${data.date}`);
  });
}

getDeets();
// APIs

// Wikipedia Search
let maxResults = 6;
const extractLength = 250;
$(".search").on("click", () => {
  const imageW = [];
  const searchitem = $(".wikisearch").val();
  if (searchitem === "") {
    // $(".resultstitle").html("");
    $(".wikisearch").attr("placeholder", "Please enter a search term...");
  } else {
    $(".imageButton").attr("id", "unclicked");
    $(".imageButton").html("Show Images");
    let divConstructor = "";
    for (let a = 0; a < maxResults; a += 1) {
      divConstructor += '<div class="result"><div class="resultsTitle' + a + '"></div><div class="resultsExtract' + a + '"></div><div class="resultsImage' + a + '"></div></div>';
    }
    $(".results").html(divConstructor);
    $(".resultstitle").html("<h3>Results for <em>" + searchitem + "</em></h3>");
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&indexpageids=1&generator=search&utf8=1&exchars=" + extractLength + "&exlimit=" + maxResults + "&exintro=1&exsectionformat=plain&gsrlimit=" + maxResults + "&origin=*&gsrsearch=" + searchitem, json => {
      var results = (JSON.stringify(json));
      // gets pages key of json
      var pagesw = json.query.pages;
      // gets array of values for pages key of json (contains page ids)
      var keysW = json.query.pageids;
      var imagelist = "";
      for (let i = 0; i < maxResults; i += 1) {
        // creates dynamic variable to assign resulting title string to
        var resultTitleClass = ".resultsTitle" + i;
        var num = i;
        // gets id for each page as i increases for each value in array
        var keysVar = keysW[num];
        // gets title string for each pageid in results
        var title = pagesw[keysVar].title;
        // creates dynamic variable to assign resulting extract string to
        var resultExtractClass = ".resultsExtract" + i;
        // gets extract string for each pageid in results
        var extracts = pagesw[keysVar].extract;
        // gets extract length
        var extractLength = extracts.length;
        // shortens extract length (removes closing <p> and subsequent ...)
        var shortExtract = extracts.substring(0, extractLength - 7);
        imagelist += keysVar + "%7C";
        // assigns title string to corresponding numbered title div
        $(resultTitleClass).html('<h6><a class="titleLink" href="https://en.wikipedia.org/wiki/' + title + '" target="_blank">' + title + '</a></h6>' + shortExtract + '<a href="https://en.wikipedia.org/wiki/' + title + '" target="_blank"><em>...(read more)</em></a></p>');
      }

      $.getJSON(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pilicense=free&origin=*&piprop=original&pilimit=${maxResults}&pageids=${imagelist}`, imgsource => {
        for (let j = 0; j < maxResults; j += 1) {
          var resultsImageClass = ".resultsImage" + j;
          var propcheckoriginal = imgsource.query.pages[keysW[j]];
          var propchecksource = imgsource.query.pages[keysW[j]].original;
          if (propcheckoriginal.hasOwnProperty("original")) {
            if (propchecksource.hasOwnProperty("source")) {
              var imageURL = imgsource.query.pages[keysW[j]].original.source;
              $(resultsImageClass).html('<img src="' + imageURL + '" class="resultsImage"/>');
              if ($(".imageOff").attr("id") === "active") {
                $(resultsImageClass).css({
                  overflow: "hidden",
                  display: "none",
                  "align-self": "end",
                  margin: "10px 20% 20px 20%",
                  border: "2px #222534 solid",
                  "border-radius": "10px"
                });
                const imageW0 = $(".resultsImage").width();
                $(".resultsImage").css("height", `${imageW0}px`);
              } else if ($(".imageOff").attr("id") === "inactive") {
                $(resultsImageClass).css({
                  overflow: "hidden",
                  display: "grid",
                  "align-self": "end",
                  margin: "10px 20% 20px 20%",
                  border: "2px #222534 solid",
                  "border-radius": "10px"
                });
                const imageW1 = $(".resultsImage").width();
                $(".resultsImage").css("height", `${imageW1}px`);
                $(".imageButton").html("Hide Images");
                $(".imageButton").attr("id", "clicked");
              }
            }
          } else {
            $(resultsImageClass).html("");
            $(resultsImageClass).css({
              overflow: "hidden",
              display: "grid",
              "align-self": "end",
              margin: "10px 20% 20px 20%",
              border: "0",
              "border-radius": "0"
            });
          }
        }
      });
      $(".testing").html(results);
      $(".results").css("display", "grid");
      $(".imageButton").css("visibility", "visible");
    });
  }
  $(window).resize(() => {
    const imageW2 = $(".resultsImage").width();
    $(".resultsImage").css("height", `${imageW2}px`);
  });
});
$(".imageButton").on("click", () => {
  if ($(".imageButton").attr("id") === "unclicked") {
    $(".imageButton").html("Hide Images");
    $(".imageButton").attr("id", "clicked");
    for (let k = 0; k < maxResults; k += 1) {
      const resultsImageClass2 = `.resultsImage${k}`;
      const imageW = $(".resultsImage").width();
      $(".resultsImage").css("height", `${imageW}px`);
      $(resultsImageClass2).css("display", "grid");
    }
  } else if ($(".imageButton").attr("id") === "clicked") {
    $(".imageButton").html("Show Images");
    $(".imageButton").attr("id", "unclicked");
    for (let l = 0; l < maxResults; l += 1) {
      const resultsImageClass3 = `.resultsImage${l}`;
      $(resultsImageClass3).css("display", "none");
    }
  }
});
$(".minus").on("click", () => {
  if ($(".resultsNumber").html() <= 20 && $(".resultsNumber").html() > 1) {
    const numbers = +$(".resultsNumber").html();
    $(".resultsNumber").html(numbers - 1);
    maxResults -= 1;
  }
});
$(".plus").on("click", () => {
  if ($(".resultsNumber").html() >= 0 && $(".resultsNumber").html() <= 20) {
    const numbers = +$(".resultsNumber").html();
    $(".resultsNumber").html(numbers + 1);
    maxResults += 1;
  }
  if ($(".resultsNumber").html() === 21) {
    alert("20 is the maximum number of results");
    $(".resultsNumber").html(20);
    maxResults = 20;
  }
});
$(".settingsButton").on("click", () => {
  $(".settings").css("z-index", "0");
  $(".settings").css("opacity", "0");
  $(".details").css("z-index", "1");
  $(".details").css("opacity", "1");
});
$(".closer").click(() => {
  $(".settings").css("z-index", "1");
  $(".settings").css("opacity", "1");
  $(".details").css("z-index", "0");
  $(".details").css("opacity", "0");
})
$(".searchIconShow").click(() => {
  $(".wikisearch").css({
    width: "70%",
    opacity: "1"
  });
  $(".searchIconShow").css("display", "none");
  $(".searchArea").css("opacity", "1");
  $("hr").css("width", "90%");
});
$(".wikisearch").keypress(e => {
  if (e.which === 13) {
    $(".search").click();
  }
});
$(".imageOn").click(() => {
  $(".imageOff").css({
    "background-color": "#CBCEDD",
    color: "#222534",
    "font-weight": "normal"
  });
  $(".imageOff").attr("id", "inactive");
  $(".imageOn").attr("id", "active");
  $(".imageOn").css({
    "background-color": "red",
    color: "#CBCEDD",
    "font-weight": "bold"
  });
});
$(".imageOff").click(() => {
  $(".imageOn").css({
    "background-color": "#CBCEDD",
    color: "#222534",
    "font-weight": "normal"
  });
  $(".imageOn").attr("id", "inactive");
  $(".imageOff").attr("id", "active");
  $(".imageOff").css({
    "background-color": "red",
    color: "#CBCEDD",
    "font-weight": "bold"
  });
});

// URL shortener service

const urlInput = document.querySelector(".urlInput");
const url = "https://shorts.glitch.me/new/";
const result = document.querySelector(".result");
const results = document.querySelector(".results2");
const copy = document.querySelector(".copy");
const submit = document.querySelector(".submit");
const clear = document.querySelector(".clear");
const initial = "Paste your link here...";

function getURL() {
  const site = urlInput.value;
  const requestURL = `${url}${site}`;

  fetch(requestURL)
    .then(res => {
      if (res.status !== 200) {
        return;
      }
      return res.json();
    })
    .then(data => {
      if (data.error) {
        urlInput.value = "";
        urlInput.placeholder = data.error;
        setTimeout(() => {
          urlInput.placeholder = initial;
        }, 4000);
      } else {
        urlInput.value = data.newUrl;
        results.classList.toggle("hidden");
        submit.classList.toggle("hidden");
        clear.classList.toggle("hidden");
        urlInput.select();
      }
    })
    .catch(err => console.log("Fetch Error", err));
}

function shorten() {
  if (!urlInput.value) {
    urlInput.placeholder = "You need to enter a link to shorten...";
  } else {
    urlInput.placeholder = initial;
    getURL();
  }
}

function reset() {
  urlInput.value = "";
  results.classList.toggle("hidden");
  submit.classList.toggle("hidden");
  clear.classList.toggle("hidden");
}

submit.addEventListener("click", shorten);
copy.addEventListener("click", () => document.execCommand("Copy"));
clear.addEventListener("click", reset);

// Get user's geolocation data and create local map
function Geo() {
  const mapSize = 300;
  navigator.geolocation.watchPosition(data => {
    const lat = (data.coords.latitude);
    const long = (data.coords.longitude);
    const mapURL = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=${mapSize}x${mapSize}&maptype=map&key=AIzaSyBjxPMm6RJMnj4SILUqpTfyTSX8Crn_O_M`;

    $(".map").attr("src", mapURL);
  }, err => {
    // Show placeholder map with question mark if user doesn't allow location
    $(".map").attr("src", "images/Question_Mark_Map.png");
  });
}

Geo();

// Random Quote

$(document).ready(() => {
  $.ajaxSetup({ cache: false });
});

$(() => {
  $.getJSON("https://cors-anywhere.herokuapp.com/https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", data => {
    const post = data.shift();
    const colourStart = "#0A5CD4";
    $(".quote-title").html(`<em>- ${post.title}</em>`);
    $(".quote-title").css("color", colourStart);
    $(".quote-content").html(post.content);
    $(".quote-content").css("color", colourStart);
    $(".quoteMark").css("color", colourStart);
    $(".tweetButton").css("color", colourStart);
  });
});

$(".quoter").on("click", () => {
  const letters = "0123456789ABCDEF";
  let colour = "#";
  let colour2 = "#";
  for (let i = 0; i < 6; i += 1) {
    colour += letters[Math.floor(Math.random() * 16)];
    colour2 += letters[Math.floor(Math.random() * 16)];
  }
  $.getJSON("https://cors-anywhere.herokuapp.com/https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", data => {
    const post = data.shift(); // The data is an array of posts. Grab the first one.
    $(".quoter").css("background-color", colour2);
    $(".quote-title").html(`- ${post.title}`);
    $(".quote-title").css("color", colour2);
    $(".quote-content").html(post.content);
    $(".quote-content p").css("color", colour2);
    $(".quoteMark").css("color", colour2);
    $(".tweetButton").css("color", colour2);
  });
});

$("a.tweetButton").on("click", () => {
  // const _href = $("a.tweetButton").attr("href");
  const quote = $(".quote-content").text();
  const quotee = $(".quote-title").text();
  $("a.tweetButton").attr("href", `https://twitter.com/intent/tweet?text=${quote}${quotee}`);
});
