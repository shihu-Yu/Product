import React , {Component} from 'react'
import { Layout, Menu} from 'antd';
import {CustomHeader} from '../custom-header'
import {CustomSider} from '../custom-sider'
import './index.less'
const { SubMenu } = Menu;
const { Header, Sider } = Layout;
class  CustomLayout  extends Component{
    render(){
        return(
            <div className="CustomLayout">
                <Layout>
                    <CustomHeader/>
                    <Layout>
                        <CustomSider/>   
                        <Layout style={{ padding: '0 24px 24px' }}>
                            {this.props.children}
                        </Layout>  
                    </Layout>  
                </Layout>
            </div>
        )
    }
}

export default  CustomLayout 