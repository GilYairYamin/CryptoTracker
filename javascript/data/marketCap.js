async function getCoinsData() {
  const coinsInfo = await fetch(
    'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD'
  ).then((response) => response.json())

  let i = 0
  return Array.from(coinsInfo.Data).map((coin) => ({
    id: i++,
    Name: coin.CoinInfo.Name,
    FullName: coin.CoinInfo.FullName,
    selected: false,
  }))
}

async function getCoinData(coin) {
  const coinInfo = await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${coin.Name}&tsyms=USD,ILS,EUR`
  ).then((res) => res.json())
  coin.USD = coinInfo.USD
  coin.ILS = coinInfo.ILS
  coin.EUR = coinInfo.EUR
}

export { getCoinsData, getCoinData }
