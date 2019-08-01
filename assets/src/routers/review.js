// 审核模块
const pathPre = '/review'
export default {
    path: pathPre,
    component: resolve => {
        require.ensure([], () => {
            resolve(require('../views/review/Main.vue'))
        })
    },
    children: [
        // // 部门人员查询
        {
            path: 'cert',
            name: 'review-cert',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/review/cert.vue'))
                })
            },
            meta: {
                title: '医师资格申请',
                noback: true
            }
        },
        {
            path: 'cert/edit', // 添加和编辑课程
            name: 'review-CertForm-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/review/CertForm.vue'))
                })
            },
            meta: {
                title: '医师资格查看',
            }
        },
        // {
        //     path: 'send',
        //     name: 'review-send',
        //     component: resolve => {
        //         require.ensure([], () => {
        //             resolve(require('../views/review/announceSend.vue'))
        //         })
        //     },
        //     meta: {
        //         title: '公告发送',
        //         noback: false
        //     }
        // },
        // {
        //     path: 'contacts',
        //     name: 'review-contacts',
        //     component: resolve => {
        //         require.ensure([], () => {
        //             resolve(require('../views/review/announceContacts.vue'))
        //         })
        //     },
        //     meta: {
        //         title: '公告发送',
        //         noback: false
        //     }
        // },
        // {
        //     path: 'edit/:sys_id',
        //     name: 'review-edit',
        //     component: resolve => {
        //         require.ensure([], () => {
        //             resolve(require('../views/review/Form.vue'))
        //         })
        //     },
        //     meta: {
        //         title: '设置更新',
        //         noback: false
        //     }
        // },
       
    ]
}
