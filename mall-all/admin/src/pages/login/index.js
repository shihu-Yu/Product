import React ,{Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { Form, Input, Button,Row,Col } from 'antd'
import { UserOutlined, LockOutlined,VerifiedOutlined } from '@ant-design/icons'
import {actionCreator} from './store'
import './index.less'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            captcha:''
        }
        this.getCaptcha = this.getCaptcha.bind(this)
    }
    onFinish(values){
        this.props.handleFinsh(values)
    }
    // 定义获取验证码的函数
    async getCaptcha(){
        // 发送请求请求验证码图片
        const result = await axios({
            method: 'get',
            url: '/v1/users/captcha',
        })
        if(result.data.code == 0){
            this.setState({
                captcha:result.data.data
            })
        }
    }
    componentDidMount(){
        // 调用获取验证码的函数
        this.getCaptcha()
    }
    render(){
        return(
            <div className="Login">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={this.onFinish.bind(this)}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                            required: true,
                            message: '请输入用户名!',
                            },
                            // 自己添加的用户名验证规则
                            {
                                pattern:/^[a-zA-Z]\w{2,5}$/,
                                message:'用户名是以字母开头的任意六位字符'
                            }
                        ]}
                    >
                        <Input 
                            prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder="用户名" 
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                            required: true,
                            message: '请输入密码!',
                            },
                            // 自己添加的密码验证规则
                            {
                                pattern:/\w{3,7}/,
                                message:'密码是任意的3至7个字符'
                            }
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>

                        {/*验证码  */}
                    <Form.Item>
                        <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                            name="captcha"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证码!',
                                    },
                                    // 自己添加的验证码验证规则
                                    {   // 验证码是4位随机字符 忽略大小写
                                        pattern:/[a-z0-9]{4}/i,
                                        message:'验证码输入错误'
                                    }
                            ]}
                            >
                                <Input
                                prefix={<VerifiedOutlined className="site-form-item-icon"/>}
                                type="captcha"
                                placeholder="验证码"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <div className="captcha" onClick={this.getCaptcha} dangerouslySetInnerHTML={{__html:this.state.captcha}}></div>
                        </Col>
                        </Row>
                    </Form.Item>    
                        
                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            className="login-form-button"
                            // loading={true}
                        >
                            登陆
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch)=>({
    handleFinsh:(values)=>{
        dispatch(actionCreator.getLoginDataAction(values))
    }
})
export default connect(null,mapDispatchToProps)(Login)