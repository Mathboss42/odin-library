const addBookButton = document.querySelector('.add-book-button');
addBookButton.addEventListener('click', openForm);
const addBookFormContainer = document.querySelector('.new-book-form-container');
const libraryContainer = document.querySelector('.library-container');
const newBookForm = document.querySelector('.new-book-form');
newBookForm.addEventListener('submit', addBookToLibrary);
const cardsContainer = document.querySelector('.cards-container');

document.addEventListener('click', function(e){
    const target = e.target.closest('.delete-button');
    if (target) {
        deleteCard(target);
    }
});

document.addEventListener('click', function(e){
    const target = e.target.closest('input[type=checkbox]');
    const book = target.closest('.card').dataset.index;
    if (target) {
        myLibrary[book].switchReadStatus();
    }
});


let myLibrary = [
    // {
    //     title: 'Hello',
    //     author: 'Goodbye',
    //     pages: 200,
    //     read: true,
    //     dataIndex: 0,
    // },
    // {
    //     title: 'SAW',
    //     author: 'ASFA#EGA',
    //     pages: 14,
    //     read: false,
    //     dataIndex: 1,
    // },
    // {
    //     title: 'ghuhu',
    //     author: 'wt',
    //     pages: 123,
    //     read: true,
    //     dataIndex: 2,
    // },
];


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

Book.prototype.switchReadStatus = function() {
    this.read = !(this.read);
}

function addBookToLibrary(e) {
    e.preventDefault();
    const data = new FormData(newBookForm);
    let values = [];
    for (const [name,value] of data) {
        values.push(value);
    }
    const newBook = new Book(values[0], values[1], values[2], values[3], myLibrary.length);
    myLibrary.push(newBook);
    closeForm();
    displayBooks()
}

function displayBooks() {
    cardsContainer.textContent = '';
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
                            <input type="checkbox" id="card-read-${myLibrary.indexOf(book)}" checked>
                            <label for="card-read-${myLibrary.indexOf(book)}">Read</label>
                        </div>
                        <button class="delete-button" data-index="${book.dataIndex}">Delete</button>`
    } else {
        stringTemplate = `<p>Title: ${book.title}</p>
                        <p>Author: ${book.author}</p>
                        <p>Pages: ${book.pages}</p>
                        <div class="read-checkbox">
                            <input type="checkbox" id="card-read-${myLibrary.indexOf(book)}">
                            <label for="card-read-${myLibrary.indexOf(book)}">Read</label>
                        </div>
                        <button class="delete-button" data-index="${book.dataIndex}">Delete</button>`
    }

    const placeholder = document.createElement('div');
    placeholder.classList.add('card');
    placeholder.setAttribute('data-index', book.dataIndex);
    // placeholder.setHTML(stringTemplate);
    placeholder.innerHTML = stringTemplate;
    cardsContainer.appendChild(placeholder);
}

function resetDataIndex() {
    myLibrary = myLibrary.map((element, index) => {
        element.dataIndex = index;
        return element;
    });

    const cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].dataset.index = i;
    }

    const buttons = document.querySelectorAll('.delete-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].dataset.index = i;
    }

    const checkboxes = document.querySelectorAll('input[id^=card-read]');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].id = `card-read-${i}`;
    }

    const labels = document.querySelectorAll('label[for^=card-read]');
    for (let i = 0; i < labels.length; i++) {
        labels[i].setAttribute('for', `card-read-${i}`);
    }
}

function deleteCard(target) {
    const currentCard = document.querySelector(`div [data-index="${target.dataset.index}"]`);
    currentCard.remove();
    myLibrary.splice(target.dataset.index, 1);
    resetDataIndex();
}


displayBooks();