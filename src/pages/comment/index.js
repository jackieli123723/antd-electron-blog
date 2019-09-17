
import React, { Component } from 'react'
import Layout from '../layout'

import { GetCommentList,PostCommentDelete } from '../../api/index.js'
import {
  formatType,
  formatTime,
  formatTypeColor
} from '../../utils/util.js'

import { Menu, Icon,Button,Input, Table, Divider, Tag,Popconfirm ,Rate,message } from 'antd';

const { Header, Sider, Content } = Layout;


export default class Comment extends Component {
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
    GetCommentList({
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

  deleteComment = (id) => {
    PostCommentDelete({
      id:id
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



  render() {
    const {loading,data,totalPages,pageSize,page} = this.state
    const desc = ['1星', '2星', '3星', '4星', '5星'];

    const columns = [
        {
          title: '评论者名称',
          dataIndex: 'username',
          key: 'username'
        },
        {
          title: '评论时间',
          dataIndex: 'creat_date',
          key: 'creat_date',
          render: (text, record) => (
          <span>{formatTime(record.creat_date)}</span>
          ),
        },
        {
          title: '评分',
          dataIndex: 'stars',
          key: 'stars',
          render: (text, record) => (
            
            <Rate tooltips={desc} disabled  value={record.stars} />
          ),
        },

        {
          title: '文章来源',
          dataIndex: 'articleId',
          key: 'articleId',
        },

        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: '网站',
          dataIndex: 'website',
          key: 'website',
        },
        {
          title: '评论内容',
          dataIndex: 'content',
          key: 'content',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              <Popconfirm title="是否删除?" onConfirm={() => this.deleteComment(record._id)}>
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
            
                 <div className="item middle">
                  <Input className="paper-input" onChange={this.titleChange} placeholder="请输入评论关键词" />
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
    
    )
  }
}