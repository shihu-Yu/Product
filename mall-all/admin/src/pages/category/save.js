import React , {Component} from 'react'
import { Layout, Breadcrumb, Form, Input, Button, Select  } from 'antd';
import CustomLayout from 'components/custom-layout'
import UploadImage from 'components/upload-image'
import {connect} from 'react-redux'
import {actionCreator} from './store'
import {CATEGORY_ICON_UPLOAD} from 'api/config'
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
    componentDidMount(){
        this.props.handleLevelCategories()
    }
    render(){         
        const {handleIcon,iconValidate,handleSave,categories,handleValidate} = this.props
        const options = categories.map(category=><Option key={category._id} value={category._id}>{category.name}</Option>)
        return(
            <div className="Home">
                <CustomLayout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>分类</Breadcrumb.Item>
                        <Breadcrumb.Item>添加分类</Breadcrumb.Item>
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
                            onFinish={handleSave}
                            onFinishFailed={handleValidate}
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
                                    onChange={()=>{}}
                                    allowClear
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
                                {...iconValidate.toJS()}
                            >
                                <UploadImage
                                 max={1}
                                 action={CATEGORY_ICON_UPLOAD}
                                 getImageUrlList={handleIcon}
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
    iconValidate:state.get('category').get('iconValidate'),
    categories:state.get('category').get('categories')
})
const mapDispatchToProps = (dispatch)=>({
    handleIcon:(icon)=>{
        dispatch(actionCreator.setIcon(icon))
    },
    handleSave:(values)=>{
        dispatch(actionCreator.getSaveAction(values))
    },
    handleLevelCategories:()=>{
        dispatch(actionCreator.getLevelCategoriesAction())
    },
    handleValidate:()=>{
        dispatch(actionCreator.getValidateAction())
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CategorySave)