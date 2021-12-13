import Mock from 'mockjs'

import homeApi from './mockServerData/home'
import userApi from './mockServerData/user'
import MallApi from './mockServerData/mall'
Mock.mock('/api/login',userApi.login)
Mock.mock('/api/register',userApi.Register)
Mock.mock('/api/home/getData',homeApi.getStatisticalData)
Mock.mock('/api/user/getData',userApi.getUserData)
Mock.mock('/api/user/search',userApi.searchUser)
Mock.mock('/api/user/add',userApi.addUserList)
Mock.mock('/api/user/edit',userApi.EditUser)
Mock.mock('/api/user/updatepass',userApi.updatePass)
// 这里需要引用正则来使得带有参数的路由可以匹配的上
Mock.mock(RegExp('/api/user/del' + ".*"),userApi.delUser)

Mock.mock('/api/mall/getData',MallApi.getMallData)
Mock.mock('/api/mall/add',MallApi.addMall)
Mock.mock('/api/mall/edit',MallApi.editMall)
Mock.mock(RegExp('/api/mall/del' + ".*"),MallApi.delMall)
