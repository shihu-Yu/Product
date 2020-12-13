import React , {Component} from 'react'
import { Layout, Breadcrumb, Form, Input, Button, Select  } from 'antd';
import CustomLayout from 'components/custom-layout'
import UploadImage from 'components/upload-image'
import {connect} from 'react-redux'
import {actionCreator} from './store'
import {Ad_IMAGE_UPLOAD} from 'api/config'
import api from 'api'
const { Option } = Select

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 8 },
}
const {  Content } = Layout;
class AdSave extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:this.props.match.params.adId,
            image:'',
            imageValidate:{
                    help:'',
                    validateStatus:''
            },
        }
        this.handleFinish = this.handleFinish.bind(this)
        this.handleImage = this.handleImage.bind(this)
        this.handleValidate = this.handleValidate.bind(this)
        this.formRef = React.createRef()
    }
    async componentDidMount(){
        //当点击修改时才会触发这里的代码 通过查看 id 是否存在来判断从那个地方进入到的save界面
        console.log(this.state.id)
        if(this.state.id){
            const result = await  api.getAdsDetail({id:this.state.id})
            if(result.code == 0){
                const data = result.data
                this.formRef.current.setFieldsValue({
                    name:data.name,
                    link:data.link,
                    position:data.position,        
                })
                this.setState({
                    image:data.image
                })
            }
        }else{
            this.setState({
                image:''
            })
        }
    }
    handleImage(image){
        this.setState({
            image:image,
            imageValidate:{
                    help:'',
                    validateStatus:''
            },
        })
    }
    handleFinish(values){
        const{image,id} = this.state
        this.handleValidate()
        if(image){
            values.image = image
            values.id = id
            this.props.handleSave(values,id)
        }
    }
    handleValidate(){
        const  { image } = this.state
        if(!image){
            this.setState({
                imageValidate:{
                    help:'请上传广告图片',
                    validateStatus:'error'
                },
            })
        }
    }
   
    render(){         
        
        const {image,imageValidate} = this.state
        let fileList = []
        if(image){
            fileList.push({
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: image,
            })
        }
        return(
            <div className="AdSave">
                <CustomLayout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>广告</Breadcrumb.Item>
                        <Breadcrumb.Item>{this.state.id ? "编辑广告" : "添加广告" }</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        }}
                    >
                       <Form 
                            {...layout} 
                            ref={this.formRef} 
                            name="control-ref" 
                            onFinish={this.handleFinish}
                            onFinishFailed={this.handleValidate}
                            ref={this.formRef}
                        >
                            
                            <Form.Item 
                                name="name" 
                                label="广告名称" 
                                rules={[
                                    {
                                        required: true,
                                        message:"请输入广告名称"
                                    }
                                ]}
                                
                            >
                                <Input />
                            </Form.Item> 
                            <Form.Item 
                                name="link" 
                                label="广告地址" 
                                rules={[
                                    {
                                        required: true,
                                        message:"请输入广告地址"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>  
                            <Form.Item 
                                name="position" 
                                label="广告位置" 
                                rules={[
                                    {
                                        required: true,
                                        message:"请选择广告位置"
                                    }
                                ]}
                                
                            >
                                <Select
                                    placeholder="请选择父级分类"
                                    
                                >
                                    <Option value="1">电脑端首页轮播图</Option>
                                    <Option value="2">移动端首页轮播图</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item 
                                label="广告图片" 
                                required={true}
                                {...imageValidate}
                            >
                                <UploadImage
                                 max={1}
                                 action={Ad_IMAGE_UPLOAD}
                                 getImageUrlList={this.handleImage}
                                 fileList={fileList}
                                />
                            </Form.Item>                          
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                               
                            </Form.Item>
                        </Form>
                    </Content>
                </CustomLayout>
            </div>
        )
    }
}
const mapStateToProps = (state)=>({
    categories:state.get('ad').get('categories'),
})
const mapDispatchToProps = (dispatch)=>({
    handleSave:(values)=>{
        dispatch(actionCreator.getSaveAction(values))
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(AdSave)