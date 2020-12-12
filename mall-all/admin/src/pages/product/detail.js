import React , {Component} from 'react'
import { Layout, Breadcrumb, Form, Input, Button, Tag , InputNumber ,Transfer } from 'antd';
import CustomLayout from 'components/custom-layout'
import UploadImage from 'components/upload-image'
import {connect} from 'react-redux'
import {actionCreator} from './store'
import {PRODUCT_IMAGE_UPLOAD,PRODUCT_DETAIL_IMAGES_UPLOAD} from 'api/config'
import RichEditor from 'components/rich-editor'
import api from 'api'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 8 },
}
const {  Content } = Layout;

class ProductDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:this.props.match.params.productId,
            product:{}
        },
        this.formRef = React.createRef()
    }
    async componentDidMount(){
        if(this.state.id){
            // 回填数据
            const result = await  api.getProductDetail({id:this.state.id})
            if(result.code == 0){
                const data = result.data
                console.log(data)
                this.formRef.current.setFieldsValue({
                    category:data.category.name,
                    name:data.name,
                    description:data.description,
                    price:data.price,
                    stock:data.stock,
                    payNums:data.payNums
                })
                this.setState({
                    product:data
                })
            }
        }
    }
    render(){         
        const {attrs,mainImage}=this.state.product
        let attrTag = null
        if(attrs){
            attrTag = attrs.map((attr)=><Tag key={attr._id}>{attr.key}</Tag>)
        }
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
                        >
                            <Form.Item 
                                name="category" 
                                label="商品分类" 
                                
                            >
                                <Input
                                    disabled={true} 
                                />
                            </Form.Item>
                            <Form.Item 
                                name="name" 
                                label="商品名称"   
                            >
                                <Input disabled={true} />
                            </Form.Item> 
                            <Form.Item 
                                name="description" 
                                label="商品描述" 
                            >
                                <Input disabled={true}/>
                            </Form.Item> 
                            <Form.Item 
                                name="price" 
                                label="商品价格" 
                            >
                                <InputNumber disabled={true}/>
                            </Form.Item> 
                            <Form.Item 
                                name="stock" 
                                label="商品库存" 
                            >
                                <InputNumber disabled={true} />
                            </Form.Item> 
                            <Form.Item 
                                name="payNums" 
                                label="支付人数" 
                            >
                                <InputNumber disabled={true}/>
                            </Form.Item>
                            <Form.Item 
                                  name="attrs"
                                  label="商品属性"
                            >
                                {attrTag}
                            </Form.Item>
                            <Form.Item 
                                label="封面图片" 
                                required={true}
                            >
                                
                            </Form.Item>   
                            <Form.Item 
                                label="商品图片" 
                                required={true}
                            >
                                
                            </Form.Item> 
                            <Form.Item 
                                label="商品详情" 
                                labelCol={ { span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                
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

export default ProductDetail