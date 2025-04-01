let input = document.querySelector(".searchInput");
let span = document.querySelector(".search-icon");
let searchResults = document.querySelector(".search-results");

async function searchBook() {
  let bookTitle = input.value.toLowerCase().trim();
  try {
    let response = await fetch(
      `https://openlibrary.org/search.json?q=${bookTitle}`
    );

    let data = await response.json();
    console.log(data);

    bookInfo(data);
  } catch (error) {
    console.log(error);
  }
}

function bookInfo(data) {
  searchResults.innerHTML = "";
  let results = document.createElement("ul");
  for (let i = 0; i < data.docs.length; i++) {
    if (
      data.docs[i].has_fulltext === true &&
      data.docs[i].public_scan_b === true
    ) {
      let listItem = document.createElement("li");
      let link = document.createElement("a");
      link.href = `https://openlibrary.org${data.docs[i].key}`;
      link.target = "_blank";
      link.textContent = data.docs[i].title;

      listItem.append(link);
      results.append(listItem);
      searchResults.append(results);
      searchResults.showModal();

      console.log(listItem.textContent + link.href);
    }
  }
}

span.addEventListener("click", searchBook);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBook();
  }
});
