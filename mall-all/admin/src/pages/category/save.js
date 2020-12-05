import React , {Component} from 'react'
import { Layout, Breadcrumb, Form, Input, Button, Select  } from 'antd';
import CustomLayout from 'components/custom-layout'
import UploadImage from 'components/uploadImage'
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
    
    render(){         
        return(
            <div className="Home">
                <CustomLayout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>分类</Breadcrumb.Item>
                        <Breadcrumb.Item>分类列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        }}
                    >
                       <Form {...layout} ref={this.formRef} name="control-ref" onFinish={(values)=>{console.log(values)}}>
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
                                    <Option value="male">根分类</Option>
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
                                name="icon" 
                                label="手机分类图标" 
                                rules={[
                                    {
                                        required: true,
                                        message:"请上传手机分类图标"
                                    }
                                ]}
                            >
                                <UploadImage />
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

export default CategorySave