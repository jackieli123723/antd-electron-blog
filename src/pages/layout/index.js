import React,{Component} from 'react';
import logo from '../../logo.svg';
import  { NavLink ,withRouter} from 'react-router-dom';
import './index.less'

import { Layout, Menu, Icon,message } from 'antd';

const { Header, Sider, Content } = Layout;


//ant-menu-item-selected
class BaseLayout extends Component {
  state = {
    collapsed: false,
    loading:false,
    currentUrl : '/article'
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount(){
    let url = this.props.history.location.pathname, //注意返回 /article /comment  || Menu.Item key 不能带/  下面分割了
          current = url.split('/')[1];
    this.setState({
      currentUrl: current
    });

  }

  handleSelectKey = (item,key,selectedKeys) => {
    //console.log(item.key);
    this.setState({
      currentUrl: item.key
    });
}

 outLogin = () => {
  localStorage.removeItem('token')
  this.props.history.push('/login')
  message.success('退出成功')
  
 }

  render() {
    const {loading,collapsed,currentUrl} = this.state
    return (
      <Layout className="app">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="tit">{collapsed ? <img src={logo} alt="logo" /> :'西门互联博客后台'}</div>

          <Menu theme="dark" mode="inline" 
                selectedKeys={[currentUrl]}
                onSelect={this.handleSelectKey}
          >
            <Menu.Item key="article">
             <NavLink to="/article">
              <Icon type="appstore" />
              <span>文章</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="comment">
              <NavLink to="/comment">
              <Icon type="message" />
              <span>评论</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger toggle"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />

            <span style={{ float: 'right',paddingRight:'50px'}} onClick={this.outLogin} >
              {/* <NavLink to="/login">退出</NavLink> */}
              退出
            </span>

          </Header>
          <Content
            style={{
              margin: '10px 16px',
              padding: 24,
              background: '#fff',
              overflow:'auto'
             
            }}
          >
             <div className="main-box">
            
             {this.props.children}
      
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

// export default BaseLayout;

export default withRouter(BaseLayout);