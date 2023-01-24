const { app, BrowserWindow, ipcMain, safeStorage } = require('electron')
const path = require('path')
const fs = require('fs')

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
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload-main.js')
    }
  })

  // create api window
  apiWindow = new BrowserWindow({
    widht: 800,
    height: 600,
    center: true,
    show: true,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload-api.js')
    }
  })

  // start main window, should detect login here, if not then try login
  mainWindow.loadFile('dist/index.html')
  mainWindow.setTitle('学情プラス')
  mainWindow.hide()
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    app.quit()
  })

  apiWindow.loadURL('https://gakujo.shizuoka.ac.jp/')
  // apiWindow.webContents.openDevTools()

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
  mainWindow.send('html', data.html)
})

ipcMain.on('loginpage', () => {
  console.log('loginpage reached')
  if(fs.existsSync('credentials.json')) {
    apiWindow.send('credentials', safeStorage.decryptString(fs.readFileSync('credentials.json')).toString())
  } else {
    console.log('nocredentials sent')
    apiWindow.send('nocredentials')
  }
})

ipcMain.on('savecredentials', (e, cred) => {
  console.log('received credentials: ' + cred)
  fs.writeFileSync('credentials.json', safeStorage.encryptString(cred))
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
