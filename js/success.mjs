document.addEventListener("DOMContentLoaded", function () {
    function displayMessage() {
      const messageContainer = document.querySelector(".message-container");
      messageContainer.style.display = "block";
    }
  
    setTimeout(displayMessage, 1000);
});
  
document.addEventListener('DOMContentLoaded', function() {
  const genreToggle = document.getElementById('genre-toggle');
  const genreOptions = document.getElementById('genre-options');

  genreToggle.addEventListener('click', function() {
    genreOptions.classList.toggle('hidden');
  });
});