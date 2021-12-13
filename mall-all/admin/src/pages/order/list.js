import React,{Component} from 'react'
import { Layout} from 'antd'
import CustomLayout from 'components/custom-layout'
import {Link} from 'react-router-dom'

const {  Content } = Layout;

class OrderList extends Component{
    render(){
        return(
            <div className="OrderList">
                this is OrderList page
            </div>
        )
    }
}

export default OrderList