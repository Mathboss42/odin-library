const addBookButton = document.querySelector('.add-book-button');
addBookButton.addEventListener('click', openForm);
const addBookFormContainer = document.querySelector('.new-book-form-container');
const libraryContainer = document.querySelector('.library-container');
const newBookForm = document.querySelector('.new-book-form');
newBookForm.addEventListener('submit', addBookToLibrary);
const cardsContainer = document.querySelector('.cards-container');


let myLibrary = [];


function openForm() {
    addBookFormContainer.classList.remove('hidden');
    libraryContainer.classList.add('blurred');
}

function closeForm() {
    addBookFormContainer.classList.add('hidden');
    libraryContainer.classList.remove('blurred');
}

function Book(title, author, pages, read, dataIndex) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);
    this.dataIndex = dataIndex;
}

function addBookToLibrary(e) {
    e.preventDefault();
    // console.log('addBookToLibrary called');
    const data = new FormData(newBookForm);
    // console.log(data);
    let values = [];
    for (const [name,value] of data) {
        // console.log(name, ":", value)
        values.push(value);
    }
    // console.log(values);
    const newBook = new Book(values[0], values[1], values[2], values[3], myLibrary.length);
    myLibrary.push(newBook);
    console.log(myLibrary);
    closeForm();
    // createNewCard(newBook);
    displayBooks()
}

function displayBooks() {
    cardsContainer.textContent = '';
    console.log('displayBooks')
    for (let i = 0; i < myLibrary.length; i++) {
        createNewCard(myLibrary[i]);
    }
}

function createNewCard(book) {
    let stringTemplate = '';
    if (book.read) {    
        stringTemplate = `<p>Title: ${book.title}</p>
                        <p>Author: ${book.author}</p>
                        <p>Pages: ${book.pages}</p>
                        <div class="read-checkbox">
                            <input type="checkbox" id="card-read" checked disabled>
                            <label for="card-read">Read</label>
                        </div>
                        <button class="delete-button">Delete</button>`
    } else {
        stringTemplate = `<p>Title: ${book.title}</p>
                        <p>Author: ${book.author}</p>
                        <p>Pages: ${book.pages}</p>
                        <div class="read-checkbox">
                            <input type="checkbox" id="card-read" disabled>
                            <label for="card-read">Read</label>
                        </div>
                        <button class="delete-button">Delete</button>`
    }
    const placeholder = document.createElement('div');
    placeholder.classList.add('card');
    placeholder.setAttribute('data-index', book.dataIndex);
    placeholder.setHTML(stringTemplate);
    cardsContainer.appendChild(placeholder);
    console.log('createNewCard');
}

displayBooks();
