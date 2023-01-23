const { ipcRenderer } = require('electron')

ipcRenderer.on('pageloaded', (event, arg) => {
  console.log('preload, dom-ready')

  const href = window.location.href
  if(href === 'https://gakujo.shizuoka.ac.jp/portal/') {
    // top page
    document.querySelector('.btn_login').click()
  } else if(href.startsWith('https://idp.shizuoka.ac.jp/idp/profile/SAML2/Redirect/SSO')) {
    // login input page

  } else if(href.startsWith('https://gakujo.shizuoka.ac.jp/portal/shibbolethlogin/shibbolethLogin/initLogin/sso')) {
    // for new ID input page
    const idInput = document.querySelector('.left > input:nth-child(1)')
    
    if(idInput) {
      idInput.value = 'electron:' + window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16)
    }

    document.querySelector('.note > ul:nth-child(1) > li:nth-child(1) > input:nth-child(1)').click()
    document.querySelector('.btn_large').click()
  } else if(href.startsWith('https://gakujo.shizuoka.ac.jp/portal/home/home/initialize')) {
    ipcRenderer.send('loggedin')
  } else {
    // other pages (assuming logged in)
  }
    ipcRenderer.send('webdata', JSON.stringify({
      url: window.location,
      html: document.documentElement.innerHTML
    }))
})

ipcRenderer.on('sendbackhtml', (event, arg) => {
  console.log('preload: received sendbackhtml')
  ipcRenderer.send('hereishtml', document.documentElement.innerHTML)
})
