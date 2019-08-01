// 财务模块

const pathPre = '/financemanage'

export default {
    path: pathPre,
    component: resolve => {
        require.ensure([], () => {
            resolve(require('../views/financeManage/Main'))
        })
    },
    children: [
        {
            path: 'order',
            name: 'finance-order',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/financeManage/finance/Order.vue'))
                })
            },
            meta: {
                title: '订单查询',
                noback: true
            }
        },
        {
            path: 'product',
            name: 'finance-product',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/financeManage/finance/product/Product.vue'))
                })
            },
            meta: {
                title: '商品列表',
                noback: true
            }
        },
        {
            path: 'product/add', //专家管理表单 -修改
            name: 'finance-product-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/financeManage/finance/product/ProductForm.vue'))
                })
            },
            meta: {
                title: '商品新建',
                noback: false
            }
        },
        {
            path: 'product/edit/:id', //专家管理表单 -修改
            name: 'finance-product-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/financeManage/finance/product/ProductForm.vue'))
                })
            },
            meta: {
                title: '商品修改',
                noback: false
            }
        },
        //优惠券管理
        {
            path: 'coupon',
            name: 'finance-coupon',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/financeManage/finance/coupon/Coupon.vue'))
                })
            },
            meta: {
                title: '优惠券列表',
                noback: true
            }
        },
        {
            path: 'coupon/add', //专家管理表单 -修改
            name: 'finance-coupon-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/financeManage/finance/coupon/CouponForm.vue'))
                })
            },
            meta: {
                title: '优惠券新建',
                noback: false
            }
        },
        {
            path: 'coupon/edit/:id', //专家管理表单 -修改
            name: 'finance-coupon-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/financeManage/finance/coupon/CouponForm.vue'))
                })
            },
            meta: {
                title: '优惠券修改',
                noback: false
            }
        },
        {
            path: 'redPacket',
            name: 'finance-redPacket',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/financeManage/finance/redPacket.vue'))
                })
            },
            meta: {
                title: '红包列表',
                noback: true
            }
        }
    ]
}
