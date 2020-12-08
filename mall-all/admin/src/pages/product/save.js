import React , {Component} from 'react'
import { Layout, Breadcrumb, Form, Input, Button, Select, InputNumber ,Transfer } from 'antd';
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

class ProductSave extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:this.props.match.params.categoryId,
            targetKeys:[],
            selectedKeys:[]
        }
        this.formRef = React.createRef()
        this.handleChange = this.handleChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
    }
    handleChange(nextTargetKeys, direction, moveKeys){
        this.setState({ targetKeys: nextTargetKeys });
    
        console.log('targetKeys: ', nextTargetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);
      };
    
      handleSelectChange(sourceSelectedKeys, targetSelectedKeys){
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
    
        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        console.log('targetSelectedKeys: ', targetSelectedKeys);
      };
    render(){         
        const {
            handleSave,
        } = this.props
        const {
            targetKeys,
            selectedKeys
        } = this.state
        const options = [<Option key="0" value="0">根分类</Option>]
        return(
            <div className="ProductSave">
                <CustomLayout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>商品</Breadcrumb.Item>
                        <Breadcrumb.Item>{this.state.id ? "编辑商品" : "添加商品" }</Breadcrumb.Item>
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
                            onFinish={()=>{}}
                            onFinishFailed={()=>{}}
                            ref={this.formRef}
                        >
                            <Form.Item 
                                name="category" 
                                label="商品分类" 
                                rules={[
                                    {
                                        required: true,
                                        message:"请选择商品分类"
                                    }
                                ]}
                                
                            >
                                <Select
                                    placeholder="请选择商品分类"
                                    
                                >
                                    {options}
                                </Select>
                            </Form.Item>
                            <Form.Item 
                                name="name" 
                                label="商品名称" 
                                rules={[
                                    {
                                        required: true,
                                        message:"请输入商品名称"
                                    }
                                ]}
                                
                            >
                                <Input />
                            </Form.Item> 
                            <Form.Item 
                                name="price" 
                                label="商品价格" 
                                rules={[
                                    {
                                        required: true,
                                        message:"商品价格"
                                    }
                                ]}
                            >
                                <InputNumber />
                            </Form.Item> 
                            <Form.Item 
                                name="stock" 
                                label="商品库存" 
                                rules={[
                                    {
                                        required: true,
                                        message:"商品库存"
                                    }
                                ]}
                            >
                                <InputNumber />
                            </Form.Item> 
                            <Form.Item 
                                name="payNum" 
                                label="支付人数" 
                                
                            >
                                <InputNumber />
                            </Form.Item>
                            <Form.Item 
                                  name="attrs"
                                  label="商品属性"
                            >
                                <Transfer
                                    dataSource={[{ key: '0', title: '服装尺寸' }, { key: '1', title: '电脑颜色' }]}
                                    titles={['未选属性', '已选属性']}
                                    targetKeys={targetKeys}
                                    selectedKeys={selectedKeys}
                                    onChange={this.handleChange}
                                    onSelectChange={this.handleSelectChange}
                                    render={item => item.title}
                                    style={{ marginBottom: 16 }}
                                />   
                            </Form.Item>
                            <Form.Item 
                                label="封面图片" 
                                required={true}
                            >
                                <UploadImage
                                 max={1}
                                 action={CATEGORY_ICON_UPLOAD}
                                 getImageUrlList={()=>{}}
                                 fileList={[]}
                                />
                            </Form.Item>   
                            <Form.Item 
                                label="商品图片" 
                                required={true}
                            >
                                <UploadImage
                                 max={3}
                                 action={CATEGORY_ICON_UPLOAD}
                                 getImageUrlList={()=>{}}
                                 fileList={[]}
                                />
                            </Form.Item> 
                            <Form.Item 
                                label="商品详情" 
                                
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

export default connect(mapStateToProps,mapDispatchToProps)(ProductSave)