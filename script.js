const addBookButton = document.querySelector('.add-book-button')
addBookButton.addEventListener('click', openForm)


let myLibrary = [];


function openForm() {
       
}

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(title, author, pages) {
    const newBook = new Book(title, author, pages);
    myLibrary.push(newBook);
}

function createNewCard() {
    return;
}
