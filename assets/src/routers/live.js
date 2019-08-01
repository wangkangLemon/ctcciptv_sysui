// 直播管理模块
const pathPre = '/live'
//  管理员管理
export default {
    path: pathPre,
    component: resolve => {
        require.ensure([], () => {
            resolve(require('../views/live/Main.vue'))
        })
    },
    children: [
        // // 直播查询
        {
            path: 'list',
            name: 'live-list',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/live/Live.vue'))
                })
            },
            meta: {
                title: '直播查询',
                noback: true
            }
        },
        {
            path: 'add', // 添加和编辑课程
            name: 'live-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/live/LiveForm.vue'))
                })
            },
            meta: {
                title: '直播新建',
            }
        },
        {
            path: 'edit/:id', // 添加和编辑课程
            name: 'live-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/live/LiveForm.vue'))
                })
            },
            meta: {
                title: '直播修改',
            }
        },

        // // 直播评论查询
        {
            path: 'comment/:id',
            name: 'live-comment',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/live/Comment.vue'))
                })
            },
            meta: {
                title: '评论查询',
                noback: false
            }
        },
        {
            path: 'comment/add', // 添加和编辑课程
            name: 'live-comment-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/live/CommentForm.vue'))
                })
            },
            meta: {
                title: '评论新建',
            }
        },
        {
            path: 'comment/edit/:id', // 添加和编辑课程
            name: 'live-comment-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/live/CommentForm.vue'))
                })
            },
            meta: {
                title: '评论修改',
            }
        },
    ]
}
