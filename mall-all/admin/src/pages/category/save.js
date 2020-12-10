import React , {Component} from 'react'
import { Layout, Breadcrumb, Form, Input, Button, Select  } from 'antd';
import CustomLayout from 'components/custom-layout'
import UploadImage from 'components/upload-image'
import {connect} from 'react-redux'
import {actionCreator} from './store'
import {CATEGORY_ICON_UPLOAD} from 'api/config'
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
class CategorySave extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:this.props.match.params.categoryId,
            icon:'',
            iconValidate:{
                    help:'',
                    validateStatus:''
            },
        }
        this.handleFinish = this.handleFinish.bind(this)
        this.handleIcon = this.handleIcon.bind(this)
        this.handleValidate = this.handleValidate.bind(this)
        this.formRef = React.createRef()
    }
    async componentDidMount(){
        this.props.handleLevelCategories()
        //当点击修改时才会触发这里的代码 通过查看 id 是否存在来判断从那个地方进入到的save界面
        if(this.state.id){
            const result = await  api.getCategoryDetail({id:this.state.id})
            if(result.code == 0){
                const data = result.data
                this.formRef.current.setFieldsValue({
                    pid:data.pid,
                    name:data.name,
                    mobileName:data.mobileName            
                })
                this.setState({
                    icon:data.icon
                })
            }
        }else{
            this.setState({
                icon:''
            })
        }
    }
    handleIcon(icon){
        this.setState({
            icon:icon,
            iconValidate:{
                    help:'',
                    validateStatus:''
            },
        })
    }
    handleFinish(values){
        const{icon,id} = this.state
        this.handleValidate()
        if(icon){
            values.icon = icon
            values.id = id
            this.props.handleSave(values,id)
        }
    }
    handleValidate(){
        const  { icon } = this.state
        if(!icon){
            this.setState({
                iconValidate:{
                    help:'请上传手机图标',
                    validateStatus:'error'
                },
            })
        }
    }
   
    render(){         
        const {
            categories,
        } = this.props
        const {icon,iconValidate} = this.state
        const options = categories.map(category=><Option key={category._id} value={category._id}>{category.name}</Option>)
        let fileList = []
        if(icon){
            fileList.push({
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: icon,
            })
        }
        return(
            <div className="Category">
                <CustomLayout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>分类</Breadcrumb.Item>
                        <Breadcrumb.Item>{this.state.id ? "编辑分类" : "添加分类" }</Breadcrumb.Item>
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
                                name="pid" 
                                label="父级分类" 
                                rules={[
                                    {
                                        required: true,
                                        message:"请选择父级分类名称"
                                    }
                                ]}
                                
                            >
                                <Select
                                    placeholder="请选择父级分类"
                                    
                                >
                                    <Option value="0">根分类</Option>
                                    {options}
                                </Select>
                            </Form.Item>
                            <Form.Item 
                                name="name" 
                                label="分类名称" 
                                rules={[
                                    {
                                        required: true,
                                        message:"请输入分类名称"
                                    }
                                ]}
                                
                            >
                                <Input />
                            </Form.Item> 
                            <Form.Item 
                                name="mobileName" 
                                label="手机分类名称" 
                                rules={[
                                    {
                                        required: true,
                                        message:"请输入手机分类名称"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>  
                            <Form.Item 
                                label="手机分类图标" 
                                required={true}
                                {...iconValidate}
                            >
                                <UploadImage
                                 max={1}
                                 action={CATEGORY_ICON_UPLOAD}
                                 getImageUrlList={this.handleIcon}
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
    categories:state.get('category').get('categories'),
})
const mapDispatchToProps = (dispatch)=>({
   
    handleSave:(values)=>{
        dispatch(actionCreator.getSaveAction(values))
    },
    handleLevelCategories:()=>{
        dispatch(actionCreator.getLevelCategoriesAction())
    },
    
    
})

export default connect(mapStateToProps,mapDispatchToProps)(CategorySave)