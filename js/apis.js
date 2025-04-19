let input = document.querySelector(".searchInput");
let span = document.querySelector(".search-icon");
let searchResults = document.querySelector(".search-results");

// async function searchBook() {
//   let bookTitle = input.value.toLowerCase().trim();
//   try {
//     let response = await fetch(
//       `https://openlibrary.org/search.json?title=${bookTitle}`
//     );

//     let data = await response.json();
//     console.log(data);

//     bookInfo(data);
//   } catch (error) {
//     console.log(error);
//   }
// }

// function bookInfo(data) {
//   searchResults.innerHTML = ""; // Clear previous results

//   if (data.docs.length === 0) {
//     searchResults.innerHTML = `<p>No results found for "${input.value}".</p>`;
//     return;
//   }

//   data.docs.forEach((book) => {
//     let bookDiv = document.createElement("div");
//     bookDiv.classList.add("book-item");

//     let title = book.title || "No title available";
//     let author = book.author_name ? book.author_name.join(", ") : "Unknown";
//     let coverId = book.cover_i ? book.cover_i : "No cover available";

//     bookDiv.innerHTML = `
//       <img src="https://covers.openlibrary.org/b/id/${coverId}-M.jpg" alt="${title}">
//       <h3>${title}</h3>
//       <p>Author: ${author}</p>
//     `;

//     searchResults.appendChild(bookDiv);
//   });
// }

async function searchBook() {
  let bookTitle = input.value.toLowerCase().trim();

  let response1 = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      bookTitle
    )}&langRestrict=en&printType=books&maxResults=20`
  ); //google books api

  let data = response1.data;
  console.log(data);

  let response2 = await axios.get(
    `https://openlibrary.org/search.json?title=${bookTitle}`
  ); //openlibrary

  bookInfo(data, response2);
}

function bookInfo(data, response2) {
  searchResults.innerHTML = "";

  const language = book.volumeInfo.language;
  const isEmbeddable = book.accessInfo.embeddable;
  const isEpubAvailable = book.accessInfo.epub?.isAvailable;
  const isPdfAvailable = book.accessInfo.pdf?.isAvailable;

  // Filter only English books with download availability
  if (
    language === "en" &&
    isEmbeddable &&
    (isEpubAvailable || isPdfAvailable)
  ) {
    let title = book.volumeInfo.title;
    let bookLink = book.accessInfo.webReaderLink;
    let author = book.volumeInfo.authors?.[0] || "Unknown author";
    let coverimg = book.volumeInfo?.smallThumbnail || "fallback.jpg";

    searchResults.innerHTML += `
        <div class="s-result">
         <img src="${coverimg}" alt="${title}">
        <h3>${author}</h3>
      <h3><a href="${bookLink}" target="_blank">${title}</a></h3>
      
        
        </div>`;

    console.log(title, author, bookLink);
  }
}

span.addEventListener("click", searchBook);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBook();
  }
});
