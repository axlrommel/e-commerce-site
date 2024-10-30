var cardsHolder = document.getElementById('cardsPlaceholder');
var pageItemsSelector = document.getElementById('itemsPerPage');

var itemList = [];
var currentPage = 1;

function getItemsPerPage() {
  var itemsPerPage = document.getElementById('itemsPerPage').value;
  return itemsPerPage;
}

function loadCard(item) {
  var section = document.createElement('div');
  section.setAttribute('class', 'card');
  var title = document.createElement('h4');
  title.textContent = item.title;
  var image = document.createElement('img');
  image.setAttribute('src', item.image);
  var price = document.createElement('p');
  price.textContent = `$ ${item.price}`;
  section.appendChild(title);
  section.appendChild(image);
  section.appendChild(price);
  cardsHolder.appendChild(section);
}

function checkButtons() {
  if (Math.ceil(itemList.length / getItemsPerPage()) === 1) {
    document.getElementById('previous').disabled = true;
    document.getElementById('next').disabled = true;
  } else if (currentPage === 1) {
    document.getElementById('previous').disabled = true;
    document.getElementById('next').disabled = false;
  } else if (currentPage === Math.ceil(itemList.length / getItemsPerPage())) {
    document.getElementById('previous').disabled = false;
    document.getElementById('next').disabled = true;
  } else {
    document.getElementById('previous').disabled = false;
    document.getElementById('next').disabled = false;
  }
}

function refreshList(start, end) {
  cardsHolder.replaceChildren();

  for (let i = start; i < end; i++) {
    if (i < itemList.length) {
      loadCard(itemList[i]);
    }
  }

  checkButtons();
}

function loadCards() {
  fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((data) => {
      itemList = data;
      refreshList(0, getItemsPerPage());
    });
}

function gotoPage(move) {
  currentPage = currentPage + move;
  refreshList(
    (currentPage - 1) * getItemsPerPage(),
    currentPage * getItemsPerPage()
  );
}

function ascending(a, b) {
  return a.price - b.price;
}

function sortAscending() {
  itemList.sort(ascending);
  refreshList(0, getItemsPerPage());
}

function descending(a, b) {
  return b.price - a.price;
}

function sortDescending() {
  itemList.sort(descending);
  refreshList(0, getItemsPerPage());
}

function changePageItems() {
  refreshList(0, getItemsPerPage());
}

pageItemsSelector.addEventListener('change', changePageItems);
