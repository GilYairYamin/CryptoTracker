import { addCoinCard, TOGGLE_CLASS } from './coin-element.js';
import { MAX_SELECTED_AMOUNT } from '../live-update-page/live-update-page.js';
import { saveToCache } from '../data/cache.js';

let allCoins = null;

function addCoinDiv(parent, coinList) {
  allCoins = coinList;
  const coinDiv = document.createElement('div');
  coinDiv.classList.add('row', 'flex-row', 'justify-content-center');
  coinDiv.id = 'coin-container';
  parent.appendChild(coinDiv);
  internalUpdateDiv(coinDiv, coinList);
}

function updateCoinDiv(coinList) {
  const coinDiv = document.getElementById('coin-container');
  internalUpdateDiv(coinDiv, coinList);
}

function internalUpdateDiv(coinDiv, coinList) {
  coinDiv.innerHTML = '';
  for (const coin of coinList) {
    addCoinCard(coinDiv, coin);
  }
  updateToggles();

  const toggles = document.querySelectorAll(`.${TOGGLE_CLASS}`);
  for (const toggle of toggles) {
    toggle.addEventListener('click', () => {
      coinList[toggle.id.substring(7)].selected = toggle.checked;
      updateToggles();
      saveToCache(allCoins);
    });
  }
}

function updateToggles() {
  const selectedAmount = allCoins.filter((coin) => coin.selected).length;
  const isDisabled = selectedAmount >= MAX_SELECTED_AMOUNT;

  const notCheckedToggles = Array.from(
    document.querySelectorAll(`.${TOGGLE_CLASS}`)
  ).filter((toggle) => !toggle.checked);

  for (const toggle of notCheckedToggles) {
    toggle.disabled = isDisabled;
  }
}

export { addCoinDiv, updateCoinDiv };
