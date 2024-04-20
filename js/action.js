const URL = 'https://api.noroff.dev/api/v1/square-eyes';
let movies = [];
let cartArray = [];

const fetchMovies = async (url) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.error(error);
        throw error; 
    }
}

const displayActionMovies = async () => {
    try {
        showLoadingIndicator();
        movies = await fetchMovies(URL);
        const movieContainer = document.querySelector('.movies');
       
        movies.forEach(movie => {
            if (movie.genre.toLowerCase() === 'action') { 
                movie.quantity = 1;
                movieContainer.innerHTML +=
                    `
                    <div class="movie" data-movie-id="${movie.id}">
                        <h2>${movie.title}</h2>
                        <p>${movie.description}</p>
                        <a href="watchnow.html?id=${movie.id}">
                            <img src="${movie.image}" alt="${movie.title}">
                        </a>
                        <div class="movie-price">$${movie.price.toFixed(2)}</div>
                    </div>
                    `;
            }
        });
        hideLoadingIndicator();
    } catch (error) {
        console.error(error);
        hideLoadingIndicator();
    }
}

function showLoadingIndicator() {
    const loadingIndicator = document.querySelector('.loading');
    loadingIndicator.classList.add('show');
}

function hideLoadingIndicator() {
    const loadingIndicator = document.querySelector('.loading');
    loadingIndicator.classList.remove('show');
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        displayActionMovies();
    } catch (error) {
        console.error(error);
    }
});
