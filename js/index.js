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

function addBook(book) {
    library.push(book);
}

var table = document.getElementById("library");


function displayLibrary() {
    for (i = 0; i < library.length; i++) {
        const newRow = table.insertRow(i + 1);
        newRow.id = `row${library[i].identifier}`;
        newRow.insertCell(0).innerText = library[i].title;
        newRow.insertCell(1).innerText = library[i].author;
        newRow.insertCell(2).innerText = library[i].pages;
        newRow.insertCell(3).innerText = library[i].read;
        newRow.insertCell(4).appendChild(createDeleteButton(i));
    }
    addDelete();
}

function createDeleteButton(i) {
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.id = `deleteButton${library[i].identifier}`;
    deleteButton.className = "deleteButton";
    deleteButton.innerText = "DELETE";
    return deleteButton;
}

const deleteButtonsList = document.getElementsByClassName("deleteButton");
function addDelete() {
    for (let item of deleteButtonsList) {
        item.addEventListener("click", deleteBook);
        }
    }

var tableRows = table.rows;
console.log(tableRows);

function deleteBook(e) {
    // substring removes 'deleteButton' and returns identifier
    const deleteBookId = e.target.id.substring(12);
    for (let i = 0; i < library.length; i++) {
        if (library[i].identifier == deleteBookId) {
            library.splice(i, 1);
        }
    }
    // substring removes 'row' and returns only identifier
    for (let i = 0; i < table.rows.length; i++) {
        if (tableRows[i].id.substring(3) == deleteBookId) {
            table.deleteRow(i);
        }
    }
}

var theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", "NOT READ");

var dune = new Book("Dune", "Frank Herbert", "896", "READ");

var neuromancer = new Book("Neuromancer", "William Gibson", "271", "NOT READ");

var frankenstein = new Book("Frankenstein", "Mary Shelley", "166", "READ");

addBook(theHobbit);
addBook(dune);
addBook(neuromancer);
addBook(frankenstein);
displayLibrary();