const url = new URL(document.location); // Use `new URL` directly to get the URLSearchParams
const params = new URLSearchParams(url.search);

async function fetchSingleMovie(id) {
    if (!id) throw new Error("Movie Id is undefined"); // Corrected conditional check
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
        const singleData = await fetchSingleMovie(id);
        const MovieDetails = document.getElementById("movie-details");
        MovieDetails.innerHTML = `
        <div class= "movie-image">
            <img src="${singleData.image}" alt= "${singleData.title}">
        </div>
        <div class= "movie-info">
            <h2>${singleData.title}</h2>
            <p>${singleData.description}</p>
            <p><strong>Genre:</strong>${singleData.genre}</p>
            <p><strong>Rating:</strong>${singleData.rating}</p>
            <p><strong>Released:</strong>${singleData.released}</p>
            <p><strong>Price:</strong>$${singleData.price.toFixed(2)}</p>
            <p><strong>Discounted Price:</strong>$${singleData.discountedPrice.toFixed(2)}</p>
            <button class="add-to-cart-button" data-product-id="${singleData.id}" data-title="${singleData.title}" data-image="${singleData.image}" data-price="${singleData.price.toFixed(2)}">Add to Cart</button>
        </div>
        `;
        const addToCartButton = document.querySelector('.add-to-cart-button');
        addToCartButton.addEventListener('click', addToCartClicked);
    } catch (error) {
        console.error(error);
    }
}

function addToCartClicked(event) {
    const button = event.target;
    const productId = button.dataset.productId;
    const title = button.dataset.title;
    const image = button.dataset.image;
    const price = button.dataset.price;
    addToCart(productId, title, image, price);
    updateCartCount();
}

function addToCart(productId, title, image, price) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cartItems.findIndex(item => item.id === productId);
    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity++;
    } else {
        cartItems.push({ 
            id: productId, 
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
}

document.addEventListener('DOMContentLoaded', () => {
    renderSingleMovie();
    updateCartCount(); 
});

