import { addSearchbar, CLEAR_ID, RESET_ID, SEARCH_ID } from './searchbar.js';
import { addCoinDiv, updateCoinDiv } from './coins-div.js';
import { TOGGLE_CLASS, INFO_BUTTON_CLASS } from './coin-element.js';

async function loadMainPage(parent, coinList) {
  parent.innerHTML = '';

  addSearchbar(parent);
  addCoinDiv(parent, coinList);

  const searchElement = document.getElementById(SEARCH_ID);
  const clearButton = document.getElementById(CLEAR_ID);
  const resetButton = document.getElementById(RESET_ID);

  searchElement.addEventListener('input', () => {
    const input = searchElement.value.toLowerCase();
    updateCoinDiv(
      coinList.filter(
        (coin) =>
          coin.Name.toLowerCase().includes(input) ||
          coin.FullName.toLowerCase().includes(input)
      )
    );
  });

  clearButton.addEventListener('click', () => {
    searchElement.value = '';
    searchElement.dispatchEvent(new Event('input'));
  });

  resetButton.addEventListener('click', () => {
    const toggles = Array.from(
      document.querySelectorAll(`.${TOGGLE_CLASS}`)
    ).filter((toggle) => toggle.checked);
    for (const toggle of toggles) {
      toggle.click();
    }

    for (const info of document.querySelectorAll(`.${INFO_BUTTON_CLASS}`)) {
      if (info.getAttribute('aria-expanded') === 'true') info.click();
    }
  });
}

export { loadMainPage };
