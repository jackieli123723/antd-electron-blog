const { app, BrowserWindow, Menu,Tray,ipcMain} = require('electron')
const path = require('path')
const url = require('url')

const IS_DEV = process.env.NODE_ENV === 'development'

// process.setMaxListeners(0); not work

// let { width, height } = screen.getPrimaryDisplay().bounds

// 保持一个对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
let win

function createWindow() {
  IS_DEV && installExtensions()

  // 创建浏览器窗口。
  win = new BrowserWindow({
    // transparent: true, //, 还可以使无框窗口透明:
    // useContentSize: true,//width 和 height 使用web网页size, 这意味着实际窗口的size应该包括窗口框架的size，稍微会大一点，默认为 false.
    width: 1200 ,
    height: 1000,
    minWidth:1200,
    minHeight:1000,
    frame: false, //是否显示自带边框 默认值为 true
    movable: false, //可否移动 容易导致里面元素不可点击
    autoHideMenuBar:true,/*隐藏左上角菜单*/
    fullscreen:true,/*根据系统全屏*/
    fullscreenable:false,/* 窗口是否可以进入全屏模式 开启的话没哟边框了默认是F11*/
    // show: false,/*不显示程序弹框 可作为后台进程运行无界面*/
    //禁用跨域检查
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true  //process not undefined 解决ipcMain 和 ipcRenderer通信 https://github.com/electron/electron/issues/18139 login 中不需要引入了
    }
  })

  // 加载应用
  const staticIndexPath = path.join(__dirname, './index.html');
  const main = IS_DEV ? `http://localhost:3000/#/login` : url.format({
    pathname: staticIndexPath,
    protocol: 'file:',
    slashes: true,
    //跳转到login  http://localhost:3000/#/login
    hash: 'login'
  });
  win.loadURL(main)
   
  

  // 打开开发者工具。
  IS_DEV && win.webContents.openDevTools()

  


  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
  })

   //系统托盘图标
  if(process.platform === 'win32'){
      //设置托盘图标和菜单
      var trayMenuTemplate = [
        {
          label: '打开',
          click: () => {
            win.show();
          }
        },
        {
          label: '退出',
          click: () => {
            app.quit();
            app.quit();//因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
          }
        }
      ];
      //系统托盘图标
      appTray = process.env.NODE_ENV === 'development' ? new Tray(`${__dirname}/icon.ico`):new Tray(`${__dirname}/icon.ico`);
      //图标的上下文菜单
      const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
      //设置此托盘图标的悬停提示内容
      appTray.setToolTip('西门互联');
      //设置此图标的上下文菜单
      appTray.setContextMenu(contextMenu);
      //单击右下角小图标显示应用左键
      appTray.on('click',function(){
        win.show();
      })
      //右键
      appTray.on('right-click', () => {
        appTray.popUpContextMenu(trayMenuTemplate);
      });
    }

    
    //右上角 放大 缩小 关闭

    // ipcMain.on('min', e=> win.minimize());
    // ipcMain.on('max', e=> win.maximize());
    // ipcMain.on('close', e=> win.close());


    ipcMain.on('min',() => {
      if (win) {
        if (win.isMinimized()) { win.restore(); }
        else { win.minimize(); }
      }
    });
    
    ipcMain.on('max',() => {
      if (win) {
        if (win.isMaximized()) { win.unmaximize(); }
        else { win.maximize(); }
      }
    });

    ipcMain.on('close',() => {
      app.quit()  //kill 
      // app.close() not a fuction 
    });
     
    //第一个是event 后面的参数需要send 发送的对应 不然只能拿到第一个  
    // 流程 ==== 子进程  ==>>> 主进程  === 回复 --- 子进程 ---子进程 监听过来的数据
    //事件叠加问题待解  ?event.sender.send('data-reply',arg1+1,arg2+1,arg3+1)
    ipcMain.on('data',(event,arg1,arg2,arg3) => {
      console.log('recieve data',arg1,arg2,arg3)
      //加不加都没有影响下面这个
      // process.setMaxListeners(0); // once 替换 on 解决事件叠加问题 偶尔可以点击 偶尔不能点击？ 注释就ok 了 用once？ 不行的
      event.reply('data-reply',arg1+1,arg2+1,arg3+1) // way1 事件叠加---ok 解决 
      // event.sender.send('data-reply',arg1+1,arg2+1,arg3+1) //ok way2 解决事件叠加 web -> ipcMain

      //DEL EVENT eroror not a function
      // ipcMain.removeHandler('data',() => {})
      // ipcMain.removeHandler('data-reply',() =>{})

      //sender.send  回应异步消息, 
//       发送消息，事件名为 channel.
// 回应同步消息, 你可以设置 event.returnValue.
// 回应异步消息, 你可以使用 event.sender.send(...).
// 一个例子，在主进程和渲染进程之间发送和处理消息:

// // In main process.
// const ipcMain = require('electron').ipcMain;
// ipcMain.on('asynchronous-message', function(event, arg) {
//   console.log(arg);  // prints "ping"
//   event.sender.send('asynchronous-reply', 'pong');
// });

// ipcMain.on('synchronous-message', function(event, arg) {
//   console.log(arg);  // prints "ping"
//   event.returnValue = 'pong';
// });
// // In renderer process (web page).
// const ipcRenderer = require('electron').ipcRenderer;
// console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"

// ipcRenderer.on('asynchronous-reply', function(event, arg) {
//   console.log(arg); // prints "pong"
// });
// ipcRenderer.send('asynchronous-message', 'ping');
//       你可以使用 event.sender.send(...) . 一个例子，在主进程和渲染进程之间发送和处理消息:
      //event.sender.send(xxxx) || event.sender.send('data-reply',arg1+1,arg2+1,arg3+1)


      // ###vs 


      // 下面是在渲染和主进程之间发送和处理消息的一个例子：

// // 在主进程中.
// const { ipcMain } = require('electron')
// ipcMain.on('asynchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.reply('asynchronous-reply', 'pong')
// })

// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.returnValue = 'pong'
// })
// 复制
// //在渲染器进程 (网页) 中。
// const { ipcRenderer } = require('electron')
// console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//   console.log(arg) // prints "pong"
// })
// ipcRenderer.send('asynchronous-message', 'ping')



    });

    //把天气预报的cli 通信到这里 显示 到网页显示  
    //异步问题 数据通信
    //点击快了 应该用promise封装下  例如当数据完成后才能进行解锁下一个事件 不然会导致数据延迟覆盖
    ipcMain.on('weather',(event,arg) => {
      console.log('recieve data',arg)
 
      let  stdoutWeatherData = ''
      const exec = require('child_process').exec;

      var child = exec('weather -c 成都 -j -d 15', function(err, stdout, stderr) {
        if (err) {
          throw err;
          return;
        }else{
          console.log(stdout);
          stdoutWeatherData = stdout
          event.reply('weather-reply',stdoutWeatherData) //
        }
      
      });

    
    });



    //窗口新建监听 

    let tempWin  = null ;
    //一个进程 应该在任务管理器有一个进程才对？
    ipcMain.on('new-window',(event,config) => {
      tempWin = new BrowserWindow(config);
      // tempWin.loadURL(main) 加载网页
      event.sender.send('new-window-create-done')
    
    })

       //关闭 有问题 放在外面？
       ipcMain.on('close-new-window',(event) => {
        if(tempWin){
          tempWin = null 
          tempWin.quit() 
        }
        event.reply('new-window-destory-done')
      })
    
 
    
     


    // //新开窗口 ipcRenderer 
    // createIpcRendererWindow = () => {
    //   ipcRenderer.send('new-window',{
    //     title:'西门互联new窗口'
    //   })
    // }
  
    // closeIpcRendererWindow = () => {
    //   ipcRenderer.send('close-new-window')
    // }


    




}



// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
})

function installExtensions() {
  BrowserWindow.addDevToolsExtension(path.join(__dirname, '../', 'chrome-extensions', 'react-dev-tools'));
}


ipcMain.on('online-status-changed', (event, status) => {
  console.log('web status:=====',status)
})