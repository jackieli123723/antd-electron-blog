
import React, { PureComponent } from 'react'
import { message } from 'antd'


import { PostUserSignup,PostLogin } from '../../api/index.js'

import './index.less';


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



render() {
    // 整个组件被一个id="loginDIV"的div包围, 样式都设置到这个div中
    return (
      <div id="loginDIV">

    
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