import { getCoinData } from '../data/marketCap.js'

const TOGGLE_CLASS = 'coin-toggle-input'
const INFO_BUTTON_CLASS = 'coin-more-info-btn'

const addCoinCard = (parent, coin) => {
  const div = document.createElement('div')
  div.classList.add('card', 'flex-row', 'col-lg-4', 'col-md-5', 'col-sm-12')
  div.id = 'holder-${coin.id}'

  div.innerHTML = /*html*/ `
  <div class="card-body" >
    <h2>${coin.FullName}</h2>
    <h5>${coin.Name}</h5>
    <p>
      <button
        class="btn btn-primary text-capitalize coin-more-info-btn"
        data-bs-toggle="collapse"
        href="#info-${coin.id}"
        role="button"
        aria-expanded="false"
        aria-controls="info-${coin.id}"
        id="info-button-${coin.id}"
      >
        more info...
      </button>
    </p>
    <div class="collapse" id="info-${coin.id}">
      <h6>Loading...</h6>
    </div>
  </div>
  <div class="form-check form-switch">
    <input
      class="form-check-input ${TOGGLE_CLASS}"
      type="checkbox"
      role="switch"
      ${coin.selected ? 'checked' : ''}
      id="toggle-${coin.id}"
  </div>`

  parent.appendChild(div)
  const infoButton = document.getElementById(`info-button-${coin.id}`)
  infoButton.addEventListener('click', async (element) => {
    const thisButton = element.target
    if (thisButton.getAttribute('aria-expanded' === 'true')) {
      thisButton.innerHTML = 'more info...'
      return
    }
    thisButton.innerHTML = 'less info...'

    const infoDiv = document.getElementById(
      thisButton.getAttribute('aria-controls')
    )

    if (coin.USD === undefined) {
      infoDiv.innerHTML = /*html*/ `<h6>Loading...</h6>`
      await getCoinData(coin)
    }
    infoDiv.innerHTML = ''
    infoDiv.appendChild(element_createCoinData(coin))
  })

  return div
}

const element_createCoinData = (coin) => {
  const res = document.createElement('div')
  res.classList.add('card', 'card-body', 'justify-content-center')
  res.innerHTML = /*html*/ `
  <h6 class="text-capitalize">market value</h6>
  <h6>USD: ${coin.USD}</h6>
  <h6>ILS: ${coin.ILS}</h6>
  <h6>EUR: ${coin.EUR}</h6>
  `
  return res
}

export { addCoinCard, TOGGLE_CLASS, INFO_BUTTON_CLASS }
