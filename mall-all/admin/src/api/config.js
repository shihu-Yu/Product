// api的配置文件
export const SERVER =  process.env.NODE_ENV == 'production' ? 'http://api.sortmall.com' : ''
export const VERSION = 'v1'
export const CATEGORY_ICON_UPLOAD = SERVER + '/' + VERSION + '/categories/icons'
export const PRODUCT_IMAGE_UPLOAD = SERVER + '/' + VERSION + '/products/images'
export const PRODUCT_DETAIL_IMAGES_UPLOAD = SERVER + '/' + VERSION + '/products/detailImages'
export const API_CONFIG = {
    // 数组中第一个参数是请求地址 第二个参数是请求方法

    login:                          ['/users/login','post'],
    getCaptcha:                     ['/users/captcha','get'],
    getCounts:                      ['/counts','get'],
    logout:                         ['/users/logout','get'],
    getUserList:                    ['/users/list','get'],
    updateUsersIsActive:            ['/users/isActive', 'put'], 

    // 分类
    addCategory:                    ['/categories', 'post'], 
    updateCategory:                 ['/categories', 'put'], 
    getLevelCategories:             ['/categories/levelCategories', 'get'], 
    getCategoriesList:              ['/categories/list', 'get'], 
    updateCategoriesName:           ['/categories/name', 'put'], 
    updateCategoriesMobileName:     ['/categories/mobileName', 'put'], 
    updateCategoriesIsShow:         ['/categories/isShow', 'put'],
    updateCategoriesIsFloor:        ['/categories/isFloor', 'put'],
    updateCategoriesOrder:          ['/categories/order', 'put'],
    getCategoryDetail:              ['/categories/detail', 'get'],

    // 属性
    addAttr:                        ['/attrs', 'post'], 
    updateAttr:                     ['/attrs', 'put'], 
    getAttrsDetail:                 ['/attrs/detail', 'get'],
    updateAttrsOrder:               ['/attrs/order', 'put'],
    getAttrList:                    ['/attrs/list', 'get'], 
    getAllAttrs:                    ['/attrs/allAttrs', 'get'], 

    // 商品
    addProduct:                     ['/products', 'post'], 
    updateProduct:                  ['/products', 'put'], 
    getProductList:                 ['/products/list', 'get'],
    updateProductIsShow:            ['/products/isShow', 'put'],
    updateProductStatus:            ['/products/status', 'put'],
    updateProductIsHot:             ['/products/isHot', 'put'],
    updateProductOrder:             ['/products/order', 'put'],
    getProductDetail:               ['/products/detail', 'get'],
}