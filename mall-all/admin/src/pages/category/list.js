import React ,{Component} from 'react'
import {Link,Route} from 'react-router-dom'
import CategorySave from './save'


class CategoryList extends Component{
    render(){
        return(
            <Route>
                <div className="categoryList">
                    <Link to="category/save/:categoryId"  >新增</Link>
                    this is category list page
                </div>
            </Route>
        )
    }
}


export default CategoryList