import React , {Component} from 'react'
import { Layout, Breadcrumb, Form, Input, Button, Select, InputNumber ,Transfer } from 'antd';
import CustomLayout from 'components/custom-layout'
import UploadImage from 'components/upload-image'
import {connect} from 'react-redux'
import {actionCreator} from './store'
import {PRODUCT_IMAGE_UPLOAD,PRODUCT_DETAIL_IMAGES_UPLOAD} from 'api/config'
import RichEditor from 'components/rich-editor'
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
            selectedKeys:[], 
            mainImage:'',
            mainImageValidate:{
                    help:'',
                    validateStatus:''
            },
            images:'',
            imagesValidate:{
            help:'',
            validateStatus:'',
            detail:''
        },
        }
        this.formRef = React.createRef()
        this.handleChange = this.handleChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleMainImage = this.handleMainImage.bind(this)
        this.handleImages = this.handleImages.bind(this)
        this.handleFinish = this.handleFinish.bind(this)
        this.handleValidate = this.handleValidate.bind(this)
        this.handleDetail = this.handleDetail.bind(this)
    }
    
    handleChange(nextTargetKeys, direction, moveKeys){
        this.setState({ targetKeys: nextTargetKeys });
    
       
    };

    handleSelectChange(sourceSelectedKeys, targetSelectedKeys){
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

    };
    handleMainImage(image){
        this.setState({
            mainImage:image,
            mainImageValidate:{
                    help:'',
                    validateStatus:''
            },
        })
    }
    handleImages(images){
        this.setState({
            images:images,
            imagesValidate:{
                help:'',
                validateStatus:''
            },
        })
    }
    handleFinish(values){
        const { targetKeys ,mainImage,images,id,detail} = this.state
        if (targetKeys.length > 0) {
            values.attrs = targetKeys.join(',')
        }
        this.handleValidate()
        if(mainImage && images){
            values.id = id 
            values.mainImage = mainImage
            values.images = images,
            values.detail = detail
            this.props.handleSave(values)
        }
    }
    handleValidate(){
        const { mainImage,images} = this.state
        if(!mainImage){
            this.setState({
                mainImageValidate:{
                    help:'请上传封面图片',
                    validateStatus:'error'
                },
            })
        }
        if(!images){
            this.setState({
                imagesValidate:{
                    help:'请上传商品图片',
                    validateStatus:'error'
                },
            })
        }
    }
    handleDetail(detail){
        this.setState({
            detail:detail
        })
    }
    componentDidMount(){
        this.props.handleLevelCategories()
        this.props.handleAllAttrs()
    }
    render(){         
        const {
            categories,
            AllAttrs,
        } = this.props
        const {
            targetKeys,
            selectedKeys,
            mainImageValidate,
            imagesValidate,
        } = this.state
        const options = categories.map(cate => <Option key={cate._id} value={cate._id}>{cate.name}</Option>)
        const dataSource = AllAttrs.map(attr=>({key: attr._id, title: attr.name}))
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
                            onFinish={this.handleFinish}
                            onFinishFailed={this.handleValidate}
                            ref={this.formRef}
                            initialValues={{
                                stock:'0',
                                price:'0',
                                payNum:'0'
                            }}
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
                                name="description" 
                                label="商品描述" 
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
                                        message:"请输入商品价格"
                                    },
                                    
                                ]}
                            >
                                <InputNumber min={'0'}/>
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
                                <InputNumber min={'0'} />
                            </Form.Item> 
                            <Form.Item 
                                name="payNums" 
                                label="支付人数" 
                                
                            >
                                <InputNumber min={'0'}/>
                            </Form.Item>
                            <Form.Item 
                                  name="attrs"
                                  label="商品属性"
                            >
                                <Transfer
                                    dataSource={dataSource}
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
                                {...mainImageValidate}
                            >
                                <UploadImage
                                 max={1}
                                 action={PRODUCT_IMAGE_UPLOAD}
                                 getImageUrlList={this.handleMainImage}
                                 fileList={[]}
                                />
                            </Form.Item>   
                            <Form.Item 
                                label="商品图片" 
                                required={true}
                                {...imagesValidate}
                            >
                                <UploadImage
                                 max={3}
                                 action={PRODUCT_IMAGE_UPLOAD}
                                 getImageUrlList={this.handleImages}
                                 fileList={[]}
                                />
                            </Form.Item> 
                            <Form.Item 
                                label="商品详情" 
                                labelCol={ { span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                <RichEditor
                                    data="hello"
                                    uploadUrl={PRODUCT_DETAIL_IMAGES_UPLOAD}
                                    getData = {this.handleDetail}
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
    categories:state.get('product').get('categories'),
    AllAttrs:state.get('product').get('AllAttrs'),
   
})
const mapDispatchToProps = (dispatch)=>({
   
    handleSave:(values)=>{
        dispatch(actionCreator.getSaveAction(values))
    },
    handleLevelCategories:()=>{
        dispatch(actionCreator.getLevelCategoriesAction())
    },
    handleAllAttrs:()=>{
        dispatch(actionCreator.getAllAttrsAction())
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(ProductSave)