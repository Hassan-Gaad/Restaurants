

var slideIndex = 0;

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 3000); // Change image every 2 seconds
}


var xhr = new XMLHttpRequest();
var response = "";
var restObj;
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

    response = this.responseText;
    restObj = JSON.parse(response);
    //console.log(this.responseText);
    console.log(restObj);
    setupLayout();
    showSlides();
    initMap();

  }
});
const id = localStorage.getItem('id');
console.log(id);
if (id == undefined) {
  throw "no restaurant id found in local storage";
}
xhr.open("GET", `https://api.yelp.com/v3/businesses/${id}`);
//xhr.open("GET", "./returantById.json");
xhr.setRequestHeader("authorization", "Bearer YOUR APT KEY");

xhr.send();


var headerImg = document.getElementsByClassName("header")[0];
var headerRestaurantName = document.getElementById("restaurantName");
var aboutMainImag = document.getElementById("MainImg");
var aboutRestName = document.getElementById("aboutRestName");
var aboutPhoneNo = document.getElementById("phoneNo");
var aboutReview = document.getElementById("review");
var aboutPrice = document.getElementById("price");
var aboutClosedFrom = document.getElementById("closedFrom");
var aboutClosedTo = document.getElementById("closedTo");
var aboutRating = document.getElementById("ratingNo");
var aboutLocation = document.getElementsByClassName("location");
var aboutCategories = document.getElementById("category");
var aboutClaimed = document.getElementById("claimed");

var galleryImgs = document.querySelector("div.mySlides > img");

var reserveLunchTime = document.getElementById("lunchTime");
var reserveDinnerTime = document.getElementById("dinnerTime");

var mapURL = document.getElementById("mapURL");
var quoteCity = document.getElementById("city");
var quoteCountry = document.getElementById("country");
var quote = document.getElementsByClassName("quote")[0];

function setupLayout() {
  if (restObj == undefined) {
    throw new Error("Resturant object 'restObj' is undefined , or no response came from the server");
  }
  headerImg.style.backgroundImage = `url(${restObj["image_url"]})`;
  headerRestaurantName.innerHTML = restObj["name"];
  aboutMainImag.style.backgroundImage = `url(${restObj["image_url"]})`;
  aboutRestName.innerHTML = restObj["name"];
  aboutPhoneNo.innerHTML = restObj["phone"];
  aboutReview.innerHTML = restObj["review_count"];
  aboutPrice.innerHTML = restObj["price"];
  var closedStart = restObj["hours"][0]["open"][0]["end"];
  var ClosedEnd = restObj["hours"][0]["open"][0]["start"];
  aboutClosedFrom.innerHTML = tConvert(closedStart.substring(0, 2) + ":00")
  aboutClosedTo.innerHTML = tConvert(ClosedEnd.substring(0, 2) + ":00")
  aboutRating.innerHTML = restObj["rating"];
  aboutLocation[0].innerHTML = restObj["location"].display_address.join();
  var categories = "";
  for (var i = 0; i < restObj["categories"].length; i++) {
    categories += restObj["categories"][i].title + " | "
  }
  aboutCategories.innerHTML = categories;
  aboutClaimed.innerHTML = restObj["is_claimed"] ? "Claimed" : "Not claimed";

  // gallery setup
  for (var i = 0; i < restObj["photos"].length; i++) {
    createGalleryElement(restObj["photos"][i]);
  }

  //reservation text layout
  reserveLunchTime.innerHTML = tConvert(ClosedEnd.substring(0, 2) + ":00");
  reserveDinnerTime.innerHTML = tConvert(closedStart.substring(0, 2) + ":00");
  mapURL.setAttribute("href", restObj["url"]);

  quoteCity.innerHTML = restObj["location"]["city"];
  quoteCountry.innerHTML = restObj["location"]["country"];

  var quoteStr = quote.textContent;
  quote.innerHTML = "";
  writeCharByChar(quoteStr, quote);
}

function createGalleryElement(url) {
  var divElem = document.createElement("div");
  divElem.className = "mySlides fade";
  var imgElem = document.createElement("img");
  imgElem.className = "slideImage";
  imgElem.src = url;
  divElem.appendChild(imgElem);
  document.getElementsByClassName("slideshow-container")[0].appendChild(divElem);
}

function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice(1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
}
// Initialize and add the map
function initMap() {
  // The location of Uluru
  const uluru = { lat: restObj["coordinates"]["latitude"], lng: restObj["coordinates"]["longitude"] };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

function writeCharByChar(str, elem) {
  var i = 0;
  var timerID = setInterval(function () {

    if (i <= str.length) {
      elem.innerHTML += str.charAt(i)
      // win.document.write(str.charAt(i));
      i++;
    } else {
      clearInterval(timerID);
    }

  }, 80);
}