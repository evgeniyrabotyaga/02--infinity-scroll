'use strict';

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const count = 10;
const apiKey = 'gugypcqY7xn_n-8fyG5YiTpMFaepsPF7HD_IpxSk994';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const imageLoaded = function () {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
};

// Create Elements add to Dom
const displayPhotos = function () {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach(photo => {
    if (photo.alt_description === null)
      photo.alt_description = 'The description is undefined. Sorry :)';
    const image = document.createElement('img');
    image.setAttribute('src', photo.urls.regular);
    image.setAttribute('alt', photo.alt_description);
    image.setAttribute('title', photo.alt_description);
    image.addEventListener('load', imageLoaded);
    const markup = `
        <a href="${photo.links.html}" target="_blank">
            ${image}
        </a>
      `;
    imageContainer.insertAdjacentHTML('afterbegin', markup);
  });
};

const getPhotos = async function () {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();

    displayPhotos();
  } catch (err) {
    alert(`💥💥💥 Something went wrong. Please try later! 💥💥💥`);
  }
};

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
