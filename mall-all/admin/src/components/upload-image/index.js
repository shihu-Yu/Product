import React , {Component,Fragment} from 'react'
import { Upload, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Item from 'antd/lib/list/Item';


function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    });
  }
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('只能上传 JPG/PNG 文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('文件大大小不能超过 2MB!');
    }
    return isJpgOrPng && isLt2M;
}   
class UploadImage extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: [],
            isUpdate:false,
        }
        this.handleCancel = this.handleCancel.bind(this)
        this.handlePreview = this.handlePreview.bind(this)
        this.handleChange = this.handleChange.bind(this)
        
    }
    static getDerivedStateFromProps(props, state){
        if(state.isUpdate){
            // 更新图片时阻止props中的fileList 传递给state中的fileList
            return null 
        }else{
            return{
                fileList:props.fileList
            }
        }
    }
    
 
    handleCancel(){
        this.setState({ previewVisible: false })
    }

    async handlePreview(file){
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
    
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        })
    }
    handleChange({ fileList }){
        const imageUrlList = fileList.map(item=>{
            if(item.response && item.response.status =="done"){
                return item.response.url
            }
        }).join(',')
        // 通过组件传递过来的方法把图片地址返回给组件
        this.props.getImageUrlList(imageUrlList)
        this.setState({ 
            fileList:fileList,
            isUpdate:true
        })
    }
  
    render(){
        const { previewVisible, previewImage, fileList, previewTitle } = this.state
        const {action,max} = this.props
        const uploadButton = (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )
        return(
            <Fragment>
                <Upload
                    name="file"
                    action={action}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                {fileList.length >= max ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
          </Fragment>
        )
    }
}


export default UploadImage