import { addChart } from './live-chart.js'

const MAX_SELECTED_AMOUNT = 5

const loadUpdatePage = async (parent, coinList) => {
  parent.innerHTML = ''
  const selectedCoins = coinList.filter((coin) => coin.selected)
  if (selectedCoins.length <= 0) {
    const div = document.createElement('div')
    div.classList.add('nav', 'justify-content-center')
    div.innerHTML = /*html*/ `<h1>No coins selected</h1>`
    parent.appendChild(div)
    return
  }

  const canvas = document.createElement('canvas')
  canvas.width = '100%'
  canvas.id = 'myChart'
  parent.appendChild(canvas)

  return await addChart(canvas, selectedCoins)
}

export { loadUpdatePage, MAX_SELECTED_AMOUNT }
