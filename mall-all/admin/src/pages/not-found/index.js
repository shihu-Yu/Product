import React ,{Component} from 'react'
import { Result, Button } from 'antd'
import {goHome} from 'util'

class NotFound extends Component{
    render(){
        return(
            <div className="Notfound" >
                <Result
                    status="404"
                    title="404"
                    subTitle="对不起，您访问的页面不存在."
                    extra={<Button onClick={goHome} type="primary">返回首页</Button>}
                />
            </div>
        )
    }
}

export default NotFound