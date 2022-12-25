const apiUrl = "http://www.omdbapi.com/?apikey=2a7d7e9f&s";

const searchForm = document.querySelector(".Search-box");
const searchButton = document.querySelector(".button");

// Set up the event listeners
searchForm.addEventListener("keypress", searchMovies);
searchButton.addEventListener("click", searchMovies);

function searchMovies(event) {
  // Only submit the form if the user pressed the Enter key or clicked the button
  if (event.key === "Enter" || event.type === "click") {
    // Get the search query from the form
    const query = searchForm.value;

    // Send a request to the API
    fetch(`${apiUrl}&s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        // Clear the existing movie results
        const movieContainer = document.getElementById("content");
        while (movieContainer.lastElementChild) {
          movieContainer.removeChild(movieContainer.lastElementChild);
        }

        // Loop through the movies and display them on the page
        for (const movie of data.Search) {
          // Create the movie element
          const movieElement = document.createElement("div");
          movieElement.classList.add("box");

          // Add the movie data to the element
          const title = document.createElement("div");
          title.textContent = `Title: ${movie.Title},(${movie.Year})`;
          movieElement.appendChild(title);

          const type = document.createElement("div");
          type.textContent = `Type: ${movie.Type}`;
          movieElement.appendChild(type);

          const poster = document.createElement("div");
          const posterImg = document.createElement("img");
          posterImg.src = movie.Poster;
          poster.appendChild(posterImg);
          movieElement.appendChild(poster);

          const moreinfo = document.createElement("div");
          const moreinfoLink = document.createElement("a");
          moreinfoLink.textContent = "More Details";
          moreinfoLink.target = "_blank";
          moreinfoLink.href = `https://www.imdb.com/title/${movie.imdbID}`;
          moreinfo.appendChild(moreinfoLink);
          movieElement.appendChild(moreinfo);

          // Add the movie element to the page
          movieContainer.appendChild(movieElement);
        }
      })
      .catch((error) => {
        console.error(error);
        // Display an error message to the user
        const errorElement = document.createElement("div");
        errorElement.textContent = "An error occurred while searching for movies. Please try again later.";
        errorElement.classList.add("error");
        movieContainer.appendChild(errorElement);
      });
  }
}
