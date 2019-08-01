// 区块模块
// 角色模块
const pathPre = '/setting'
//  角色管理
export default {
    path: pathPre,
    component: resolve => {
        require.ensure([], () => {
            resolve(require('../views/setting/Main.vue'))
        })
    },
    children: [
        //列表管理
        {
            path: 'lists',
            name: 'setting-list',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/setting/Index.vue'))
                })
            },
            meta: {
                title: '设置',
                noback: true
            }
        },
        {
            path: 'add',
            name: 'setting-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/setting/Form.vue'))
                })
            },
            meta: {
                title: '设置添加',
                noback: false
            }
        },
        {
            path: 'edit/:sys_id',
            name: 'setting-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/setting/Form.vue'))
                })
            },
            meta: {
                title: '设置更新',
                noback: false
            }
        },
    ]
}
