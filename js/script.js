const URL = 'https://api.noroff.dev/api/v1/square-eyes';
let movies = [];

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
};

const displayMovies = async () => {
  try {
    const data = await fetchMovies(URL); 
    movies = data;
    const moviesContainer = document.querySelector('.movies');
    movies.forEach(movie => {
      moviesContainer.innerHTML +=
        `
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

function showLoadingIndicator() {
  const loadingIndicator = document.querySelector('.loading');
  loadingIndicator.classList.add('show');
}

function hideLoadingIndicator() {
  const loadingIndicator = document.querySelector('.loading');
  loadingIndicator.classList.remove('show');
}

document.addEventListener('DOMContentLoaded', () => {
  showLoadingIndicator();
  setTimeout(displayMovies, 2000); 
});


document.addEventListener('DOMContentLoaded', function () {
  const genreToggle = document.getElementById('genre-toggle');
  const genreOptions = document.getElementById('genre-options');

  genreToggle.addEventListener('click', function () {
    genreOptions.classList.toggle('hidden');
  });
});
