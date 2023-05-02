class Book {
  constructor(title, author) {
    this.id = Date.now().toString();
    this.title = title;
    this.author = author;
  }
}

const emptyTitle = document.getElementById('empty-title');
const emptyAuthor = document.getElementById('empty-author');

class BooksList {
  constructor() {
    this.books = [];
  }

  AddBook(title, author) {
    if (title === '') {
      emptyTitle.textContent = 'Please, Add the book title!';
      setTimeout(
        () => {
          emptyTitle.textContent = '';
        }, 3000,
      );
    } else if (author === '') {
      emptyAuthor.textContent = 'Please, Add the book author name!';
      setTimeout(
        () => {
          emptyAuthor.textContent = '';
        }, 3000,
      );
    } else {
      const newBook = new Book(title, author);
      this.books.push(newBook);
      document.querySelector('.success-before').textContent = 'Your Books is Added successfully';
      document.querySelector('.success-before').classList.add('success-after');
      setTimeout(
        () => {
          document.querySelector('.success-before').textContent = '';
          document.querySelector('.success-before').classList.remove('success-after');
        }, 3000,
      );
    }
  }

  // method to Remove an existing book in the Array
  RemoveBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
  }

  // Show books method
  ShowBooks() {
    const container = document.querySelector('.books');
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Update books
    this.books.forEach((book) => {
      // Create articles Container
      const bookInfo = document.createElement('div');
      bookInfo.classList.add('book-info', 'flex-row');
      bookInfo.innerHTML = `<p><span class="book-title">"${book.title}"</span> by <span class="book-author"> ${book.author}</span></p>`;

      // Create the Remove button
      const button = document.createElement('button');
      button.className = 'remove-book';
      button.type = 'button';
      button.textContent = 'Remove';

      // Set the book ID as a data attribute
      button.dataset.id = book.id;

      bookInfo.appendChild(button);

      // Add eventListener to remove button
      button.addEventListener('click', (event) => {
        const { id } = event.target.dataset;
        this.RemoveBook(id);
        this.ShowBooks();
      });

      container.appendChild(bookInfo);
    });

    // Update local storage
    this.StoreBooks();
  }

  StoreBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  GetBooks() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  Magic() {
    this.GetBooks();
    this.ShowBooks();

    // Add eventListner to the add button new book
    const addBookBtn = document.querySelector('#add-book');
    const form = document.getElementById('form');
    addBookBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const title = document.querySelector('#new-title').value;
      const author = document.querySelector('#new-author').value;
      this.AddBook(title, author);
      this.ShowBooks();
      form.reset();
    });
  }
}

const select = () => {
  const navbarList = document.getElementById('navbar');
  document.getElementById('form').style.display = 'none';
  document.getElementById('contact').style.display = 'none';
  navbarList.addEventListener('click', (event) => {
    if (event.target && event.target.matches('a.linkList')) {
      document.getElementById('form').style.display = 'none';
      document.getElementById('contact').style.display = 'none';
      if (document.getElementById('bookList').style.display === 'none') {
        document.getElementById('bookList').style.display = 'flex';
      }
    }
    if (event.target && event.target.matches('a.linkAdd')) {
      document.getElementById('bookList').style.display = 'none';
      document.getElementById('contact').style.display = 'none';
      if (document.getElementById('form').style.display === 'none') {
        document.getElementById('form').style.display = 'flex';
      }
    }
    if (event.target && event.target.matches('a.linkContact')) {
      document.getElementById('bookList').style.display = 'none';
      document.getElementById('form').style.display = 'none';
      if (document.getElementById('contact').style.display === 'none') {
        document.getElementById('contact').style.display = 'flex';
      }
    }
  });
};


const booksList = new BooksList();
booksList.Magic();
select();
document.querySelector('.date').textContent = new Date().toLocaleString();