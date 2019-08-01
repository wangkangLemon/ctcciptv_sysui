// 区块模块
// 角色模块
const pathPre = '/section'
//  角色管理
export default {
    path: pathPre,
    component: resolve => {
        require.ensure([], () => {
            resolve(require('../views/section/Main.vue'))
        })
    },
    children: [
        {
            path: 'category',
            name: 'section-category',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/section/category.vue'))
                })
            },
            meta: {
                title: '区块 - 分类',
                noback: true
            }
        },
        //数据管理
        {
            path: 'data',
            name: 'section-data',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/section/Index.vue'))
                })
            },
            meta: {
                title: '区块-数据',
                noback: true
            }
        },
        //数据管理
        // {
        //     path: 'data',
        //     name: 'section-data',
        //     component: resolve => {
        //         require.ensure([], () => {
        //             resolve(require('../views/section/SecData.vue'))
        //         })
        //     },
        //     meta: {
        //         title: '区块-数据',
        //         noback: true
        //     }
        // },
        {
            path: 'add', 
            name: 'section-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/section/Form.vue'))
                })
            },
            meta: {
                title: '数据添加',
                noback: false
            }
        },
        {
            path: 'edit/:sys_id',
            name: 'section-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/section/Form.vue'))
                })
            },
            meta: {
                title: '数据更新',
                noback: false
            }
        },
         {
            path: 'app/menu',
            name: 'section-app-menu',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/section/appmenu/Index.vue'))
                })
            },
            meta: {
                title: '客户端菜单',
                noback: true
            }
        },
    ]
}
