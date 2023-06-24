let library = [];

var bookCount = 0;

function bookIdentifier() {
    bookCount++;
    return bookCount;    
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.identifier = bookIdentifier();
}

var table = document.getElementById("library");

var tableRows = table.rows;

function displayLibrary() {
    for (i = 0; i < library.length; i++) {
        const newRow = table.insertRow(i + 1);
        newRow.id = `row${library[i].identifier}`;
        newRow.insertCell(0).innerText = library[i].title;
        newRow.insertCell(1).innerText = library[i].author;
        newRow.insertCell(2).innerText = library[i].pages;
        newRow.insertCell(3).appendChild(createReadButton(i));
        newRow.insertCell(4).appendChild(createDeleteButton(i));
    }
    addDeleteListener();
    addReadListener();
}

function createReadButton(i) {
    const readButton = document.createElement("button");
    readButton.id = `readButton${library[i].identifier}`
    readButton.className = "readButton";
    readButton.innerText = library[i].read;
    return readButton;
}

const readButtonsList = document.getElementsByClassName("readButton");
function addReadListener() {
    for (let item of readButtonsList) {
        item.addEventListener("click", toggleRead);
    }
}

function toggleRead(e) {
    const readBookId = e.target.id.substring(10);
    for (let i = 0; i < library.length; i++) {
        if (library[i].identifier == readBookId) {
            library[i].read == "READ" ? library[i].read = "NOT READ" : library[i].read = "READ";
            console.log(library[i]);
            document.getElementById(`readButton${i + 1}`).innerText = library[i].read;
            return;
        }
    }
}

function createDeleteButton(i) {
    const deleteButton = document.createElement("button");
    deleteButton.id = `deleteButton${library[i].identifier}`;
    deleteButton.className = "deleteButton";
    deleteButton.innerText = "DELETE";
    return deleteButton;
}

const deleteButtonsList = document.getElementsByClassName("deleteButton");
function addDeleteListener() {
    for (let item of deleteButtonsList) {
        item.addEventListener("click", deleteBook);
        }
    }

function deleteBook(e) {
    // substring removes 'deleteButton' and returns identifier
    const deleteBookId = e.target.id.substring(12);
    for (let i = 0; i < library.length; i++) {
        if (library[i].identifier == deleteBookId) {
            library.splice(i, 1);
            return;
        }
    }
    // substring removes 'grow' and returns only identifier
    for (let i = 0; i < table.rows.length; i++) {
        if (tableRows[i].id.substring(3) == deleteBookId) {
            table.deleteRow(i);
        }
    }
}

const addBookButton = document.getElementById("addBookButton");



var theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", "NOT READ");

var dune = new Book("Dune", "Frank Herbert", "896", "READ");

var neuromancer = new Book("Neuromancer", "William Gibson", "271", "NOT READ");

var frankenstein = new Book("Frankenstein", "Mary Shelley", "166", "READ");

function addBook(book) {
    library.push(book);
}

addBook(theHobbit);
addBook(dune);
addBook(neuromancer);
addBook(frankenstein);
displayLibrary();