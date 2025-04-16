const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    const isDev = !app.isPackaged;
    if (isDev) {
        console.log('\x1b[36m%s\x1b[0m', '🚀 Development Modu Başlatılıyor... (http://localhost:5173)');
        win.loadURL('http://localhost:5173');
    } else {
        console.log('\x1b[32m%s\x1b[0m', '📦 Production Modu Başlatılıyor... (dist/index.html)');
        win.loadFile('dist/index.html');
    }
}

app.whenReady().then(() => {
    console.log('\x1b[33m%s\x1b[0m', '⚡ Electron hazır! Uygulama başlatılıyor...');
    
    ipcMain.handle('ping', () => 'pong');
    createWindow()

    app.on('activate', () => {
        console.log('\x1b[36m%s\x1b[0m', '🔁 Uygulama yeniden aktive edildi!');
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        console.log('\x1b[31m%s\x1b[0m', '❌ Tüm pencereler kapandı. Uygulama sonlandırılıyor...');
        app.quit()
    }
})
