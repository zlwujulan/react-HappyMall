import React from 'react';
import FileUpload from './react-fileupload';
class FileUploader extends React.Component{
    render(){
        /*指定参数*/
        const options={
            baseUrl:'/manage/product/upload.do',
            fileFieldName:'upload_file',
            chooseAndUpload:true,
            dataType:'json',
            uploadSuccess:(res)=>{this.props.onSuccess(res.data)},
            uploadError:(err)=>{this.props.onError(err.message ||'上传图片出错了')},
           
        }
        /*调用FileUpload,传入options。然后在children中*/
        /*传入两个dom(不一定是button)并设置其ref值。*/
        return (
            
            <FileUpload options={options}>
                <button ref="chooseAndUpload">请选择图片</button>
                
            </FileUpload>
        )	        
    }
}

export default FileUploader