import React , {Component} from 'react'
import { Layout, Menu} from 'antd';
import { 
        UserOutlined, 
        HomeOutlined,
        UnorderedListOutlined ,
        ContainerOutlined,
        ShopOutlined,
        OrderedListOutlined,
        DollarOutlined,
        LockOutlined
        } from '@ant-design/icons';
import { NavLink} from 'react-router-dom'
import './index.less'
const { Sider } = Layout;
export class  CustomSider  extends Component{
    render(){
        return(
            <div className="CustomSider"> 
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        style={{ height: 800, borderRight: 0 }}
                    >
                        <Menu.Item key="1">
                            <NavLink exact to="/"> <HomeOutlined /> 首页</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <NavLink to="/user"><UserOutlined /> 用户管理</NavLink>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <NavLink to="/category"><UnorderedListOutlined /> 分类管理</NavLink>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <NavLink to="/attr"><ContainerOutlined />属性管理</NavLink>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <NavLink to="/product"><ShopOutlined />商品管理</NavLink>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <NavLink to="/product"><OrderedListOutlined />订单管理</NavLink>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <NavLink to="/product"><DollarOutlined />广告管理</NavLink>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <NavLink to="/product"><LockOutlined />密码管理</NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
            </div>
        )
    }
}