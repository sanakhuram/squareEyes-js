// Import necessary functions from utils.js
import { fetchData, showLoadingIndicator, hideLoadingIndicator, updateCartCount, updateBasketCountInView, updateBasketCountInLocalStorage, clearBasketCountInLocalStorage } from "./utils.mjs";
import { URL } from "./constants.mjs";

let movies = [];
let basketCount = 0;

function updateBasketCountFromLocalStorage() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const basketCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    updateBasketCountInView(basketCount); 
}

function addItemToBasket() {
  
    updateBasketCountFromLocalStorage();
}

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
        updateBasketCountFromLocalStorage();
    } catch (error) {
        console.error(error);
        hideLoadingIndicator();
    }
};

window.addEventListener("storage", (event) => {
    if (event.key === "cart") {
        updateBasketCountFromLocalStorage(); 
    }
});

document.addEventListener("DOMContentLoaded", () => {
    showLoadingIndicator();
    setTimeout(displayMovies, 1000);
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
updateBasketCountInView(basketCount);

updateBasketCountFromLocalStorage();

clearBasketCountInLocalStorage();


