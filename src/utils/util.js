   // 时间戳格式化时间
 export  const formatTime = function(timestamp) {
    if (timestamp == 0 ) return 
    let time = new Date(Number(timestamp))
    let year = time.getFullYear(),
      month = time.getMonth() + 1,
      date = time.getDate(),
      hour = time.getHours(),
      minute = time.getMinutes(),
      second = time.getSeconds()
    return `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date} ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
  }

 // 时间格式化为时间戳 
export const formateTimeToUnix = function(strtime){
    var date = new Date(strtime).getTime(); 
    return date 
}

 export const formatType = function(value){
    if (value == 0) return ''
    if(value ==1){
      return 'web前端'
    }
    if(value ==2){
      return '服务端'
    }
    if(value ==3){
      return '构建工具'
    }
    if(value ==4){
      return '数据库'
    }
    if(value ==5){
      return '后端开发'
    }
    if(value ==6){
      return '系统架构'
    }
  }
  export const formatTypeColor = function(value){
   
    if(value ==1){
      return 'magenta'
    }
    if(value ==2){
      return 'volcano'
    }
    if(value ==3){
      return 'orange'
    }
    if(value ==4){
      return 'lime'
    }
    if(value ==5){
      return 'geekblue'
    }
    if(value ==6){
      return 'purple'
    }
  }