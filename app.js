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
var viewsArray = [];
// constructor function for creating product object instances
function Product(filepath, productName, votes = 0, numberOfViews = 0) {
  this.filepath = filepath;
  this.title = productName;
  this.votes = votes;
  // this.thisRoundOptions = [];
  this.numberOfViews = numberOfViews;

  allProducts.push(this);
  productNamesArray.push(this.title);
}



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
  imageElement.alt = allProducts[randomIndex].title;
  imageElement.title = allProducts[randomIndex].title;
  allProducts[randomIndex].numberOfViews++;
  // allProducts[randomIndex].thisRoundOptions.push(allProducts[randomIndex]);

  recentRandomNumbers.push(randomIndex);

}

// Add event listener for when user clicks a product picture, track this in the form of votes, and render 3 new random products.

imageContainer.addEventListener('click', handleClick);
function handleClick(event) {
  event.preventDefault();
  console.log(allProducts);
  var itemsMadeIntoJson = JSON.stringify(allProducts);
  localStorage.setItem('itemsFromLocalStorage', itemsMadeIntoJson);

  var chosenProduct = event.target.title;
  for (var i = 0; i < allProducts.length; i++) {
    if (chosenProduct === allProducts[i].title) {
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
// create object instances for each product
if (!localStorage.getItem('itemsFromLocalStorage')) {
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
} else {
  var itemsFromLocalAsAString = localStorage.getItem('itemsFromLocalStorage');
  var itemsFromLocalAsAnArray = JSON.parse(itemsFromLocalAsAString);

  for (var i = 0; i < itemsFromLocalAsAnArray.length; i++) {
    var reNameProduct = itemsFromLocalAsAnArray[i].title;
    var giveBackSource = itemsFromLocalAsAnArray[i].filepath;
    var giveBackVotes = itemsFromLocalAsAnArray[i].votes;
    var giveBackViews = itemsFromLocalAsAnArray[i].numberOfViews;
    new Product(giveBackSource, reNameProduct, giveBackVotes, giveBackViews);
  }
}
//removes event listener on 25th round
function limitNumberOfTurns() {
  if (roundsTaken === numberOfRounds) {
    imageContainer.removeEventListener('click', handleClick);
    renderResultsButton();
    makeVotesArrayForChart();
  }
}

function makeVotesArrayForChart() {
  for (var i = 0; i < allProducts.length; i++) {
    votesArray.push(allProducts[i].votes);
    viewsArray.push(allProducts[i].numberOfViews);
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
  makeVotesChart();
}


renderProducts(imageOneElement);
renderProducts(imageTwoElement);
renderProducts(imageThreeElement);


function makeVotesChart() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNamesArray,
      datasets: [{
        label: 'Product Votes',
        data: votesArray,
        backgroundColor: [
          'rgba(55, 255, 255, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(55, 255, 255, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(55, 255, 255, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(55, 255, 255, 1)',
          'rgba(54, 162, 235, 1)'

        ],
        borderColor: [
          'rgba(55, 255, 255, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(55, 255, 255, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(55, 255, 255, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(55, 255, 255, 1)',
          'rgba(54, 162, 235, 1)'

        ],
        borderWidth: 1
      }, {
        label: 'Product Views',
        data: viewsArray,
        backgroundColor: [
          'rgba(55, 255, 255, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(55, 255, 255, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(55, 255, 255, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(55, 255, 255, 0.2)',
          'rgba(54, 162, 235, 0.2)'

        ],
        borderColor: [
          'rgba(55, 255, 255, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(55, 255, 255, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(55, 255, 255, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(55, 255, 255, 1)',
          'rgba(54, 162, 235, 1)'

        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
