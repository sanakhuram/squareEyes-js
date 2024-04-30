import { URL } from "./constants.mjs";
import {
  fetchData,
  showLoadingIndicator,
  hideLoadingIndicator,
  updateCartCount,
  updateCart,
} from "./utils.mjs";

let movies = [];

const displayMovies = async () => {
  try {
    const data = await fetchData(URL);
    movies = data;
    const moviesContainer = document.querySelector(".movies");
    movies.forEach((movie) => {
      moviesContainer.innerHTML += `
      <div class="movie" data-movie-id="${movie.id}">
        <h2>${movie.title}</h2>
        <p>${movie.description}</p>
        <a href="./product/index.html?id=${movie.id}">
          <img src="${movie.image}" alt="${movie.title}">
        </a>
        <div class="movie-price">$${movie.price.toFixed(2)}</div>
      </div>
      `;
    });
    hideLoadingIndicator();
  } catch (error) {
    console.error(error);
    hideLoadingIndicator();
  }
};

window.addEventListener("storage", (event) => {
  if (event.key === "cart") {
    updateCartCount();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  showLoadingIndicator();
  setTimeout(displayMovies, 2000);
});

const filterMoviesByGenre = (genre) => {
  const moviesContainer = document.querySelector(".movies");
  const heading = document.querySelector(".genre-heading");
  showLoadingIndicator();
  
 

  setTimeout(() => {
    moviesContainer.innerHTML = "";
    heading.textContent = "";
    movies.forEach((movie) => {
      if (genre === "all" || movie.genre.toLowerCase() === genre) {
        moviesContainer.innerHTML += `
        <div class="movie" data-movie-id="${movie.id}">
          <h2>${movie.title}</h2>
          <p>${movie.description}</p>
          <a href="./product/index.html?id=${movie.id}">
            <img src="${movie.image}" alt="${movie.title}">
          </a>
          <div class="movie-price">$${movie.price.toFixed(2)}</div>
        </div>
        `;
      }
    });

   
    hideLoadingIndicator();

    if (genre === "all") {
      heading.textContent = "All Movies";
    } else {
      heading.textContent = `${
        genre.charAt(0).toUpperCase() + genre.slice(1)
      }  Movies `;
    }
  }, 1000); 
};

document.getElementById("filter-genre-all").addEventListener("click", () => {
  filterMoviesByGenre("all");
});

document.getElementById("filter-genre-action").addEventListener("click", () => {
  filterMoviesByGenre("action");
});

document.getElementById("filter-genre-drama").addEventListener("click", () => {
  filterMoviesByGenre("drama");
});

document.getElementById("filter-genre-comedy").addEventListener("click", () => {
  filterMoviesByGenre("comedy");
});

document.getElementById("filter-genre-kids").addEventListener("click", () => {
  filterMoviesByGenre("kids");
});

document.getElementById("filter-genre-horror").addEventListener("click", () => {
  filterMoviesByGenre("horror");

 
});
updateCartCount();
 




// Function to update the cart badge count
function updateCartBadge(count) {
  const cartBadge = document.getElementById('cart-badge');
  cartBadge.textContent = count;
}

// Function to add item to cart
function addToCart(movieId, title, image, price) {
  // Your existing addToCart logic here
  
  // Update the cart badge count
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const currentCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  updateCartBadge(currentCount);
}

// Usage Example:
// Call addToCart function when adding an item to the cart
// addToCart(movieId, title, image, price);
