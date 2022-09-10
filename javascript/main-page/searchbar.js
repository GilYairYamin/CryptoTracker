const SEARCH_ID = 'search-input';
const CLEAR_ID = 'clear-button';
const RESET_ID = 'reset-button';

function addSearchbar(parent) {
  const searchDiv = document.createElement('div');
  searchDiv.classList.add('nav', 'justify-content-around');
  searchDiv.innerHTML = /*html*/ `
  <div>
    <input type="text" id="${SEARCH_ID}"/>
    <button class="btn btn-primary" id="${CLEAR_ID}">
      clear
    </button>
    <button class="btn btn-primary" id="${RESET_ID}">
      reset
    </button>
  </div>
<br />`;

  parent.appendChild(searchDiv);
  return searchDiv;
}

export { addSearchbar, SEARCH_ID, CLEAR_ID, RESET_ID };
