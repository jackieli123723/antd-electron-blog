
import React, { PureComponent } from 'react'
import { message } from 'antd'
// import { ipcRenderer } from 'electron'

import { PostUserSignup,PostLogin } from '../../api/index.js'

import './index.less';

// const { ipcRenderer } = window.require('electron');

// const { ipcRenderer } = require('electron')

//全局监听 新窗口事件 

const { ipcRenderer } = window.require('electron'); //mac yongzhege 

ipcRenderer.on('new-window-create-done',() => {
  console.log('new window 创建OK了')
})

ipcRenderer.on('new-window-destory-done',() => {
  console.log('new window 卸载成功')
})





export default class Login extends PureComponent {

  state = {
    username: '',  // 当前输入的用户名
    password: '',  // 当前输入的密码
    requesting: false, // 当前是否正在请求服务端接口
  };

  handleUsernameInput = (e) => {
    this.setState({username: e.target.value});
  };

  handlePasswordInput = (e) => {
    this.setState({password: e.target.value});
  };

  //判断点击的键盘的keyCode是否为13，是就调用上面的跳转
  handleKeyDownJump = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      this.login();
    }
  };

  login = () => {

    if(this.state.username == ''){
      message.error('用户名不能为空')
      return
    }

   if(this.state.password == ''){
      message.error('密码不能为空')
      return
    }
   

    PostLogin({
      name:this.state.username,
      password:this.state.password
    }).then((response) => {
      console.log(response)
      if(200 == response.code) {
        message.success('登陆成功');
          //必须包裹JSON.stringify
          localStorage.setItem('token',JSON.stringify(response.token));
          this.props.history.push('/article')

      }else if(204 == response.code ){
        message.error('用户不存在');
      }else if(205 == response.code){
        message.error('密码错误');

      }else{
        message.error('网络错误请重试！');
      }
    })

}

   min = () => {
    ipcRenderer.send('min');
   }

   max = () => {
    ipcRenderer.send('max');
  }

  close = () => {
    ipcRenderer.send('close');
  }

  sendData = () => {
    //这里是异步发送 ---（建议采用异步用同步坑多）
    //同步方法 sendSync ---- 在ipcMain on 事件中配套使用   event.returnValue = 'pong'
    ipcRenderer.send('data',333,444,555)
    //这里用once 防止事件叠加 回传主进程数据
    ipcRenderer.once('data-reply', (event, arg1,arg2,arg3) => {
      // this.setState({password: arg1});
      console.log(arg1,arg2,arg3) // prints "334 445 556" //第一次点击正常 但是后面多次点击 事件叠加 多个调用 用once 替换on  
      //(node:12056) MaxListenersExceededWarning: Possible EventEmitter memory leak dete
      // cted. 11 data-reply listeners added to [EventEmitter]. Use emitter.setMaxListene
      // rs() to increase limit
      // (node:12056) MaxListenersExceededWarning: Possible EventEmitter memory leak dete
      // cted. 11 data-reply listeners added to [EventEmitter]. Use emitter.setMaxListene
      // rs() to increase limit
      // recieve data 3333 444 555
      // recieve data 3333 444 555
      // recieve data 3333 444 555
    })

  }
  
  //vs sendData
  sendWeatherData = () => {
    ipcRenderer.send('weather','CD')
    ipcRenderer.once('weather-reply', (event, arg) => {
      console.log('WEATHER',JSON.stringify(arg,null,2))   
    })

  }

  //新开窗口 remote 
  createRemoteWindow = () => {

  }

  closeRemoteWindow = () => {

  }


    //新开窗口 ipcRenderer 
    createIpcRendererWindow = () => {
      ipcRenderer.send('new-window',{
        title:'西门互联new窗口',
        // frame: false 
      })
    }
  
    closeIpcRendererWindow = () => {
      ipcRenderer.send('close-new-window')
    }







render() {
    // 整个组件被一个id="loginDIV"的div包围, 样式都设置到这个div中
    return (
      <div id="loginDIV">
        <div className="top-fix">
          <button onClick={this.min}>min</button>
          <button onClick={this.max}>max</button>
          <button onClick={this.close}>close</button>
          <button onClick={this.sendData}>send data</button>
          <button onClick={this.createRemoteWindow}>新开窗口remote</button>
          <button onClick={this.closeRemoteWindow}>关闭窗口remote</button>
          <button onClick={this.createIpcRendererWindow}>新开窗口ipcRenderer </button>
          <button onClick={this.closeIpcRendererWindow}>关闭窗口ipcRenderer </button>
          <button onClick={this.sendWeatherData}>cd weather</button>
        </div>

    
        <div className="login">
          <h1>西门互联后台管理系统</h1>
          
            <input className="login-input" type="text" value={this.state.username}
                   onChange={this.handleUsernameInput} placeholder="用户名" required="required"  onKeyDown={this.handleKeyDownJump} />
            <input className="login-input" type="password" value={this.state.password}
                   onChange={this.handlePasswordInput} placeholder="密码" required="required"  onKeyDown={this.handleKeyDownJump} />
            <button className="btn btn-primary btn-block btn-large"
                    type="submit" disabled={this.state.requesting} onClick={this.login} >
              登录
            </button>
      
        </div>

      </div>
    );
  }

}