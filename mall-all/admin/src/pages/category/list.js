import React,{Component} from 'react'
import { Layout, Breadcrumb ,Table,Button,Input,Switch,InputNumber} from 'antd'
import CustomLayout from 'components/custom-layout'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {actionCreator} from './store'
const {  Content } = Layout;

class CategoryList extends Component{
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
            handleUpdateName,
            handleUpdateMobileName,
            handleUpdateIsShow,
            handleUpdateIsFloor,
            handleUpdateOrder,
        } = this.props
        const dataSource = list
        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
                width:'20%',
                render:(name,record)=><Input
                        style={{width:'60%'}}
                        defaultValue={name}
                        onBlur={ev=>{
                            if(ev.target.value != name){
                                handleUpdateName(record._id,ev.target.value)
                            }
                        }}
                    />
            },
            {
                title: '手机分类名称',
                dataIndex: 'mobileName',
                key: 'mobileName',
                width:'20%',
                render:(mobileName,record)=><Input
                        style={{width:'60%'}}
                        defaultValue={mobileName}
                        onBlur={ev=>{
                            if(ev.target.value != mobileName){
                                handleUpdateMobileName(record._id,ev.target.value)
                            }
                        }}
                    />
            },
            {
                title: '手机图标',
                dataIndex: 'icon',
                key: 'icon',
                width:'15%',
                render:icon=><img
                    style={{width:'50px',height:'50px',borderRadius:'50%'}}
                    src={icon}
                />
                
            },
            {
                title: '是否显示',
                dataIndex: 'isShow',
                key: 'isShow',
                width:'10%',
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
                title: '是否是楼层',
                dataIndex: 'isFloor',
                key: 'isFloor',
                width:'10%',
                render:(isFloor,record)=>{
                    return record.level == 1 ? <Switch
                    checkedChildren="显示"
                    unCheckedChildren="隐藏"
                    checked = {isFloor == 1 ? true : false}
                    onChange={
                        checked=>{
                            const newIsFloor = checked ? '1' : '0'
                            handleUpdateIsFloor(record._id, newIsFloor)
                        }
                    }
                    > </Switch> : null
                }
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
                title: '操作',
                render:(text,record)=><span>
                    <Link to={'/category/save/' + record._id} >修改</Link>
                </span>
            }
        ]
          
         
        return(
            <div className="Category">
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
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        marginBottom:'20px',
                        }}
                    >
                        <Link to='/category/save'>
                                <Button type="primary">新增分类</Button>
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
    list:state.get('category').get('list'),
    current:state.get('category').get('current'),
    pageSize:state.get('category').get('pageSize'),
    total:state.get('category').get('total'),
    isFetching: state.get('category').get('isFetching')
})
const mapDispatchToProps = (dispatch)=>({
    handlePage:(page)=>{
        dispatch(actionCreator.getPageAction(page))
    },
    handleUpdateName(id,newName){
        dispatch(actionCreator.getUpdateNameAction(id,newName))
    },
    handleUpdateMobileName(id,newMobileName){
        dispatch(actionCreator.getUpdateMobileNameAction(id,newMobileName))
    },
    handleUpdateIsShow(id,newIsShow){
        dispatch(actionCreator.getUpdateIsShowAction(id,newIsShow))
    },
    handleUpdateIsFloor(id,newIsFloor){
        dispatch(actionCreator.getUpdateIsFloorAction(id,newIsFloor))
    },
    handleUpdateOrder(id,newOrder){
        dispatch(actionCreator.getUpdateOrderAction(id,newOrder))
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)