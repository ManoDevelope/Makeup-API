const productsContainer = document.getElementById('products');
const paginationContainer = document.getElementById('pagination');
let currentPage = 1;
const productsPerPage = 10;
let productsData = [];

async function fetchProducts() {
  try {
    const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
    const data = await response.json();
    productsData = data;
    displayProducts();
  } catch (error) {
    console.log('Error:', error);
  }
}

function displayProducts() {
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToDisplay = productsData.slice(startIndex, endIndex);

  productsContainer.innerHTML = '';

  productsToDisplay.forEach((product) => {
    const productElement = document.createElement('div');
    productElement.className = 'product';

    const brandElement = document.createElement('h2');
    brandElement.textContent = `Brand: ${product.brand}`;

    const nameElement = document.createElement('h3');
    nameElement.textContent = `Name: ${product.name}`;

    const priceElement = document.createElement('p');
    priceElement.textContent = `Price: $${product.price}`;

    const imageElement = document.createElement('img');
    imageElement.src = product.image_link;
    imageElement.alt = product.name;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = `Description: ${product.description}`;

    const linkElement = document.createElement('a');
    linkElement.href = product.product_link;
    linkElement.textContent = 'View Product';

    productElement.appendChild(brandElement);
    productElement.appendChild(nameElement);
    productElement.appendChild(priceElement);
    productElement.appendChild(imageElement);
    productElement.appendChild(descriptionElement);
    productElement.appendChild(linkElement);

    productsContainer.appendChild(productElement);
  });

  displayPagination();
}

function displayPagination() {
  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(productsData.length / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.addEventListener('click', () => {
      currentPage = i;
      displayProducts();
    });

    if (i === currentPage) {
      pageButton.classList.add('active');
    }

    paginationContainer.appendChild(pageButton);
  }
}

fetchProducts();
