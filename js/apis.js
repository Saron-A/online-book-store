let input = document.querySelector(".searchInput");
let span = document.querySelector(".search-icon");
let searchResults = document.querySelector(".search-results");

async function searchBook() {
  let bookTitle = input.value.toLowerCase().trim();
  try {
    let response = await fetch(
      `https://openlibrary.org/search.json?title=${bookTitle}`
    );

    let data = await response.json();
    console.log(data);

    bookInfo(data);
  } catch (error) {
    console.log(error);
  }
}

function bookInfo(data) {
  searchResults.innerHTML = ""; // Clear previous results

  if (data.docs.length === 0) {
    searchResults.innerHTML = `<p>No results found for "${input.value}".</p>`;
    return;
  }

  data.docs.forEach((book) => {
    let bookDiv = document.createElement("div");
    bookDiv.classList.add("book-item");

    let title = book.title || "No title available";
    let author = book.author_name ? book.author_name.join(", ") : "Unknown";
    let coverId = book.cover_i ? book.cover_i : "No cover available";

    bookDiv.innerHTML = `
      <img src="https://covers.openlibrary.org/b/id/${coverId}-M.jpg" alt="${title}">
      <h3>${title}</h3>
      <p>Author: ${author}</p>
    `;

    searchResults.appendChild(bookDiv);
  });
}

span.addEventListener("click", searchBook);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBook();
  }
});
