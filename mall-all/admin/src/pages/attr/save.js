import React , {Component} from 'react'
import { Layout, Breadcrumb, Form, Input, Button } from 'antd';
import CustomLayout from 'components/custom-layout'
import {connect} from 'react-redux'
import {actionCreator} from './store'
import api from 'api'

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
            id:this.props.match.params.attrId
        }
        this.formRef = React.createRef()
    }
    
   async componentDidMount(){
        //当点击修改时才会触发这里的代码 通过查看 id 是否存在来判断从那个地方进入到的save界面
        if(this.state.id){
            const result = await  api.getAttrsDetail({id:this.state.id})
            if(result.code == 0){
                const data = result.data
                console.log(data)
                this.formRef.current.setFieldsValue({
                    name:data.name,
                    key:data.key,
                    value:data.value           
                })
            }
        }
    }
    render(){         
        const {
            handleSave,
        } = this.props
        
        return(
            <div className="Attr">
                <CustomLayout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>属性</Breadcrumb.Item>
                        <Breadcrumb.Item>{this.state.id ? "编辑属性" : "添加属性" }</Breadcrumb.Item>
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
                            onFinish={(values)=>{handleSave(values,this.state.id)}}
                            ref={this.formRef}
                        >
                            <Form.Item 
                                name="name" 
                                label="属性名称" 
                                rules={[
                                    {
                                        required: true,
                                        message:"请输入属性名称"
                                    }
                                ]}
                                
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item 
                                name="key" 
                                label="属性键" 
                                rules={[
                                    {
                                        required: true,
                                        message:"请输入属性键"
                                    }
                                ]}
                                
                            >
                                <Input />
                            </Form.Item> 
                            <Form.Item 
                                name="value" 
                                label="属性值" 
                                rules={[
                                    {
                                        required: true,
                                        message:"请输入属性值"
                                    }
                                ]}
                            >
                                <Input />
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
   
})
const mapDispatchToProps = (dispatch)=>({
   
    handleSave:(values,id)=>{
        dispatch(actionCreator.getSaveAction(values,id))
    },
   
    
})

export default connect(mapStateToProps,mapDispatchToProps)(CategorySave)