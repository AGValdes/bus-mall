/* eslint-disable no-unused-vars */
'use strict';

var allProducts = [];
var imageOneElement = document.getElementById('image-one');
var imageTwoElement = document.getElementById('image-two');
var imageThreeElement = document.getElementById('image-three');
var imageContainer = document.getElementById('image-container');
var recentRandomNumbers = [];
var numberOfRounds = 25;
var roundsTaken = 0;
var btn = document.createElement('BUTTON');
var votesArray = [];
var productNamesArray = [];
// constructor function for creating product object instances
function Product(filepath, productName) {
  this.filepath = filepath;
  this.name = productName;
  this.votes = 0;
  this.thisRoundOptions = [];
  this.numberOfViews = 0;

  allProducts.push(this);
  productNamesArray.push(this.name);
}
// create object instances for each product
new Product('img/bag.jpg', 'bag');
new Product('img/banana.jpg', 'banana');
new Product('img/bathroom.jpg', 'bathroom');
new Product('img/boots.jpg', 'boots');
new Product('img/breakfast.jpg', 'breakfast');
new Product('img/bubblegum.jpg', 'bubblegum');
new Product('img/chair.jpg', 'chair');
new Product('img/cthulhu.jpg', 'cthulhu');
new Product('img/dog-duck.jpg', 'dog-duck');
new Product('img/dragon.jpg', 'dragon');
new Product('img/pen.jpg', 'pen');
new Product('img/pet-sweep.jpg', 'pet-sweep');
new Product('img/scissors.jpg', 'scissors');
new Product('img/shark.jpg', 'shark');
new Product('img/sweep.png', 'sweep');
new Product('img/tauntaun.jpg', 'tauntaun');
new Product('img/unicorn.jpg', 'unicorn');
new Product('img/usb.gif', 'usb');
new Product('img/water-can.jpg', 'water-can');
new Product('img/wine-glass.jpg', 'wine-glass');

// console.log(allProducts);
// Random Number Generator
function getRandomNumber(min, max) {

  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Get a random index between 0 and the length of our all Products array, and render those to the page
function renderProducts(imageElement) {
  var randomIndex = getRandomNumber(0, allProducts.length - 1);

  while (recentRandomNumbers.includes(randomIndex)) {
    randomIndex = getRandomNumber(0, allProducts.length - 1);
  }
  if (recentRandomNumbers.length > 5) {
    recentRandomNumbers.shift();
  }
  //might want to think about using numberOfViews in somekind of if/else statement, evening out the number of times each one gets viewed?
  imageElement.src = allProducts[randomIndex].filepath;
  imageElement.alt = allProducts[randomIndex].name;
  imageElement.title = allProducts[randomIndex].name;
  allProducts[randomIndex].numberOfViews++;
  allProducts[randomIndex].thisRoundOptions.push(allProducts[randomIndex]);

  recentRandomNumbers.push(randomIndex);

}

// Add event listener for when user clicks a product picture, track this in the form of votes, and render 3 new random products.

imageContainer.addEventListener('click', handleClick);
function handleClick(event) {
  event.preventDefault();
  var chosenProduct = event.target.title;
  for (var i = 0; i < allProducts.length; i++) {
    if (chosenProduct === allProducts[i].name) {
      // console.log('increasing votes for', allProducts[i].name);
      allProducts[i].votes++;
      // console.log(roundsTaken);
    }
  }
  renderProducts(imageOneElement);
  renderProducts(imageTwoElement);
  renderProducts(imageThreeElement);
  roundsTaken++;
  limitNumberOfTurns();

}

//removes event listener on 25th round
function limitNumberOfTurns() {
  if (roundsTaken === numberOfRounds) {
    imageContainer.removeEventListener('click', handleClick);
    renderResultsButton();
  }
}
function makeVotesArrayForChart() {
  for (var j = 0; j < allProducts.length; j++) {
    votesArray.push(allProducts[j].votes);
  }
}
function renderResultsButton() {
  // var btn = document.createElement('BUTTON');
  btn.innerHTML = 'View Results';
  document.body.appendChild(btn);
}
// waits for user to click the 'view results' button, and then appends list items to an unordered list containing the number of votes and number of view for each product object.
btn.addEventListener('click', resultClick);
function resultClick(event) {
  var ulElement = document.getElementById('resultslist');
  for (var i = 0; i < allProducts.length; i++) {
    var liElement = document.createElement('li');
    liElement.textContent = `${allProducts[i].name} had ${allProducts[i].votes} votes, and was seen ${allProducts[i].numberOfViews} times.`;
    ulElement.appendChild(liElement);
  }
}


renderProducts(imageOneElement);
renderProducts(imageTwoElement);
renderProducts(imageThreeElement);
