const { ipcRenderer } = require('electron')

ipcRenderer.on('pageloaded', (event, arg) => {
  console.log('preload, dom-ready')

  const href = window.location.href
  if(href === 'https://gakujo.shizuoka.ac.jp/portal/') {
    // top page
    document.querySelector('.btn_login').click()
  } else if(href.startsWith('https://idp.shizuoka.ac.jp/idp/profile/SAML2/Redirect/SSO')) {
    // login input page
    ipcRenderer.send('loginpage')

    // in case credentials are provided, use it to login
    ipcRenderer.on('credentials', (e, cred) => {
      const {username, password} = JSON.parse(cred)

      document.querySelector('#username').value = username
      document.querySelector('#password').value = password

      document.querySelector('button').click()

      ipcRenderer.removeEventListener('credentials')
    })

    // in case of no credentials, capture the credentials and send to main for storage
    ipcRenderer.on('nocredentials', () => {
      // saves credentials
      document.querySelector('form').addEventListener('submit', () => {
        // const username = safeStorage.encryptString(document.querySelector('#username').value)
        // const password = safeStorage.encryptString(document.querySelector('#password').value)
        const username = document.querySelector('#username').value
        const password = document.querySelector('#password').value

        ipcRenderer.send('savecredentials', JSON.stringify({username, password}))
        document.removeEventListener('submit')
      })
    })
  } else if(href.startsWith('https://gakujo.shizuoka.ac.jp/portal/shibbolethlogin/shibbolethLogin/initLogin/sso')) {
    // for new ID input page

    // input random id
    document.querySelector('.left > input:nth-child(1)').value = 'electron:' + window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16)

    // check the not remember checkbox
    document.querySelector('.note > ul:nth-child(1) > li:nth-child(1) > input:nth-child(1)').click()

    // click submit button
    document.querySelector('.btn_large').click()
  } else if(href.startsWith('https://gakujo.shizuoka.ac.jp/portal/home/home/initialize')) {
    // when logged in
    ipcRenderer.send('loggedin')
  } else {
    // other pages (assuming logged in)
  }

  ipcRenderer.send('webdata', JSON.stringify({
    url: window.location,
    html: document.documentElement.innerHTML
  }))
})
