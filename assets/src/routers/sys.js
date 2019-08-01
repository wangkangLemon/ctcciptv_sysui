// 系统模块
// 管理员模块
const pathPre = '/sys'
//  管理员管理
export default {
    path: pathPre,
    component: resolve => {
        require.ensure([], () => {
            resolve(require('../views/sys/Main.vue'))
        })
    },
    children: [
        {
            path: 'admin',
            name: 'sys-index',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/admin/Index.vue'))
                })
            },
            meta: {
                title: '管理员',
                noback: true
            }
        },
        {
            path: 'admin/add',
            name: 'sys-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/admin/Form.vue'))
                })
            },
            meta: {
                title: '管理员添加',
                noback: false
            }
        },
        {
            path: 'edit/:sys_id',
            name: 'sys-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/admin/Form.vue'))
                })
            },
            meta: {
                title: '管理员更新',
                noback: false
            }
        },
        //角色组路由导航
        {
            path: 'role',
            name: 'role-index',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/role/Index.vue'))
                })
            },
            meta: {
                title: '角色管理',
                noback: true
            }
        },
        {
            path: 'role/add',
            name: 'role-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/role/Form.vue'))
                })
            },
            meta: {
                title: '角色组添加',
                noback: false
            }
        },
        {
            path: 'role/edit/:role_id',
            name: 'role-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/role/Form.vue'))
                })
            },
            meta: {
                title: '角色组更新',
                noback: false
            }
        },
        {
            path: 'role/role_menus/:role_id',
            name: 'role_menus',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/role/roleMenus.vue'))
                })
            },
            meta: {
                title: '角色组授权菜单',
                noback: false
            }
        },
        {
            path: 'role/role_nodes/:role_id',
            name: 'role_nodes',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/role/roleNodes.vue'))
                })
            },
            meta: {
                title: '角色组授权节点',
                noback: false
            }
        },
         //菜单管理
        // {
        //     path: 'menu',
        //     name: 'menu-index',
        //     component: resolve => {
        //         require.ensure([], () => {
        //             resolve(require('../views/sys/menu/Index.vue'))
        //         })
        //     },
        //     meta: {
        //         title: '菜单管理',
        //         noback: true
        //     }
        // },
        {
            path: 'menu',
            name: 'menu-index',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/menu/MenuManage.vue'))
                })
            },
            meta: {
                title: '菜单管理',
                noback: true
            }
        },
        {
            path: 'menu/add',
            name: 'menu-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/menu/Form.vue'))
                })
            },
            meta: {
                title: '菜单添加',
                noback: false
            }
        },
        {
            path: 'menu/edit/:sys_id',
            name: 'menu-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/menu/Form.vue'))
                })
            },
            meta: {
                title: '菜单更新',
                noback: false
            }
        }, 
         //节点管理
        {
            path: 'node',
            name: 'node-index',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/node/Index.vue'))
                })
            },
            meta: {
                title: '节点',
                noback: true
            }
        },
        {
            path: 'node/add',
            name: 'node-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/node/Form.vue'))
                })
            },
            meta: {
                title: '节点添加',
                noback: false
            }
        },
        {
            path: 'node/edit/:sys_id',
            name: 'node-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/node/Form.vue'))
                })
            },
            meta: {
                title: '节点更新',
                noback: false
            }
        }, 
        {
            path: 'operation/log',
            name: 'operation-log',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/Operation/Log.vue'))
                })
            },
            meta: {
                title: '后台操作日志',
                noback: true
            }
        },
        {
            path: 'shortMessage/log',
            name: 'shortMessage-log',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/sys/shortMessage/log.vue'))
                })
            },
            meta: {
                title: '短信请求日志',
                noback: true
            }
        },
        {
            path: 'push/msg',
            name: 'push-msg',
            component: resolve => {
                require.ensure([], () => {
                resolve(require('../views/sys/PushMsg.vue'))
                })
            },
            meta: {
                title: '推送消息',
                noback: true
            }
        }, 
        {
            path: 'message',
            name: 'message',
            component: resolve => {
                require.ensure([], () => {
                resolve(require('../views/sys/message/Message.vue'))
                })
            },
            meta: {
                title: '消息中心',
                noback: true
            }
        },
        {
            path: 'message/add', //专家管理表单 -修改
            name: 'message-add',
            component: resolve => {
                require.ensure([], () => {
                resolve(require('../views/sys/message/MessForm.vue'))
                })
            },
            meta: {
                title: '消息新建',
                noback: false
            }
            }, {
            path: 'message/edit/:id', //专家管理表单 -修改
            name: 'message-edit',
            component: resolve => {
                require.ensure([], () => {
                resolve(require('../views/sys/message/MessForm.vue'))
                })
            },
            meta: {
                title: '消息修改',
                noback: false
            }
        },
    ]
}
