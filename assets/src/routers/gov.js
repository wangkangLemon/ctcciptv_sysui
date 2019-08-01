// 医政管理模块
const pathPre = '/gov'
//  管理员管理
export default {
    path: pathPre,
    component: resolve => {
        require.ensure([], () => {
            resolve(require('../views/gov/Main.vue'))
        })
    },
    children: [
        {
            path: 'index',  //政府管理主页列表
            name: 'gov-index',  
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/Gov.vue'))
                })
            },
            meta: {
                title: '政府',
                noback: true
            }
        },
        {
            path: 'gov/add',
            name: 'gov-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/GovOperate.vue'))
                })
            },
            meta: {
                title: '政府添加',
                noback: false
            }
        },
        {
            path: 'edit/:id',
            name: 'gov-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/GovOperate.vue'))
                })
            },
            meta: {
                title: '政府更新',
                noback: false
            }
        },
        {
            path: 'admin/:gov_id',
            name: 'gov-admin',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/Admin.vue'))
                })
            },
            meta: {
                title: '部门人员',
            }
        },
        {
            path: 'user',  // // 部门人员查询
            name: 'user-index',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/user/Index.vue'))
                })
            },
            meta: {
                title: '医政 - 人员',
                noback: true
            }
        },
        {//导入考题表单
            path: 'user/import',
            name: 'user-import',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/user/PersonImport.vue'))
                })
            },
            meta: {
                title: '人员添加',
                noback: false
            }
        },
        // //编辑管理员
            // {
            //     path: 'user/edit/:user_id',
            //     name: 'user-edit',
            //     component: resolve => {
            //         require.ensure([], () => {
            //             resolve(require('../views/gov/user/Form.vue'))
            //         })
            //     },
            //     meta: {
            //         title: '管理员修改',
            //         noback: false
            //     }
            // },
         //新建人员
            {
                path: 'person/add',
                name: 'person-add',
                component: resolve => {
                    require.ensure([], () => {
                        resolve(require('../views/gov/user/personForm.vue'))
                    })
                },
                meta: {
                    title: '人员新建',
                    noback: false
                }
            },
        {
            path: 'person/edit/:id',//编辑人员
            name: 'person-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/user/personForm.vue'))
                })
            },
            meta: {
                title: '人员修改',
                noback: false
            }
        },

// 课程任务
        // 课程任务模板
        {
            path: 'coursetask/template',
            name: 'gov-coursetasktemplate',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/courseTask/Coursetasktemplate.vue'))
                })
            },
            meta: {
                title: '课程任务模板',
                noback: true
            }
        },
        // 添加修改课程任务模板
        {
            path: 'coursetask/template/add',
            name: 'coursetask-template-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/courseTask/AddCoursetasktemplate.vue'))
                })
            },
            meta: {
                title: '添加课程任务模板',
            }
        },
        // 课程任务模板栏目
        {
            path: 'coursetask/template/category',
            name: 'company-coursetasktemplate-category',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/courseTask/Coursetasktemplatecategory.vue'))
                })
            },
            meta: {
                title: '课程任务模板分类',
                noback: true
            }
        },
// 考试任务
        // 考试任务模板
        {
            path: 'examtask/template',
            name: 'gov-examtasktemplate',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/examTask/ExamManage.vue'))
                })
            },
            meta: {
                title: '考试任务模板',
                noback: true
            }
        },
        // 添加修改考试任务模板
        {
            path: 'examtask/template/add',
            name: 'examtask-template-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/examTask/AddCoursetasktemplate.vue'))
                })
            },
            meta: {
                title: '添加考试任务模板',
            }
        },
        // 考试任务模板栏目
        {
            path: 'examtask/template/category',
            name: 'examtask-examtasktemplate-category',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/examTask/Coursetasktemplatecategory.vue'))
                })
            },
            meta: {
                title: '考试任务模板分类',
                noback: true
            }
        },

//公告栏目管理
        {
            path: 'announce/category',
            name: 'gov-announce-category-manage',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/announce/AnnounceCategory.vue'))
                })
            },
            meta: {
                title: '公告栏目管理',
                noback: true
            }
        },
        {//政府菜单管理首页
            path: 'menu',
            name: 'gov-menu-manage',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/menuManage/MenuManage.vue'))
                })
            },
            meta: {
                title: '政府后台菜单管理',
                noback: true
            }
        },
        {//政府菜单添加
            path: 'menu/add',
            name: 'gov-menu-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/menuManage/MenuForm.vue'))
                })
            },
            meta: {
                title: '菜单添加',
                noback: false
            }
        },
        {//政府菜单修改
            path: 'menu/edit/:sys_id',
            name: 'gov-menu-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/menuManage/MenuForm.vue'))
                })
            },
            meta: {
                title: '菜单更新',
                noback: false
            }
        }, 
        {//政府级别授权列表
            path: 'warrant',
            name: 'gov-warrant',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/menuManage/Warrant.vue'))
                })
            },
            meta: {
                title: '授权管理',
                noback: false
            }
        },
        {//政府级别授权菜单详情
            path: 'warrant/warrant_menus/:warrant_id',
            name: 'gov-warrant_menus',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/menuManage/WarrantMenus.vue'))
                })
            },
            meta: {
                title: '角色组授权菜单',
                noback: false
            }
        },
        {
            path: 'role/add',
            name: 'gov-role-add',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/menuManage/RoleForm.vue'))
                })
            },
            meta: {
                title: '角色组添加',
                noback: false
            }
        },
        {
            path: 'role/edit/:warrant_id',
            name: 'gov-role-edit',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../views/gov/menuManage/RoleForm.vue'))
                })
            },
            meta: {
                title: '角色组更新',
                noback: false
            }
        },
      
    ]
}
