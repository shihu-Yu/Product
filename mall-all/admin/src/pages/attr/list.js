import React,{Component} from 'react'
import { Layout, Breadcrumb ,Table,Button,InputNumber} from 'antd'
import CustomLayout from 'components/custom-layout'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {actionCreator} from './store'
const {  Content } = Layout;

class AttrList extends Component{
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
            handleUpdateOrder,
        } = this.props
        const dataSource = list
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            },    
            {
                title: '属性键',
                dataIndex: 'key',
                key: 'key',
            },
            {
                title: '属性值',
                dataIndex: 'value',
                key: 'value',
            },
            {
                title: '排序',
                dataIndex: 'order',
                key: 'order',
                render:(order,record)=><InputNumber
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
                    <Link to={'/attr/save/' + record._id} >修改</Link>
                </span>
            }
        ]
          
         
        return(
            <div className="Attr">
                <CustomLayout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>属性</Breadcrumb.Item>
                            <Breadcrumb.Item>属性列表</Breadcrumb.Item>
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
                            marginBottom:'20px'
                        }}
                    >
                        <Link to='/attr/save'>
                            <Button type="primary">新增属性</Button>
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
    list:state.get('attr').get('list'),
    current:state.get('attr').get('current'),
    pageSize:state.get('attr').get('pageSize'),
    total:state.get('attr').get('total'),
    isFetching: state.get('attr').get('isFetching')
})
const mapDispatchToProps = (dispatch)=>({
    handlePage:(page)=>{
        dispatch(actionCreator.getPageAction(page))
    },
    handleUpdateOrder(id,newOrder){
        dispatch(actionCreator.getUpdateOrderAction(id,newOrder))
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(AttrList)