import React,{Component} from 'react';

import {Link} from 'react-router-dom';
import Layout from './pages/layout'
import logo from './logo.svg';
import './App.less';
import { GetArticleList,PostArticleDelete } from './api/index.js'
import {
  formatType,
  formatTime,
  formatTypeColor
} from './utils/util.js'

import { Menu, Icon,Button,Input, Table, Divider, Tag,Popconfirm ,message } from 'antd';

const { Header, Sider, Content } = Layout;



// background_img: "http://static.lilidong.cn/blog/upload/bg3-1564041688034.jpg"
// comment_count: 8
// content: "<h2>webpack 4 + Vue Loader v15 升级报错</h2><p><a href="https://user-images.githubusercontent.com/10346511/61855496-bf851780-aef2-11e9-81f1-115122c675c8.png" target="_blank" style="color: rgb(3, 102, 214); background-color: transparent;"><img src="https://user-images.githubusercontent.com/10346511/61855496-bf851780-aef2-11e9-81f1-115122c675c8.png" alt="deverror"></a></p><p><a href="https://user-images.githubusercontent.com/10346511/61855491-beec8100-aef2-11e9-8fa4-4c6daec9f607.png" target="_blank" style="color: rgb(3, 102, 214); background-color: transparent;"><img src="https://user-images.githubusercontent.com/10346511/61855491-beec8100-aef2-11e9-8fa4-4c6daec9f607.png" alt="buiderror"></a></p><p>Vue Loader v15 使用了一个不一样的策略来推导语言块使用的 loader。</p><p>拿 &lt;style lang="less"&gt; 举例：在 v14 或更低版本中，它会尝试使用 less-loader 加载这个块，并在其后面隐式地链上 css-loader 和 vue-style-loader，这一切都使用内联的 loader 字符串。</p><p>在 v15 中，&lt;style lang="less"&gt; 会完成把它当作一个真实的 *.less 文件来加载。因此，为了这样处理它，你需要在你的主 webpack 配置中显式地提供一条规则：</p><pre class="ql-syntax" spellcheck="false">{↵  module: {↵    rules: [↵      // ... 其它规则↵      {↵        test: /\.less$/,↵        use: [↵          'vue-style-loader',↵          'css-loader',↵          'less-loader'↵        ]↵      }↵    ]↵  }↵}↵</pre><p>这样做的好处是这条规则同样应用在 JavaScript 里普通的 *.less 导入中，并且你可以为这些 loader 配置任何你想要的选项。在 v14 或更低版本中，如果你想为一个推导出来的 loader 定制选项，你不得不在 Vue Loader 自己的 loaders 选项中将它重复一遍。在 v15 中你再也没有必要这么做了。v15 也允许为 loader 使用非序列化的选项，这种选项在之前的版本中是无法使用的。</p><blockquote>但是根据文档来 配置 还是报错 （看上面连个错误截图）所以 我们还是自行动手 webpack那么多坑 踩坑一时爽，一直踩坑一直爽</blockquote><ul><li>升级后报错 如下信息</li></ul><pre class="ql-syntax" spellcheck="false"> cross-env NODE_ENV=dev webpack-dev-server --mode development --progress --config build/webpack.dev.conf.js↵↵ 94% after seal ERROR  Failed to compile with 2 errors10:42:23                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 error  in ./src/components/page/game/article/Comment.vue?vue&amp;type=style&amp;index=0&amp;lang=less&amp;↵↵Module build failed (from ./node_modules/less-loader/dist/cjs.js):↵↵↵exports = module.exports = require("../../../../../node_modules/css-loader/lib/css-base.js")(false);↵      ^↵Unrecognised input↵      in E:\jackieli\my-github\textnuxtapi\src\components\page\game\article\Comment.vue?vue&amp;type=style&amp;index=0&amp;lang=less&amp; (line 1, column 8)↵↵ @ ./node_modules/vue-style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/css-loader??ref--8-1!./node_modules/less-loader/dist/cjs.js??ref--8-2!./node_modules/vue-loader/lib??vue-loader-options!./src/components/page/game/article/Comment.vue?vue&amp;type=style&amp;index=0&amp;lang=less&amp; 4:14-436 14:3-18:5 15:22-444↵ @ ./src/components/page/game/article/Comment.vue?vue&amp;type=style&amp;index=0&amp;lang=less&amp;↵ @ ./src/components/page/game/article/Comment.vue↵ @ ./src/router/index.js↵ @ ./src/main.js↵↵ error  in ./src/components/page/game/article/Index.vue?vue&amp;type=style&amp;index=0&amp;lang=less&amp;↵↵Module build failed (from ./node_modules/less-loader/dist/cjs.js):↵↵↵exports = module.exports = require("../../../../../node_modules/css-loader/lib/css-base.js")(false);↵      ^↵Unrecognised input↵      in E:\jackieli\my-github\textnuxtapi\src\components\page\game\article\Index.vue?vue&amp;type=style&amp;index=0&amp;lang=less&amp; (line 1, column 8)↵↵ @ ./node_modules/vue-style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/css-loader??ref--8-1!./node_modules/less-loader/dist/cjs.js??ref--8-2!./node_modules/vue-loader/lib??vue-loader-options!./src/components/page/game/article/Index.vue?vue&amp;type=style&amp;index=0&amp;lang=less&amp; 4:14-434 14:3-18:5 15:22-442↵ @ ./src/components/page/game/article/Index.vue?vue&amp;type=style&amp;index=0&amp;lang=less&amp;↵ @ ./src/components/page/game/article/Index.vue↵ @ ./src/router/index.js↵ @ ./src/main.js↵</pre><p>分析 报错 原因 是 在 vue组件中 引入了 样式</p><pre class="ql-syntax" spellcheck="false">&lt;style  lang="less" &gt;↵ less 文件↵&lt;/style&gt;↵</pre><p>这样的vue组件引入样式 并没有报错</p><pre class="ql-syntax" spellcheck="false">&lt;style&gt;↵  @import '~@/css/comp.css'↵&lt;/style&gt;↵</pre><blockquote>分析定位原始应该是loader 处理文件的时候 错误了</blockquote><h3>解决方法有两种</h3><ul><li>less 文件 用vue-style-loader 处理</li><li>less 文件用vue-loader 处理</li></ul><pre class="ql-syntax" spellcheck="false">//webpack.base.conf.js↵const vueLoaderConfig = require('./vue-loader.conf')↵module: {↵rules:[↵  {↵        test: /\.vue$/,↵        loader: 'vue-loader',↵        options: vueLoaderConfig↵      },↵      //way1↵     // 推荐使用这个 可用样式覆盖前面的样式 这个是vue-loader的超集 更加智能↵      // {↵      //   test: /\.less$/,↵      //   use: [↵      //     'vue-style-loader',↵      //     //Module build failed (from ./node_modules/less-loader/dist/cjs.js): 报错 屏蔽下面两个↵      //     // 'css-loader',↵      //     // 'less-loader'↵      //   ]↵      // },↵      //way2↵      {↵        test: /\.less$/,↵        loader: 'vue-loader',↵        options: vueLoaderConfig↵      },↵       {↵        test: /\.scss$/,↵        loader: 'vue-loader',↵        options: vueLoaderConfig↵      },↵  ...↵]↵}↵</pre><h2>package.json 依赖</h2><pre class="ql-syntax" spellcheck="false">   // 依赖版本↵    "babel-core": "^6.22.1",↵    "babel-helper-vue-jsx-merge-props": "^2.0.3",↵    "babel-loader": "^7.1.1",↵    "babel-plugin-syntax-jsx": "^6.18.0",↵    "babel-plugin-transform-runtime": "^6.22.0",↵    "babel-plugin-transform-vue-jsx": "^3.5.0",↵    "babel-preset-env": "^1.3.2",↵    "babel-preset-stage-2": "^6.22.0",↵    "vue-loader": "^15.7.1",↵    "vue-style-loader": "^4.1.0",↵    "vue-template-compiler": "^2.5.2",↵    "webpack": "^4.37.0",↵    "webpack-bundle-analyzer": "^2.9.0",↵    "webpack-cli": "^3.3.6",↵    "webpack-dev-server": "^3.1.4",↵    "webpack-merge": "^4.1.0"↵↵"scripts": {↵    "dev": "cross-env NODE_ENV=dev webpack-dev-server --mode development --progress --config build/webpack.dev.conf.js",↵    "build": "cross-env NODE_ENV=production node build/build.js"↵  },↵</pre><ul><li>参考上面的两种解决办法可以自行环境变量设置来使用不同的loader</li></ul><pre class="ql-syntax" spellcheck="false">/*自行解决*/↵function fixWebpack4LessLoader(){↵   if(process.env.NODE_ENV === 'dev'){↵     return   {↵        test: /\.less$/,↵        use: [↵          'vue-style-loader',↵          //Module build failed (from ./node_modules/less-loader/dist/cjs.js): 报错 屏蔽下面两个↵        ]↵       }↵   }else{↵     return  {↵        test: /\.less$/,↵        use: [↵          'vue-style-loader',↵          //Module build failed (from ./node_modules/less-loader/dist/cjs.js): 报错 屏蔽下面两个↵↵          //npm run build 要开启下面两个不然报错 ↵          'css-loader',↵          'less-loader'↵        ]↵      }↵   }↵}↵↵// 然后在rules 中 插入这个函数 ↵  fixWebpack4LessLoader()↵</pre><ul><li>你现在可以这样在xxx.vue组件中多种方式使用</li></ul><pre class="ql-syntax" spellcheck="false">&lt;style&gt;↵  @import '~@/css/comp.css'↵&lt;/style&gt;↵↵&lt;style lang="less"&gt;↵body{↵  div{↵  border:1px solid red;↵  }↵}↵&lt;/style&gt;↵</pre><p>还可以这样</p><pre class="ql-syntax" spellcheck="false">&lt;style lang="less"&gt;↵body{↵  div{↵   color:red;↵}↵}↵&lt;/style&gt;↵</pre><ul><li>dev 热更新</li><li><a href="https://user-images.githubusercontent.com/10346511/61855495-bf851780-aef2-11e9-91c4-594ef84931a5.png" target="_blank" style="color: rgb(3, 102, 214); background-color: transparent;"><img src="https://user-images.githubusercontent.com/10346511/61855495-bf851780-aef2-11e9-91c4-594ef84931a5.png" alt="dev"></a></li><li>prod build构建</li></ul><p><a href="https://user-images.githubusercontent.com/10346511/61855494-bf851780-aef2-11e9-9e2f-2117404506b2.png" target="_blank" style="color: rgb(3, 102, 214); background-color: transparent;"><img src="https://user-images.githubusercontent.com/10346511/61855494-bf851780-aef2-11e9-9e2f-2117404506b2.png" alt="buildok"></a></p><p><br></p><blockquote><span style="color: rgb(3, 102, 214); background-color: transparent;"> 原文地址 </span><a href="https://github.com/jackieli123723/jackieli123723.github.io/issues/78" target="_blank">https://github.com/jackieli123723/jackieli123723.github.io/issues/78</a></blockquote><h2><br></h2>"
// creat_date: "1563946532000"
// id: "5d37d74d9b045c585fd851d7"
// placeholder_img: "http://static.lilidong.cn/blog/upload/image-1564041660221.png"
// pv: 245
// stars: 4
// title: "webpack 4 + Vue Loader v15 升级报错"
// type: 3
// _id: "5d37d74d9b045c585fd851d7"



class App extends Component {
  state = {
    loading:true,
    page:1,
    pageSize:10,
    title:'',
    data:[],
    totalPages:-1
  };


  initData(){
    this.setState({
      loading:true,
    })
    GetArticleList({
      page:this.state.page,
      pageSize:this.state.pageSize,
      title:this.state.title
      })
     .then((response) => {
         if(200 == response.code) {
           this.setState({
             data:response.data.list,
             totalPages: response.data.totalRecords,
             loading:false
           })
         }else{
          message.error('网络错误请重试！');
         }
       })
     .catch((err) => { 
        this.setState({
          loading:false
        },() => {
          message.error(err)    
        })
     });
  }

  componentDidMount(){
    this.initData()
  }

  titleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  search(){
    this.setState({
      page: 1,
    },() => {
      this.initData()
    });
   
  }
 //放到回调里面 否则出现页面乱跳对应不上 高亮锚点
  handleTableChange = (page,pageSize) => {
    this.setState({
      page: page,
    },() => {
      this.initData()
    });
}

  showTotal = (total) => {
    return `总共 ${total} 记录`;
  }

  onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
    this.setState({
      page: 1,
      pageSize:pageSize
    },() => {
      this.initData()
    });
  }

  deleteArticle = (id) => {
    PostArticleDelete({
      articleId:id
      })
     .then((response) => {
         if(200 == response.code) {
               
                message.success('删除文章成功');
                //删除要将页面指为1 否则会导致分页删除后nodata 但是实际上是有数据但是分页增大了 查数据没有正常
                let self = this
                setTimeout(function(){
                  self.setState({
                    page:1
                  },() => {
                    self.initData()
                  })
                },300)
         }else{
          message.error('网络错误请重试！');
         }
       })
     .catch((err) => {     
      message.warning(err)
     });
  }

  editArticle = (id) => {
    this.props.history.push("/article/"+id);
  }
  addArticle = () => {
    this.props.history.push('/article/add')
  }

  render() {
    const {loading,data,totalPages,pageSize,page} = this.state
    const columns = [
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title'
        },
        {
          title: '创建时间',
          dataIndex: 'creat_date',
          key: 'creat_date',
          render: (text, record) => (
          <span>{formatTime(record.creat_date)}</span>
          ),
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          render: (text, record) => (
            <Tag color={formatTypeColor(record.type)} >
            {formatType(record.type)}
            </Tag>
          ),
        },

        {
          title: '浏览',
          dataIndex: 'pv',
          key: 'pv',
        },

        {
          title: '评分',
          dataIndex: 'stars',
          key: 'stars',
        },
        {
          title: '留言',
          dataIndex: 'comment_count',
          key: 'comment_count',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              <Button type="primary" icon="edit" onClick={() => this.editArticle(record._id)}>编辑</Button>
              <Divider type="vertical" />
              <Popconfirm title="是否删除?" onConfirm={() => this.deleteArticle(record._id)}>
                <Button type="danger" icon="delete">删除</Button>
              </Popconfirm>
            </span>
          ),
        },
      ];
    return (
      <Layout>
             <div className="main-box">
               <div className="search-box">
                 <div className="item left">
                  <Button type="primary" icon="plus" onClick={this.addArticle}>
                   添加文章
                  </Button>
                 </div>
                 <div className="item middle">
                  <Input className="paper-input" onChange={this.titleChange} placeholder="请输入文章标题" />
                 </div>
                 <div className="item right">
                  <Button type="primary" icon="search" onClick={this.search.bind(this)}>
                    查询
                  </Button>
                 </div>
               </div>

               <div className="table-box">

                 <div className="list">

           
                  <Table 
                    columns={columns}
                    dataSource={data} 
                    loading={loading} 
                    rowKey={record => record._id} 
                    pagination={{
                      pageSize: pageSize,
                      total: totalPages,
                      showTotal:this.showTotal,
                      current:page,
                      onChange:this.handleTableChange,
                      onShowSizeChange:this.onShowSizeChange,
                      showQuickJumper:true,
                      showSizeChanger:true,
                    }}
                    />
         
                </div> 
                
               </div>


            </div>
      </Layout>
    );
  }
}


export default App;
