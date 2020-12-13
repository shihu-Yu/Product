import React ,{Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import CategoryList from './list'
import OrderDetail from './detail'
class Category extends Component{
    render(){
        return(
            <Switch>
                <Route path="/order/detail/:detailId?" component={OrderDetail} />
                <Route path="/order" component={CategoryList} />
            </Switch>
        )
    }
}


export default Category