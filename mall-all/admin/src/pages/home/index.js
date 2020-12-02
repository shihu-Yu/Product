import React , {Component} from 'react'
import { Layout, Menu, Breadcrumb,Dropdown  } from 'antd';
import { UserOutlined, HomeOutlined, UnorderedListOutlined ,DownOutlined,LogoutOutlined } from '@ant-design/icons';
import { getUsername } from 'util'
import {BrowserRouter as Router,Route,Switch,Redirect, NavLink} from 'react-router-dom'
import './index.less'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class Home extends Component{
    render(){
        const menu = (
            <Menu>
                <Menu.Item key="0">
                <a onClick={()=>{console.log(123)}}><LogoutOutlined /> 退出</a>
                </Menu.Item>
            </Menu>
          )
        return(
            <Router>
                <div className="Home">
                    <Layout>
                        <Header className="header">
                            <div className="logo" >SortMall</div> 
                            <div className="logout">
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    {getUsername()}<DownOutlined />
                                    </a>
                                </Dropdown>
                            </div>   
                        </Header>
                        <Layout>
                            <Sider width={200} className="site-layout-background">
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={['1']}
                            
                                    style={{ height:600, borderRight: 0 }}
                                >
                                
                                    <Menu.Item key="1" icon={<HomeOutlined />}>
                                        <NavLink to="/">首页</NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="2" icon={<UserOutlined />}>
                                        <NavLink to="/user">用户管理</NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="3" icon={<UnorderedListOutlined />}>
                                        <NavLink to="/category">分类管理</NavLink>
                                    </Menu.Item>
                                    
                                    {/* <Route path='/' component={Home}></Route>
                                    <Route path='/user' ></Route>
                                    <Route path='/category' ></Route> */}
                                </Menu>
                            </Sider>

                            <Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                }}
                            >
                                Content
                            </Content>
                            </Layout>
                        </Layout>
                    </Layout>
                </div>
            </Router>
        )
    }
}

export default Home