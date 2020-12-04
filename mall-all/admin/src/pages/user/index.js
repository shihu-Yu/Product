import React,{Component} from 'react'
import { Layout, Breadcrumb ,Table} from 'antd'
import CustomLayout from 'components/custom-layout'
import {connect} from 'react-redux'
import {actionCreator} from './store'
const {  Content } = Layout;

class User extends Component{
    render(){
        const dataSource = [
            {
                key: '1',
                username: 'admin',
                isAdmin:'是',
                isActive:'是',
                email:'121@qq.com',
                phone:'13412344321',
                wxopenid:'sdfsgfgfd',
                createAt:'2020-12-03'
            }, 
          ];
          
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '是否管理员',
                dataIndex: 'isAdmin',
                key: 'isAdmin',
            },
            {
                title: '是否有效用户',
                dataIndex: 'isActive',
                key: 'isActive',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
              },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '微信openid',
                dataIndex: 'wxopenid',
                key: 'wxopenid',
            },
            {
                title: '创建时间',
                dataIndex: 'createAt',
                key: 'createAt',
            }
        ]
          
         
        return(
            <div className="User">
                <CustomLayout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>用户列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        }}
                    >
                    <Table dataSource={dataSource} columns={columns} />
                    </Content>
                </CustomLayout>
            </div>
        )
    }
}
const mapStateToProps = (state)=>({
    list:state.get('user').get('list')
})
const mapDispatchToProps = (dispatch)=>({
    
    handle:()=>{
        dispatch(actionCreator.getPageAction())
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(User)