import React,{Component} from 'react'
import { Layout, Breadcrumb ,Table,Button,Image,Switch,InputNumber} from 'antd'
import CustomLayout from 'components/custom-layout'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {actionCreator} from './store'
const {  Content } = Layout;

class AdList extends Component{
    componentDidMount(){
        this.props.handlePage(1)
    }
    render(){
        const {
            list,
            current,
            pageSize,
            total,
            handlePage,
            isFetching,
            handleUpdateIsShow,
            handleUpdateOrder,
        } = this.props
        const dataSource = list
        const columns = [
            {
                title: '广告名称',
                dataIndex: 'name',
                width:'20%',
                
            },
            {
                title: '广告位置',
                dataIndex: 'position',
                width:'20%',
                render:position=>position == '1' ? "电脑端首页轮播图" : "移动端首页轮播图"
            },
            {
                title: '广告缩略图',
                dataIndex: 'image',
                key: 'image',
                width:'20%',
                render:image=><Image
                    width={50}
                    src={image}
                />
                
            },
            {
                title: '排序',
                dataIndex: 'order',
                key: 'order',
                width:'15%',
                render:(order,record)=><InputNumber
                        style={{width:'70%'}}
                        defaultValue={order}
                        onBlur={ev=>{
                                if(ev.target.value != order){
                                    handleUpdateOrder(record._id,ev.target.value)
                                }
                            }   
                        }
                    >
                </InputNumber>
            },
            {
                title: '是否显示',
                dataIndex: 'isShow',
                key: 'isShow',
                width:'15%',
                render:(isShow,record)=><Switch
                    checkedChildren='显示'
                    unCheckedChildren='隐藏'
                    checked={isShow == 1 ? true : false}
                    onChange={
                        checked=>{
                            const newIsShow = checked ? '1' : '0'
                            handleUpdateIsShow(record._id, newIsShow)
                        }
                    }
                >

                </Switch>
            },
            {
                title: '操作',
                render:(text,record)=><span>
                    <Link to={'/ad/save/' + record._id} >修改</Link>
                </span>
            }
        ]
          
         
        return(
            <div className="AdList">
                <CustomLayout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>分类</Breadcrumb.Item>
                        <Breadcrumb.Item>广告列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        }}
                    >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        marginBottom:'20px',
                        }}
                    >
                        <Link to='/ad/save'>
                                <Button type="primary">新增广告</Button>
                        </Link>
                    </div>
                    <Table  
                        rowKey="_id" 
                        dataSource={dataSource} 
                        columns={columns} 
                        pagination={
                            {
                                current:current,
                                pageSize:pageSize,
                                total:total,
                                showSizeChanger:false
                            }
                        }
                        onChange={
                            (pagination)=>{
                                handlePage(pagination.current)
                            }
                        }
                        loading={
                            {
                                spinning: isFetching,
                                tip:'数据正在请求中...'
                            }
                        }
                    />
                    </Content>
                </CustomLayout>
            </div>
        )
    }
}
const mapStateToProps = (state)=>({
    list:state.get('ad').get('list'),
    current:state.get('ad').get('current'),
    pageSize:state.get('ad').get('pageSize'),
    total:state.get('ad').get('total'),
    isFetching: state.get('ad').get('isFetching')
})
const mapDispatchToProps = (dispatch)=>({
    handlePage:(page)=>{
        dispatch(actionCreator.getPageAction(page))
    },
    handleUpdateIsShow(id,newIsShow){
        dispatch(actionCreator.getUpdateIsShowAction(id,newIsShow))
    },
    handleUpdateOrder(id,newOrder){
        dispatch(actionCreator.getUpdateOrderAction(id,newOrder))
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(AdList)