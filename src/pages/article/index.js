import React, { Component } from 'react'
import Layout from '../layout'

import {Input,Select ,DatePicker, Upload, Icon,Button, message  } from 'antd';


import 'braft-editor/dist/index.css'
import './index.less'

import BraftEditor from 'braft-editor'

import { PostArticleAdd ,GetArticleById,PostArticleUpdate } from '../../api/index.js'

import {
  formatTime,
  formateTimeToUnix
} from '../../utils/util.js'

import moment from 'moment';
const { Option } = Select;
const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD HH:mm:ss';


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default class Article extends Component {
  // constructor(props){
  //   super(props);
  // }
  state = {
    background_img:"", //大图
    content:"",
    creat_date:null, // '' 也可以
    type:'1',
    placeholder_img:"",//小图
    title:"",
    loading: false,
    loadingsmall:false,
    editorState: null

  }

  handleChangeBig = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done' && info.file.response.code == 200 ) {
      // Get this url from response in real world.
       
      this.setState({
        background_img :info.file.response.url[0],
        loading: false,
      })

      // getBase64(info.file.originFileObj, imageUrl =>

      //   this.setState({
      //     background_img :imageUrl,
      //     loading: false,
      //   })

      // );
    }
  };
  
  
  handleChangeSmall = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loadingsmall: true });
      return;
    }
    if (info.file.status === 'done' && info.file.response.code == 200 ) {

       
      this.setState({
        placeholder_img :info.file.response.url[0],
        loading: false,
      })

      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, imageUrl =>
      
      //   this.setState({
      //     placeholder_img :imageUrl,
      //     loadingsmall: false,
      //   })

      // );
    }
  };

  handleChangeType = (value) => {
    this.setState({
      type:value
    })
  }

  
 onChange = (value, dateString) => {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
  this.setState({
    creat_date:dateString
  })
}

 onOk = (value) => {
  console.log('onOk: ', value);
  this.setState({
    creat_date:value
  })
}

titleChange = (event) => {
  this.setState({
    title: event.target.value,
  });
}

init = () => {
    if(this.props.match.params.id &&  this.props.match.params.id !== "add") {
      //'这是编辑'
      GetArticleById({
        articleId:this.props.match.params.id
      }).then((response) => {
  
        if(200 == response.code) {
          console.log(response.data.title)
          this.setState({
            type:response.data.type.toString(),
            title:response.data.title,
            creat_date:formatTime(response.data.creat_date).toString(),
            background_img:response.data.background_img,
            placeholder_img:response.data.placeholder_img,
            editorState: BraftEditor.createEditorState(response.data.content)

     
          })
        }else{
          message.error('error')    
        }
      }).catch((err) => {     
        message.error(err)    
    })
  } 
}



sbumitAdd = () => {
         
  if (this.props.match.params.id && this.props.match.params.id !== "add") {
    //更新
    
       PostArticleUpdate({
        articleId:this.props.match.params.id,
        type: this.state.type,
        title: this.state.title,
        creat_date:formateTimeToUnix(this.state.creat_date),
        placeholder_img: this.state.placeholder_img,
        background_img:this.state.background_img,
        content: this.state.editorState.toHTML()
        }).then((response) => {
     
        if(200 == response.code) {
            message.success('文章更新成功');
            this.props.history.push('/article')
        }else{
          message.error('网络错误请重试！');
        }
      }).catch((err) => {     
        console.log(err)
     })
  
  }else{
    //新建

   PostArticleAdd({
    articleId:this.props.match.params.id,
    type: this.state.type,
    title: this.state.title,
    creat_date:formateTimeToUnix(this.state.creat_date),
    placeholder_img: this.state.placeholder_img,
    background_img:this.state.background_img,
    content: this.state.editorState.toHTML()
    }).then((response) => {

      if(200 == response.code) {
        message.success('文章添加成功');
        this.props.history.push('/article')
    
      }else{
          message.error('网络错误请重试！');
      }
    }).catch((err) => {     
      console.log(err)
   })

  }

}

 componentDidMount(){
    // 假设此处从服务端获取html格式的编辑器内容
    // const htmlContent = `<p>jasfdsfsdfdsf</p>`
    // // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorState数据
    // this.setState({
    //   editorState: BraftEditor.createEditorState(htmlContent)
    // })

    this.init()
  }

  submitContent = () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML()
    this.setState({ editorState: htmlContent})
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const uploadButtonSmall = (
      <div>
        <Icon type={this.state.loadingsmall? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const { background_img,placeholder_img,editorState,type,title,creat_date } = this.state;
 
    return (
      <Layout>
      <div className="content-wrapper">
        Article
       { this.props.match.params.id}

        <div className="list-add">
          <div className="item">
            <label>文章分类</label>
            <div className="content">
            <Select defaultValue={type} value={type} style={{ width: 120 }} onChange={this.handleChangeType}>
              <Option value="1">web前端</Option>
              <Option value="2">服务端</Option>
              <Option value="3">构建工具</Option>
              <Option value="4">数据库</Option>
              <Option value="5">后端开发</Option>
              <Option value="6">系统架构</Option>
            </Select>
            </div>
          </div>

          <div className="item">
            <label>标题</label>
            <div className="content">
            <Input placeholder="" value={title} onChange={this.titleChange}  />
            </div>
          </div>

          <div className="item">
            <label>发布日期</label>
            <div className="content">
{/* 
            value={formatTime(creat_date)} 不能用 defaultValue 显示 无效值Invalid date  


             value={moment(creat_date, dateFormat)} 有值 
             defaultValue='' 无值
            
            
               defaultValue={null}

               value={moment(creat_date == null ? new Date() : creat_date, dateFormat)}  


               直接用  defaultValue={moment()}   format={dateFormat} 解决 无效值Invalid date  add

            */}
               {/* <DatePicker showTime placeholder="选择日期" onChange={this.onChange} 
          
               /> */}


    {creat_date ?
    <DatePicker showTime placeholder="选择日期" onChange={this.onChange}   value={moment(creat_date, dateFormat)} /> :    
    <DatePicker showTime placeholder="选择日期" onChange={this.onChange} defaultValue='' />
    }
          
            </div>
          </div>

          <div className="item">
            <label>文章缩略图</label>
            <div className="content">
            {/* name="single" 上传图片的文件流 必须加 否则报错500 */}
            <Upload
              name="single"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="http://localhost:3200/api/article/upload"
              beforeUpload={beforeUpload}
              onChange={this.handleChangeSmall}
            >
              {placeholder_img ? <img src={placeholder_img} alt="avatar" style={{ width: '100%' }} /> : uploadButtonSmall}
            </Upload>
            </div>
          </div>

          <div className="item">
            <label>背景大图</label>
            <div className="content">
            <Upload
             name="single"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="http://localhost:3200/api/article/upload"
              beforeUpload={beforeUpload}
              onChange={this.handleChangeBig}
            >
              {background_img ? <img src={background_img} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
            </div>
          </div>

          <div className="item">
            <label>内容</label>
            <div className="content">
              <div className="editor">
              <BraftEditor
                value={editorState}
                onChange={this.handleEditorChange}
                onSave={this.submitContent}
              />
              </div>
              <Button type="primary" onClick={this.sbumitAdd}>
                    确定
              </Button>

            </div>
          </div>
        </div>

     
        
      </div>
      </Layout>
    
    )
  }
}