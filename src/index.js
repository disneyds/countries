import './styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import makeCardMarkup from './templates/card.hbs';
import fetchCountries from "./js/fetchCountries";
import getRefs from './js/refs';
import { alert, notice, error } from '@pnotify/core';

const debounce = require('lodash.debounce');

const refs = getRefs();
let searchText = "";

refs.searchInput.addEventListener('input', debounce(onInputChange, 500) );
refs.btn.addEventListener('click', onBtnClick );

function renderCards(country) {
    const markup = makeCardMarkup(country);
    
    if (country.length < 11) {
        refs.container.innerHTML = markup;
    } else {
        notice({
        text: `Найдено ${country.length} стран, введите более конкретно `,
        delay: 1500
        })
    }
}
 

function fetchAndRender() {
    fetchCountries(`${searchText}`).then(renderCards).catch(() => {
        if (refs.searchForm.elements.query.value == "") { return }
        error({
        text: "Неверно введено название! Попробуйте ещё раз!",
        delay: 2000,
        });
    });
 }


function onInputChange(e) {
    searchText = e.target.value;
    if (searchText === '') {refs.container.innerHTML = ''; }
    fetchAndRender();
}


function onBtnClick(e) {
    e.preventDefault();
    searchText = refs.searchForm.elements.query.value;
    if (searchText === '') {
        alert({
        text: "Введите страну",
        type: 'info',
        delay: 3000
        });
    }
    fetchAndRender();
 }
 
