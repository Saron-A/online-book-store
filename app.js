class BookStore {
  constructor() {
    store = JSON.parse(localStorage.getItem("store")) || [];

    this.layer = document.querySelector(".layerContent");
  }

  updateLocalStorage() {
    localStorage.setItem("store", JSON.stringify(store));
  }
}

class User {}

class Book {
  constructor(title, author, genre, date) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.date = date;

    newBook = {
      title,
      author,
      genre,
      date,
    };
    store = JSON.parse(localStorage.getItem("store")) || [];

    store.push(newBook);
    this.updateLocalStorage();
  }
}

let bookStore = new BookStore();
