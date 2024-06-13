'use strict';
import musicService from './music-group-service.js';

// Module
const _musicService = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);

// Pagination
const _pageSize = 10;
let _currentPage = 0;
let _maxNrPages;

// Element
const groupList = document.querySelector("#groupList");
const btnPrev = document.querySelector("#btnPrev");
const btnNext = document.querySelector("#btnNext");

// Event listener
btnPrev.addEventListener("click", clickPrev);
btnNext.addEventListener("click", clickNext);

async function clickPrev (e) {
    if (_currentPage > 0) {
        _currentPage--;
        await readMusicGroupsAsync(_currentPage);
    }
}

async function clickNext (e) {
    if (_currentPage < _maxNrPages - 1) {
        _currentPage++;
        await readMusicGroupsAsync(_currentPage);
    }
}

// Helpers
function addRow(musicGroupId, name, strGenre, publishedYear, copiesSold) {
    let divRow = document.createElement("Hello");
    divRow.classList.add("trFluid");

    let divGroup2 = document.createElement("div");
    divGroup2.classList.add("trFluid_Grouping2");
    divRow.appendChild(divGroup2);

    let divGroup1_1 = document.createElement("div");
    divGroup1_1.classList.add("trFluid_Grouping1");
    let divGroup1_2 = document.createElement("div");
    divGroup1_2.classList.add("trFluid_Grouping1");
    divGroup2.appendChild(divGroup1_1);
    divGroup2.appendChild(divGroup1_2);

    let divFluent1 = document.createElement("div");
    divFluent1.classList.add("tdFluent");
    divFluent1.innerText = name;
    divGroup1_1.appendChild(divFluent1);

    let divFluent2 = document.createElement("div");
    divFluent2.classList.add("tdFluent");
    divFluent2.innerText = strGenre;

    let divFluent3 = document.createElement("div");
    divFluent3.classList.add("tdFluent");
    divFluent3.innerText = publishedYear;

    divGroup1_2.appendChild(divFluent2);
    divGroup1_2.appendChild(divFluent3);

    //<a href="./new-book.html">View book</a>
    let a_tag = document.createElement("a");
    a_tag.innerText = 'View group';
    a_tag.href = `./new-book.html?id=${musicGroupId}`;
    divGroup1_2.appendChild(a_tag);

    groupList.appendChild(divRow);
}

async function readMusicGroupsAsync(_pageNr) {
    while (groupList.firstElementChild != null) {
        groupList.removeChild(groupList.firstElementChild);
    }

    let response = await _musicService.readMusicGroupsAsync(_pageNr, false, null, _pageSize);
    response.pageItems.forEach(b => {addRow(b.musicGroupId, b.name, b.strGenre, b.establishedYear, b.artists.length);});

    _maxNrPages = response.pageCount;
}

// Init
(async function pageInit() 
    {
        await readMusicGroupsAsync(_currentPage);
    })();

