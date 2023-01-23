const { ipcRenderer } = require('electron')


ipcRenderer.on('html', (e, html) => {
  console.log(html)
})
