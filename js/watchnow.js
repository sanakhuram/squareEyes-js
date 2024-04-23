const url = document.location;
const search = url.search;
const params = new URLSearchParams(search);

async function fetchSingleMovie(id) {
    if (!id) throw new Error("Movie ID is undefined");
    const movieUrl = `https://api.noroff.dev/api/v1/square-eyes/${id}`;

    try {
        const response = await fetch(movieUrl);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.error(error);
    }
}
async function renderSingleMovie() {
    try {
        const id = params.get('id');
        const movieDetails = document.getElementById("movie-details");
        const singleData = await fetchSingleMovie(id);

        movieDetails.innerHTML = `
            <div class="movie-image">
                <img src="${singleData.image}" alt="${singleData.title}">
            </div>
            <div class="movie-info">
                <h2>${singleData.title}</h2>
                <p>${singleData.description}</p>
                <p><strong>Genre:</strong> ${singleData.genre}</p>
                <p><strong>Release Date:</strong> ${singleData.releaseDate}</p>
                <p><strong>Rating:</strong> ${singleData.rating}</p>
                <p><strong>Price:</strong> $${singleData.price.toFixed(2)}</p>
                <p><strong style=color:red;">Discounted Price:</strong> $${singleData.discountedPrice.toFixed(2)}</p>
                <button class="add-to-cart-button" 
                        data-movie-id="${singleData.id}" 
                        data-title="${singleData.title}" 
                        data-image="${singleData.image}" 
                        data-price="${singleData.price.toFixed(2)}">Add to Cart</button>
            </div>
        `;

        const addToCartButton = document.querySelector('.add-to-cart-button');
        addToCartButton.addEventListener('click', () => {
            const movieId = singleData.id;
            const title = singleData.title;
            const image = singleData.image;
            const price = singleData.price.toFixed(2);
            addToCart(movieId, title, image, price);
            updateCartCount();
        });
    } catch (error) {
        console.error(error);
    }
}


function addToCartClicked(event) {
    const button = event.target;
    const movieInfo = button.closest('.movie-info');
    const movieId = button.dataset.movieId || movieInfo.querySelector('[data-movie-id]').dataset.movieId;
    const title = button.dataset.title || movieInfo.querySelector('[data-title]').dataset.title;
    const image = button.dataset.image || movieInfo.querySelector('[data-image]').dataset.image;
    const price = button.dataset.price || movieInfo.querySelector('[data-price]').dataset.price;
    addToCart(movieId, title, image, price);
    updateCartCount();
}




function addToCart(movieId, title, image, price) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cartItems.findIndex(item => item.id === movieId);
    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity++;
    } else {
        cartItems.push({ 
            id: movieId, 
            title: title, 
            image: image, 
            price: price, 
            quantity: 1 
        });
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let currentCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = `CART(${currentCount})`;


    const cartDropdown = document.querySelector('.cart-dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');

    dropdownContent.innerHTML = '';

    cartItems.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.title;
        image.style.width = '50px';
        image.style.borderRadius = '10px';
        cartItemDiv.appendChild(image);

        const cartItemDetails = document.createElement('span');
        cartItemDetails.classList.add('cart-item-details');
        cartItemDetails.innerHTML = `
            <span class="cart-item-title">${item.title}</span> - <span class="cart-item-quantity">${item.quantity}</span>
        `;
        cartItemDiv.appendChild(cartItemDetails);

        dropdownContent.appendChild(cartItemDiv);
    });


}

document.addEventListener('DOMContentLoaded', () => {
    renderSingleMovie();
    updateCartCount();
});
document.addEventListener('DOMContentLoaded', function() {
    const genreToggle = document.getElementById('genre-toggle');
    const genreOptions = document.getElementById('genre-options');
  
    genreToggle.addEventListener('click', function() {
      genreOptions.classList.toggle('hidden');
    });
  });