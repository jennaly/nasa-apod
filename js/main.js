//shows today's picture onload
showToday();

//shows picture on another date when button is clicked
document.querySelector('button').addEventListener('click', showOnDate);

//shows today's picture
function showToday() {
  const key =  'g1I9im27OqaDCKBiHQTCnrsCFDLxdUe3mCItapYU';
  const url = `https://api.nasa.gov/planetary/apod?api_key=${key}`;
  getData(url);
}

//shows picture on specified date
function showOnDate() {
  const key =  'g1I9im27OqaDCKBiHQTCnrsCFDLxdUe3mCItapYU';
  const date = document.querySelector('input').value;
  const url = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${date}`;
  getData(url);
}

//fetches data
function getData(url) {
  removeMedia();
  fetch(url) 
    .then(res => res.json())
    .then(data => {
      setTitle(data);
      setExplanation(data);
      if (data.media_type === 'image') {
        appendImg(data);
        fullScreen(data.hdurl);
      } else if (data.media_type === 'video') {
        appendVideo(data);
      }
    })
    .catch(err => console.log(`error ${err}`));
}

//sets the title of the picture
function setTitle(data) {
  document.querySelector('h2').innerText = data.title.toUpperCase();
}

//sets the explanation of the picture
function setExplanation(data) {
  document.querySelector('h3').innerText = data.explanation.split('.')[0];
}

//removes image/video from previous fetch
function removeMedia() {
  let mediaContainer = document.getElementById('mediaContainer');
  while (mediaContainer.firstChild) {
    mediaContainer.removeChild(mediaContainer.firstChild);
  }
}

//makes new img element and appends it to parent container
function appendImg(data) {
  mediaContainer.appendChild(document.createElement("img")).className = "media";
  document.querySelector('.media').src = data.hdurl;
  
}

//makes new iframe element and appends it to parent container
function appendVideo(data) {
  mediaContainer.appendChild(document.createElement("iframe")).className = "media";
  document.querySelector('.media').src = data.url;
}

//make picture fullscreen on click event
const fullPage = document.querySelector('#fullpage');

function fullScreen (src) {
  document.querySelector('.media').addEventListener('click', function() {
    fullPage.style.backgroundImage = 'url(' + src + ')';
    fullPage.style.display = 'block';
  });
} 

//exit fullscreen
fullPage.addEventListener('click', exitFullScreen);

function exitFullScreen() {
  fullPage.style.display = 'none';
}
