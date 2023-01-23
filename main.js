const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')


let mainWindow = null
let apiWindow = null

app.whenReady().then(() => {

  /** TODO:
   * - Handle Login
   * - Scrape
   */

  // create main window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: '学情プラス',
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
    },
  })

  // create api window
  apiWindow = new BrowserWindow({
    widht: 800,
    height: 600,
    center: true,
    show: true,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // start main window, should detect login here, if not then try login
  mainWindow.loadFile('dist/index.html')
  mainWindow.setTitle('学情プラス')
  mainWindow.hide()

  // .btn_login
  apiWindow.loadURL('https://gakujo.shizuoka.ac.jp/')
  apiWindow.webContents.on('dom-ready', () => {
    console.log('apiWindow page loaded')
    apiWindow.send('pageloaded')
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

ipcMain.on('webdata', (e, ipcData) => {
  const data = JSON.parse(ipcData)
  console.log('webdata event')
  console.log(data.url)
  //mainWindow.send('extracthtml', data.html)
})

ipcMain.on('loggedin', () => {
  apiWindow.hide()
  mainWindow.show()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
