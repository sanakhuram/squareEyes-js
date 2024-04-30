
import { URL } from "./constants.mjs";
import { showLoadingIndicator, hideLoadingIndicator } from "./utils.mjs";

const url = document.location;
const search = url.search;
const params = new URLSearchParams(search);

async function fetchSingleMovie(id) {
  if (!id) throw new Error("Movie ID is undefined");
  const movieUrl = `${URL}/${id}`;

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
    const id = params.get("id");
    const movieDetails = document.getElementById("movie-details");
    showLoadingIndicator();
    setTimeout(async () => {
      try {
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
                <p><strong style="color:red;">Discounted Price:</strong> $${singleData.discountedPrice.toFixed(2)}</p>
                <button class="add-to-cart-button" data-movie-id="${singleData.id}" data-title="${singleData.title}" data-image="${singleData.image}" data-price="${singleData.price.toFixed(2)}">Add to Cart</button>
            </div>
        `;

        const addToCartButton = document.querySelector(".add-to-cart-button");
        addToCartButton.addEventListener("click", addToCartClicked);
      } catch (error) {
        console.error(error);
      }

      hideLoadingIndicator();
    }, 1000);
  } catch (error) {
    console.error(error);
    hideLoadingIndicator();
  }
}

function addToCartClicked(event) {
  const { movieId, title, image, price } = event.target.dataset;
  addToCart(movieId, title, image, price);
  updateCartCount();
}

function addToCart(movieId, title, image, price) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItemIndex = cartItems.findIndex((item) => item.id === movieId);
  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].quantity++;
  } else {
    cartItems.push({ id: movieId, title, image, price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function updateCartCount() {
  const cartCountElement = document.querySelector(".cart-count");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const currentCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  cartCountElement.textContent = `CART(${currentCount})`;

  const dropdownContent = document.querySelector(".dropdown-content");
  dropdownContent.innerHTML = cartItems
    .map(
      (item) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" style="width: 50px; border-radius: 10px;">
            <span class="cart-item-details">
                <span class="cart-item-title">${item.title}</span> - <span class="cart-item-quantity">${item.quantity}</span>
            </span>
        </div>
    `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderSingleMovie();
  updateCartCount();
});
