'use strict';
import {Book, LibraryService } from './library.js';

// Module global variables
let url = new URL(window.location);
let params = url.searchParams;
let id = params.get("id"); 
const _library = new LibraryService(sessionStorage);

// Element
const bookTitle = document.querySelector("#bookName");

// Init
(() => {
    const book = _library.readBook(id);
    bookTitle.value = book.title;
})();