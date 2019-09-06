import React from 'react'
import Simditor from 'simditor';
import 'simditor/styles/simditor.css'
import $ from 'jquery'
import './index.css'
//通用富文本编辑器，依赖jq   和jq版本冲突，下载版本的原因可能引起报错，所以根据需要把插件的版本降级
class RichEditor extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.loadEditor()
    }
    componentWillReceiveProps(nextProps){
        if(this.props.defaultDetail !==nextProps.defaultDetail){
            this.simditor.setValue(nextProps.defaultDetail);
        }
        // let detailChange = this.props.detail !==nextProps.detail;
        // if(!detailChange){
        //     return;
        // }
       
    }
    loadEditor(){
        let element = this.refs['textarea'];
       this.simditor =  new Simditor({
            textarea:$(element),
            defaultValue:this.props.placeholder ||'请输入内容',
            upload:{
                url:'/manage/product/richtext_img_upload.do',
                defaultImage:'',
                fileKey:'upload_file'


            }
        })
        this.bindEditorEvent();
    }
    //初始化富文本编辑器的事件
    bindEditorEvent(){
        this.simditor.on('valuechanged',e => {
            this.props.onValueChange(this.simditor.getValue());
        })
    }
    render(){
        return (
            <div className="rich-editor">
                <textarea ref="textarea"></textarea>
            </div>
        )
    }
}
export default RichEditor