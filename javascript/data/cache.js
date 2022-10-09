const CACHE_KEY = 'selected'
const LAST_TAB_ID = 'last-tab-id'

const loadFromCache = () => {
  return JSON.parse(window.sessionStorage.getItem(CACHE_KEY))
}

const saveToCache = (coinList, currentTab) => {
  if (!currentTab) {
    const cache = loadFromCache()
    currentTab = cache[LAST_TAB_ID]
  }

  const selectedCoins = coinList.filter((coin) => coin.selected)
  const selectedObj = {}
  selectedObj[LAST_TAB_ID] = currentTab
  for (const coin of selectedCoins) {
    selectedObj[coin.Name] = true
  }
  window.sessionStorage.setItem(CACHE_KEY, JSON.stringify(selectedObj))
}

export { loadFromCache, saveToCache, LAST_TAB_ID }
