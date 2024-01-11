const dialog = document.querySelector('dialog');
const addBookBtn = document.querySelector('#add_new_book');
const submitBtn = document.querySelector('#submit_btn');
const cancelBtn = document.querySelector('#cancel_btn');

const gridContainer = document.querySelector('.cards-container');

//to display and close the dialog
addBookBtn.addEventListener('click', () => {
    dialog.showModal();
})

function resetForm(){
    form.reset();
}

function closeDialog() {
    dialog.close();
}

cancelBtn.addEventListener('click', closeDialog);

//to store books
const library = [];

//book class
class Book {
    constructor(title, author, publishYear, pages, isRead) {
        this.title = title;
        this.author = author;
        this.year = publishYear;
        this.pages = pages;
        this.isRead = isRead;
    }
}

//creates and adds books to library
function addBookToLibrary() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const publishYear = document.querySelector('#publish-year').value;

    const pages = document.querySelector('#pages').value;
    const readInfo = document.querySelector('#isRead');

    let readStatus;
    if (readInfo.checked) {
        readStatus = 'Read';
    }
    else {
        readStatus = 'Not read yet';
    }

    const newBook = new Book(title, author, publishYear, pages, readStatus);
    library.push(newBook);
    displayLibrary();
}


function resetBooksGrid() {
    gridContainer.innerHTML = '';
}


function deleteElement(e) {
    gridContainer.removeChild(e.target.parentElement.parentElement);
}

//displays books
function displayLibrary() {
    resetBooksGrid();
    library.map((book) => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const title = document.createElement('h3');
        title.textContent = `${book.title}`;
        const author = document.createElement('h4');
        author.textContent = `${book.author}`;
        const publishYear = document.createElement('p');
        publishYear.textContent = `Published in ${book.year}`;
        const pages = document.createElement('p');
        pages.textContent = `${book.pages} pages`;

        const hasRead = document.createElement('p');
        hasRead.textContent = book.isRead;

        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('class', 'delete-btn');
        button.onclick = deleteElement;

        const img = document.createElement('img');
        img.setAttribute('src', './icons/trash-can.svg');
        img.setAttribute('alt', 'Delete icon');

        button.appendChild(img);

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(publishYear);
        card.appendChild(pages);
        card.appendChild(hasRead);
        card.appendChild(button);

        gridContainer.appendChild(card);
    })
}

displayLibrary(); //initial render

// to handle the dialog form
const form = document.querySelector('form');
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
        alert('Invalid input!');
    }
    else {
        addBookToLibrary();
        resetForm();
        closeDialog();
    }
});