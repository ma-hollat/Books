const form = document.querySelector("#book-form");
const bookList = document.querySelector(".collection");
const bookInput = document.querySelector("#book");
const filterInput = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear-books");

loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', getBooks);
    //Add a book event
    form.addEventListener('submit', addBook);
    //Remove Book
    bookList.addEventListener('click', removeBook);
    //Clear all books
    clearBtn.addEventListener('click', clearBooks);
    //filter books
    filterInput.addEventListener('keyup', filterBooks);
}

//get tasts from local storage
function getBooks(){
    let books;
    if(localStorage.getItem('books')==null){
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    books.forEach(function(book){
        //create li element
        const li = document.createElement('li');
        //add class name to the li element
        li.className = 'collection-item';
        //create a textmode and append it to the li
        li.appendChild(document.createTextNode(book));

        const link = document.createElement('a');
        //add a class to the a element
        link.className = 'delete-item secondary-content';
        link.innerHTML = 'X';
        li.appendChild(link);
        bookList.appendChild(li);
    });
}

function addBook(event){
    //check for empty input
    if(bookInput.value === ''){
        alert('Enter a Book');
    }

    //Create an li element to add to the ul
    const li = document.createElement('li');
    //Add a clear name to the li element
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(bookInput.value));
    //create a new anchor element
    const link = document.createElement('a');
    //add a class to the a element
    link.className = 'delete-item secondary-content';
    link.innerHTML = 'X';
    li.appendChild(link);
    bookList.appendChild(li);

    //store in LocalStorage
    storeInLocalStorage(bookInput.value);
    bookInput.value = '';

    event.preventDefault();
}

function storeInLocalStorage(book){
    //declare an array to read from the local storage
    let books;
    if(localStorage.getItem("books") === null){
        books =[];
    } else{
        books = JSON.parse(localStorage.getItem('books'));
    }

    //add a books to the books array
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books))
}

function removeBook(event){
    if(event.target.classList.contains('delete-item')){
        if(confirm('Are you sure about that')){
            event.target.parentElement.remove();

            //Remove from local storage
            removeBookFromLocalStorage(event.target.parentElement);
        }
    }
}

function removeBookFromLocalStorage(bookItem){
    let books;

    if(localStorage.getItem('books') === null){
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    books.forEach(function(book, index){
        if(bookItem.textContent.slice(0, -1) === book){
            books.splice(index, 1)
        }
    });

    localStorage.setItem('books', JSON.stringify(books));
}

function clearBooks(){
    if(confirm('Are you sure about that')){
        while(bookList.firstChild){
            bookList.removeChild(bookList.firstChild);
        } 
        localStorage.clear();
    }
}

function filterBooks(event){
    const userFilter = event.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(book){
        const item = book.firstChild.textContent;
        if(item.toLowerCase().indexOf(userFilter) != -1){
            book.style.display = 'block';
        } else{
            book.style.display = 'none';
        }
    });
}