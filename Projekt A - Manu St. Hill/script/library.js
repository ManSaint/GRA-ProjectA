'use strict';
import {seedGenerator, uniqueId, randomNumber, deepCopy} from '../../../SeidoHelpers/seido-helpers.js';

export function Book (title, author, genre, millionSold, publishYear){

    this.bookId = uniqueId();
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.millionsSold = millionSold;
    this.publishedYear = publishYear;

    this.toString = function () {
        return `${this.title} written by ${this.author} in the year ${this.publishedYear}. ${this.millionsSold} million copies sold`;}

    this.seed = function (_seeder) {

        this.title = _seeder.fromString('The Shining, Harry Potter and the Philosophers Stone, The Da Vinci Code, And Then There Were None, The Lord of the Rings, Coming Up for Air, To Kill a Mockingbird, Pride and Prejudice, The Old Man and the Sea, The Great Gatsby');
        this.author = _seeder.fromString("Stephen King, J.K. Rowling, Dan Brown, Agatha Christie, J.R.R. Tolkien, George Orwell, Harper Lee, Jane Austen, Ernest Hemingway, F. Scott Fitzgerald");
        this.genre = _seeder.fromString("Adventure, Horror, SciFi, Computers, Animals, Children");
        this.millionsSold = randomNumber(1, 100);
        this.publishedYear = randomNumber(1800, 2020);
        return this;
    }

    this.seedMany = function (nrItems, _seeder) {
        let books = [];
        for (let index = 0; index < nrItems; index++) {

            const b = new Book().seed(_seeder);
            books.push(b);
        };
        return books;
    }
}

export function LibraryService (storage) {

    if (!storage) {

        const _seeder = new seedGenerator();
        this.books = new Book().seedMany(1_000, _seeder);
    }
    else {
        const tmp = storage.getItem('LibraryService');
        if (tmp) {
            this.books = JSON.parse(tmp);
        }
        else {
            const _seeder = new seedGenerator();
            this.books = new Book().seedMany(1_000, _seeder);
            storage.setItem('LibraryService', JSON.stringify(this.books));
        }
    }

    //services
    this.info = function (genre) {

        if (genre === undefined) return this.books.length;

        let count = 0;
        this.books.forEach(b => {
            if (b.genre === genre)
                {
                    count++;
                }
            });
        return count;
    }
    
    this.readBooks = function(pageNr, pageSize) {

        //return this.books;

        const ret = {};

        ret.pageNr = pageNr;
        ret.pageSize = pageSize;
        ret.maxNrPages = Math.ceil(this.books.length/pageSize);
        ret.totalCount = this.books.length;

        ret.pageItems = this.books.slice(pageNr*pageSize, pageNr*pageSize + pageSize);

        return ret;
    }

    this.readBook = function(id)
    {
        return this.books.find(book => book.bookId === id);
    }
}