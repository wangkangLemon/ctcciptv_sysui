// 医政管理模块
const pathPre = '/vip'
//  管理员管理
export default {
    path: pathPre,
    component: resolve => {
        require.ensure([], () => {
            resolve(require('../views/vip/Main.vue'))
        })
    },
    children: [
        // // 部门人员查询
        {
            path: 'list',
            name: 'vip-list',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/vip/List.vue'))
                })
            },
            meta: {
                title: '会员查询',
                noback: true
            }
        },
        // // 部门人员查询
        {
            path: 'gov',
            name: 'gov-vip',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/vip/govVip.vue'))
                })
            },
            meta: {
                title: '部门会员',
                noback: true
            }
        },
        {
            path: 'vip/pay', // 添加和编辑课程
            name: 'vip-pay',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/vip/govVipForm.vue'))
                })
            },
            meta: {
                title: 'VIP充值-部门',
            }
        },
    ]
}
