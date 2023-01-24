const { ipcRenderer } = require('electron')


ipcRenderer.on('html', (e, html) => {
  // console.log(html)
  const dom = new DOMParser().parseFromString(html, 'text/html')

  const rows = Array.from(dom.querySelector('#tbl_news').rows).map(row => {
    return {
      type: row.cells[0].innerText.replaceAll(/\t?\n?/g, ''),
      date: row.cells[1].innerText.replaceAll(/\t?\n?/g, ''),
      title: row.cells[2].innerText.replaceAll(/\t?\n?/g, '')
    }
  })

  sessionStorage.setItem('notifications', JSON.stringify(rows))
  window.dispatchEvent(new Event('notifications'))

  console.log(JSON.parse(localStorage.getItem('notifications')))
})
