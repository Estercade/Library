let library = [];

var bookCount = 0;

// used give unique identifier attribute to each book
var bookIdentifierHandler = function() {
    var bookCount = 0;
    var getBookIdentifier = function() {
        bookCount++;
        return bookCount;
    }
    return { getBookIdentifier };
}();

function bookIdentifier() {
    bookCount++;
    return bookCount;    
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read == "true";
    this.identifier = bookIdentifier();
}

var table = document.getElementById("libraryTable");

// new row is inserted at i + 1 because
// the first table row is the column headings
function addBookToTable(i) {
    const newRow = table.insertRow(i + 1);
    newRow.id = `row${library[i].identifier}`;
    newRow.insertCell(0).innerText = library[i].title;
    newRow.insertCell(1).innerText = library[i].author;
    newRow.insertCell(2).innerText = library[i].pages;
    newRow.insertCell(3).appendChild(createReadButton(i));
    newRow.insertCell(4).appendChild(createDeleteButton(i));
    newRow.cells[4].classList.add("deleteButtonColumn");
}

function displayLibrary() {
    for (i = 0; i < library.length; i++) {
        const newRow = table.insertRow(i + 1);
        newRow.id = `row${library[i].identifier}`;
        newRow.insertCell(0).innerText = library[i].title;
        newRow.insertCell(1).innerText = library[i].author;
        newRow.insertCell(2).innerText = library[i].pages;
        newRow.insertCell(3).appendChild(createReadButton(i));
        newRow.insertCell(4).appendChild(createDeleteButton(i));
        newRow.cells[4].classList.add("deleteButtonColumn");
    }
}

function createReadButton(i) {
    const readButton = document.createElement("button");
    readButton.id = `readButton${library[i].identifier}`
    readButton.className = "readButton";
    library[i].read ? readButton.innerText = "READ" : readButton.innerText = "NOT READ";
    readButton.addEventListener("click", toggleRead);
    return readButton;
}

function toggleRead(e) {
    const readBookId = e.target.id.substring(10);
    for (let i = 0; i < library.length; i++) {
        if (library[i].identifier == readBookId) {
            const readButton = document.getElementById(`readButton${readBookId}`);
            library[i].read ? library[i].read = false : library[i].read = true;
            library[i].read ? readButton.innerText = "READ" : readButton.innerText = "NOT READ";
            break;
        }
    }
}

function createDeleteButton(i) {
    const deleteButton = document.createElement("button");
    deleteButton.id = `deleteButton${library[i].identifier}`;
    deleteButton.className = "deleteButton";
    deleteButton.innerText = "DELETE";
    deleteButton.addEventListener("click", deleteBook);
    return deleteButton;
}

function deleteBook(e) {
    // substring removes 'deleteButton' and returns identifier
    const deleteBookId = e.target.id.substring(12);
    for (let i = 0; i < library.length; i++) {
        if (library[i].identifier == deleteBookId) {
            library.splice(i, 1);
            table.deleteRow(i + 1);
            return;
        }
    }
}

const addBookFormToggleButton = document.getElementById("addBookFormToggleButton");

addBookFormToggleButton.addEventListener("click", openForm) 

function openForm() {
    formContainer.style.display = "block";
}

const formContainer = document.getElementById("formContainer");
formContainer.addEventListener("click", toggleForm);

function toggleForm(e) {
    if(e.target == formContainer) {
        formContainer.style.display = "none";
    }
}

const addBookTitle = document.getElementById("addBookTitle");
const addBookAuthor = document.getElementById("addBookAuthor");
const addBookPages = document.getElementById("addBookPages");
const addBookRead = document.getElementById("addBookRead");

const submitAddBookFormButton = document.getElementById("submitAddBookFormButton");
submitAddBookFormButton.addEventListener("click", submitAddBookForm);

// library.push returns length of library array
// with index of 1, so to get the correct index number
// of the new book we must subtract 1
function submitAddBookForm(e) {;
    e.preventDefault();
    if (!addBookTitle.validity.valid || !addBookAuthor.validity.valid || !addBookPages.validity.valid) {
        window.alert("Please enter a valid book.");
    } else {
        const book = new Book(`${addBookTitle.value}`, `${addBookAuthor.value}`, `${addBookPages.value}`, `${addBookRead.checked}`);
        const libraryArrayNumber = (library.push(book) - 1);
        addBookToTable(libraryArrayNumber);
        clearAddBookForm(libraryArrayNumber);
        formContainer.style.display = "none";
    }
}

function clearAddBookForm() {
    addBookTitle.value = addBookAuthor.value = addBookPages.value = "";
}

const closeFormButton = document.getElementById("closeFormButton");

closeFormButton.addEventListener("click", closeForm);

function closeForm() {
    formContainer.style.display = "none";
}

addBookTitle.addEventListener("focusout", checkValidity);
addBookAuthor.addEventListener("focusout", checkValidity);
addBookPages.addEventListener("focusout", checkValidity);

function checkValidity(e) {
    e.target.classList.remove("invalidInput");
    if (!e.target.validity.valid) {
        e.target.classList.add("invalidInput");
        console.log(e.target.classList);
    }
}

var theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", "false");

var dune = new Book("Dune", "Frank Herbert", "896", "true");

var neuromancer = new Book("Neuromancer", "William Gibson", "271", "false");

var frankenstein = new Book("Frankenstein", "Mary Shelley", "166", "true");

library.push(theHobbit);
library.push(dune);
library.push(neuromancer);
library.push(frankenstein);
displayLibrary();