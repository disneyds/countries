import './styles.css';
import makeCardMarkup from './templates/card.hbs';
import fetchCountries from "./js/fetchCountries";
import getRefs from './js/refs';

const debounce = require('lodash.debounce');

const refs = getRefs();
let searchText = "";

refs.searchInput.addEventListener('input', debounce(onInputChange, 500) );
refs.btn.addEventListener('click', onBtnClick );

function renderCards(country) {
    const markup = makeCardMarkup(country);
    
    // if (country.length < 11) {
    //     refs.container.innerHTML = markup;
    // } else { alert("Введите более конкретное название") }
    
    refs.container.innerHTML = markup;
}
 

function fetchAndRender() {
    fetchCountries(`${searchText}`).then(renderCards).catch(console.log);
 }


function onInputChange(e) {
    searchText = e.target.value;
    if (searchText === '') {refs.container.innerHTML = ''; }
    fetchAndRender();
}


function onBtnClick(e) {
    e.preventDefault();
    searchText = refs.searchForm.elements.query.value;
    if (searchText === '') {alert('Введите название страны'); }
    fetchAndRender();
 }
 
