let library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBook(book) {
    library.push(book);
}

var table = document.getElementById("library");


function displayLibrary() {
    for (i = 0; i < library.length; i++) {
        const newRow = table.insertRow(i + 1);
        newRow.insertCell(0).innerText = library[i].title;
        newRow.insertCell(1).innerText = library[i].author;
        newRow.insertCell(2).innerText = library[i].pages;
        newRow.insertCell(3).innerText = library[i].read;
        newRow.insertCell(4).appendChild(createDeleteButton(i));
    }
}

function createDeleteButton(i) {
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.id = `deleteButton${i + 1}`;
    deleteButton.className = "deleteButton";
    deleteButton.innerText = "DELETE";
    return deleteButton;
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", "NOT READ");

const dune = new Book("Dune", "Frank Herbert", "896", "READ");

const neuromancer = new Book("Neuromancer", "William Gibson", "271", "NOT READ");

const frankenstein = new Book("Frankenstein", "Mary Shelley", "166", "READ");

addBook(theHobbit);
addBook(dune);
addBook(neuromancer);
addBook(frankenstein);
displayLibrary();