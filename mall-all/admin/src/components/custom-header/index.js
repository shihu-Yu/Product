import React , {Component} from 'react'
import { Layout, Menu,Dropdown} from 'antd';
import {DownOutlined,LogoutOutlined } from '@ant-design/icons';
import { getUsername,removeUsername,goLogin} from 'util'
import './index.less'
const { SubMenu } = Menu;
const { Header} = Layout;
import api from 'api'

export class  CustomHeader  extends Component{
    constructor(props){
        super(props)
        this.handelLogout = this.handelLogout.bind(this)
    }
    async handelLogout(){
        const result = await api.logout()
        removeUsername()
        goLogin()
    }
    render(){
        const menu = (
            <Menu>
                <Menu.Item key="0">
                <a onClick={this.handelLogout}><LogoutOutlined /> 退出</a>
                </Menu.Item>
            </Menu>
          )
        return(
            <div className="CustomHeader">
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
            </div>
        )
    }
}
