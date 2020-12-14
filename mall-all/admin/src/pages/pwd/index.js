import React , {Component} from 'react'
import { Layout, Breadcrumb, Form, Input, Button, message  } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import CustomLayout from 'components/custom-layout'
import {removeUsername,goLogin} from 'util'
import api from 'api'
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 8 },
}
const {  Content } = Layout;
class Pwd extends Component{
    constructor(props){
        super(props)
        this.state = {
            pwdValidate:{
                    help:'',
                    validateStatus:''
            },
        }
        this.handleFinish = this.handleFinish.bind(this)
        
    }
    async handleFinish(values){
        const {password,repassword} = values
        if(password != repassword){
            this.setState({
                pwdValidate:{
                    help:'两次输入的密码不一致',
                    validateStatus:'error'
                },
            })
        }else{
            this.setState({
                pwdValidate: {
                    help: '',
                    validateStatus: ''
                }
            })
            const result = await api.updateUsersPwd({
                password:password
            })
            if(result.code == 0){
                await api.logout()
                removeUsername()
                goLogin()
                message.success('密码修改成功',1)
            }
        } 
    } 
    render(){         
        const { pwdValidate } = this.state
        return(
            <div className="Pwd">
                <CustomLayout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>用户</Breadcrumb.Item>
                        <Breadcrumb.Item>修改密码</Breadcrumb.Item>
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
                            name="control-ref" 
                            onFinish={this.handleFinish}
                        >
                            
                            <Form.Item 
                                name="password" 
                                label="密码" 
                                rules={[
                                    {
                                        required: true,
                                        message:"请输入密码"
                                    },
                                    {
                                        pattern:/\w{3,7}/,
                                        message:'密码是任意的3至7个字符'
                                    }
                                ]}
                                
                            >
                                <Input.Password
                                    placeholder="请输入密码"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item> 
                            <Form.Item 
                                name="repassword" 
                                label="确认密码" 
                                required={true}
                                {...pwdValidate}
                            >
                                <Input.Password
                                    placeholder="请再次输入密码"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
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

export default Pwd