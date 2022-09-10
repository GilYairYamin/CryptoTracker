import { getCoinsData } from './javascript/data/marketCap.js';
import {
  saveToCache,
  loadFromCache,
  LAST_TAB_ID,
} from './javascript/data/cache.js';
import { loadMainPage } from './javascript/main-page/main-page.js';
import { loadAboutPage } from './javascript/about-page/about-page.js';
import { loadUpdatePage } from './javascript/live-update-page/live-update-page.js';

const MAIN_PAGE_ID = 'coin-selection';
const LIVE_UPDATE_ID = 'live-update';
const ABOUT_ID = 'about';

const loadingCoins = getCoinsData();
const dynamicContent = document.getElementById('dynamic-container');
const tabButtons = Array.from(document.querySelectorAll('.main-nav-link'));
const allCoins = [];

let currentTab = MAIN_PAGE_ID;
let liveUpdateInterval = null;

for (const tabButton of document.querySelectorAll('.main-nav-btns')) {
  tabButton.addEventListener('click', (e) => {
    changeTab(e.currentTarget.id);
  });
}

initApp();

async function initApp() {
  dynamicContent.innerHTML = '<h2>Loading Coins</h2>';
  allCoins.push(...(await loadingCoins));

  const cache = loadFromCache();
  if (cache) {
    const selectedCoins = allCoins.filter((coin) => cache[coin.Name]);
    for (const coin of selectedCoins) coin.selected = true;
    currentTab = cache ? cache[LAST_TAB_ID] : MAIN_PAGE_ID;
  }
  changeTab(currentTab);
}

async function changeTab(tabId) {
  if (liveUpdateInterval !== null) {
    clearInterval(liveUpdateInterval);
    liveUpdateInterval = null;
  }

  switch (tabId) {
    case LIVE_UPDATE_ID:
      liveUpdateInterval = await loadUpdatePage(dynamicContent, allCoins);
      break;
    case ABOUT_ID:
      loadAboutPage(dynamicContent);
      break;
    default:
      loadMainPage(dynamicContent, allCoins);
  }

  for (const button of tabButtons) {
    button.classList.remove('active');
    button.disabled = false;
    if (button.id == tabId) {
      button.classList.add('active');
      button.disabled = true;
    }
  }

  currentTab = tabId;
  saveToCache(allCoins, currentTab);
}
