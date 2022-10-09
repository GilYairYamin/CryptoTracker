const loadAboutPage = (parent) => {
  parent.innerHTML = ''

  const div = document.createElement('div')
  div.classList.add('container', 'text-center', 'text-capitlize')
  div.innerHTML = /*html*/ `
  <h3><strong>made by: Gil Yair Yamin</strong></h3>
    <p class="text-body">
          This is a simple project created to practice and implement simple
          html, css and vanilla javscript.
    </p>
    <p>Technologies used:</p>
    <p>JAVASCRIPT ES6, HTML, CSS, Bootstrap</p>
    <p>
      <img
        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        style="max-width: 70px"
      />
    <a href="https://github.com/GilYairYamin">GitHub</a>
  </p>
  `

  parent.appendChild(div)
}

export { loadAboutPage }
