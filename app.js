class Book {
  constructor(title, author, genre, year, price, cover) {
    this.id = crypto.randomUUID(); // Generate unique ID for each book
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.year = year;
    this.price = price;
    this.cover = cover; // URL for the cover image
  }
}

class BookStore {
  constructor() {
    this.store = JSON.parse(localStorage.getItem("store")) || [];

    // DOM Elements
    this.bookContainer = document.querySelector(".book-Cont .featured");
    this.addToCartBtns = document.querySelector(".desc-Btn .btn");
    this.dialog = document.querySelector("#dialog");
    this.form = document.querySelector("form");
    this.addBookBtn = document.querySelector(".addBookBtn");

    // Event Listeners
    this.addBookBtn.addEventListener("click", () => {
      this.dialog.classList.add("dialog");
      this.dialog.showModal();
    });
    this.form.addEventListener("submit", (e) => this.handleFormSubmit(e));

    // Initial Page Load
    this.displayHomePage();
  }

  handleFormSubmit(e) {
    e.preventDefault();

    // Collect input values
    const title = document.querySelector("#title").value.trim();
    const author = document.querySelector("#author").value.trim();
    const genre = document.querySelector("#genre").value.trim();
    const year = document.querySelector("#year").value.trim();
    const price = document.querySelector("#price").value.trim();
    const cover = document.querySelector("#cover").value.trim();

    if (!title || !author || !genre || !year || !price || !cover) {
      alert("Please fill out all fields!");
      return;
    }

    if (this.editingBookId) {
      // === Editing an existing book ===
      const book = this.store.find((b) => b.id === this.editingBookId);
      if (book) {
        book.title = title;
        book.author = author;
        book.genre = genre;
        book.year = year;
        book.price = price;
        book.cover = cover;
      }

      this.editingBookId = null; // Reset edit mode
    } else {
      // === Adding a new book ===
      const newBook = new Book(title, author, genre, year, price, cover);
      this.store.push(newBook);
    }

    this.updateLocalStorage();
    this.form.reset();
    this.dialog.close();
    this.displayHomePage();
  }

  updateLocalStorage() {
    localStorage.setItem("store", JSON.stringify(this.store));
  }

  displayHomePage() {
    this.bookContainer.innerHTML = ""; // Clear previous books

    if (this.store.length === 0) {
      const noBooks = document.createElement("p");
      noBooks.textContent = "No books available. Add a book!";
      this.bookContainer.appendChild(noBooks);
      return;
    }

    this.store.forEach((book, index) => {
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("f-book");

      // Book cover image
      const imgDiv = document.createElement("div");
      imgDiv.classList.add("f-bookImg");

      const coverImg = document.createElement("img");
      coverImg.classList.add("bookCover");
      coverImg.src = book.cover || "assets/images/book.png";
      coverImg.alt = `${book.title} cover`;

      imgDiv.appendChild(coverImg);

      // Book details
      const descDiv = document.createElement("div");
      descDiv.classList.add("f-bookDesc");

      const titleEl = document.createElement("h3");
      titleEl.classList.add("b-title");
      titleEl.textContent = book.title;

      const authorEl = document.createElement("h3");
      authorEl.classList.add("b-author");
      authorEl.textContent = book.author;

      const genreEl = document.createElement("h3");
      genreEl.classList.add("b-genre");
      genreEl.textContent = book.genre;

      const yearEl = document.createElement("h3");
      yearEl.classList.add("date");
      yearEl.textContent = `${book.year} G.C.`;

      const priceEl = document.createElement("h3");
      priceEl.classList.add("price");
      priceEl.textContent = `${book.price} ETB`;

      const addToCartBtn = document.createElement("button");
      addToCartBtn.classList.add("btn");
      addToCartBtn.textContent = "Add to Cart";
      addToCartBtn.addEventListener("click", () => alert("Added to Cart!"));

      descDiv.append(titleEl, authorEl, genreEl, yearEl, priceEl, addToCartBtn);

      // Hover Actions (using mouseover/mouseout)
      bookDiv.addEventListener("mouseenter", () => {
        // Prevent duplicate hover buttons
        if (bookDiv.querySelector(".hover-btns")) return;

        const newDiv = document.createElement("div");
        newDiv.classList.add("hover-btns");

        const favorite = document.createElement("button");
        favorite.classList.add("hover-btn");
        favorite.innerHTML = `<span class="material-symbols-outlined">heart_plus</span>`;

        favorite.addEventListener("click", () => {
          bookDiv.innerHtml += `<span class="material-symbols-outlined" ">bookmark</span>`;
        });

        const edit = document.createElement("button");
        edit.classList.add("hover-btn");
        edit.innerHTML = `<span class="material-symbols-outlined">edit</span>`;

        edit.addEventListener("click", () => {
          // Prefill form fields
          document.querySelector("#title").value = book.title;
          document.querySelector("#author").value = book.author;
          document.querySelector("#genre").value = book.genre;
          document.querySelector("#year").value = book.year;
          document.querySelector("#price").value = book.price;
          document.querySelector("#cover").value = book.cover;

          this.dialog.showModal();

          this.form.onsubmit = (e) => {
            e.preventDefault();

            book.title = document.querySelector("#title").value;
            book.author = document.querySelector("#author").value;
            book.genre = document.querySelector("#genre").value;
            book.year = document.querySelector("#year").value;
            book.price = document.querySelector("#price").value;
            book.cover = document.querySelector("#cover").value;

            this.updateLocalStorage();
            this.displayHomePage();
            this.dialog.close();

            // this.form.onsubmit = (e) => this.handleFormSubmit(e);
          };
        });

        const del = document.createElement("button");
        del.classList.add("hover-btn");
        del.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
        del.addEventListener("click", () => {
          let index = this.store.indexOf(book);
          this.store.splice(index, 1);
          this.updateLocalStorage();
          this.displayHomePage();
        });

        newDiv.append(favorite, edit, del);
        bookDiv.appendChild(newDiv);
      });

      bookDiv.addEventListener("mouseleave", () => {
        const hoverDiv = bookDiv.querySelector(".hover-btns");
        if (hoverDiv) hoverDiv.remove();
      });

      bookDiv.addEventListener("mouseleave", () => {
        // Remove the hover buttons when mouse leaves
        descDiv.querySelectorAll(".hover-btn").forEach((btn) => btn.remove());
      });

      // Append sections to bookDiv
      bookDiv.append(imgDiv, descDiv);

      // Add to container
      this.bookContainer.appendChild(bookDiv);
    });
  }
}

// Start the app when page loads
const bookStore = new BookStore();
