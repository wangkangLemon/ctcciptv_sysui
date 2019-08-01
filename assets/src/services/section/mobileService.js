import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/appmenu'

class MobileService {
    uploadboot ({company_id, image}) {
        let finalUrl = `${config.apiHost}/com/${company_id}/mobile/boot/upload`
        return api.post(finalUrl, {company_id, image, alias: +new Date() + '.png'}, false)
    }
    // 获取启动图
    getBoot ({company_id}) {
        let finalUrl = `${urlPre}/boot`
        return api.get(finalUrl).then((ret) => {
            return ret.data
        })
    }
    // 更新启动图
    updateBoot ({company_id, image, url, status}) {
        let finalUrl = `${urlPre}/boot`
        return api.post(finalUrl, {image, url, status})
    }
    // 查询接口  13.8 菜单列表接口 接口地址：/appmenu/lists
    menuSearch ({page, pagesize}) {
        let finalUrl = `${urlPre}/menu/scheme/list`
        return api.get(finalUrl, {page, pagesize}).then((ret) => {
            return ret.data
        })
    }
    // 应用导航方案
    applyMenu (id) {
        let finalUrl = `${urlPre}/menu/scheme/${id}/enable`
        return api.post(finalUrl)
    }
    // 克隆导航
    menuClone (id) {
        let finalUrl = `${urlPre}/menu/scheme/${id}/copy`
        return api.post(finalUrl)
    }
    // 删除导航方案
    menuDelete (id) {
        let finalUrl = `${urlPre}/menu/scheme/${id}`
        return api.get(finalUrl)
    }
    // 上传导航图标
    uploadNavIcon ({image, alias}) {
        let finalUrl = `${urlPre}/menu/scheme/cover`
        return api.post(finalUrl, {image, alias}).then((ret) => {
            return ret.data
        })
    }
    // 更新方案
    updateMenu ({info, group_id}) {
        let finalUrl = `${urlPre}/menu/scheme/${group_id}`
        return api.post(finalUrl, info)
    }
    // -------------------导航管理部分-------------
    // 获取方案组列表
    searchScheme ({type, platform, version, page, pagesize}) {
        let finalUrl = `${urlPre}/group/lists`
        return api.get(finalUrl, {type, platform, version, page, pagesize}).then((ret) => {
            return ret
        })
    }
    // 获取方案组筛选版本
    searchVersions ({type, platform}) {
        let finalUrl = `${urlPre}/menuscheme/versions`
        return api.get(finalUrl, {type, platform}).then((ret) => {
            return ret.data
        })
    }
    // 创建方案组
    createScheme ({ version, adapter, used}) {
        let finalUrl = `${urlPre}/group/create`
        return api.post(finalUrl, {version, adapter, used}).then((ret) => {
            return ret
        })
    }
    // 编辑方案组
    editScheme ({id,version, adapter, used}) {
        let finalUrl = `${urlPre}/group/edit/${id}`
        return api.post(finalUrl, {version, adapter, used}).then((ret) => {
            return ret
        })
    }
    // 克隆方案组
    cloneScheme ({group_id}) {
        let finalUrl = `${urlPre}/group/clone/${group_id}`
        return api.post(finalUrl, {group_id}).then((ret) => {
            return ret.data
        })
    }
    
    // 删除导航方案
    deleteScheme ({group_id}) {
        let finalUrl = `${urlPre}/group/delete/${group_id}`
        return api.post(finalUrl)
    }
    // 启用方案
    // activeScheme ({group_id, ios, android}) {
    //     let finalUrl = `${urlPre}/menuscheme/${group_id}/active`
    //     return api.post(finalUrl, {ios, android})
    // }
    activeScheme ({group_id,used}) {
        let finalUrl = `${urlPre}/group/edit/${group_id}`
        return api.post(finalUrl, {used}).then((ret) => {
            return ret.data
        })
    }
    // 获取平台版本列表
    getPlatVersions ({group_id}) {
        let finalUrl = `${urlPre}/menuscheme/${group_id}/validate`
        return api.get(finalUrl).then((ret) => {
            return ret.data
        })
    }
    // 删除功能
    deleteModule ({group_id, module_id}) {
        let finalUrl = `${urlPre}/delete/${module_id}`
        return api.post(finalUrl)
    }
    // 获取功能版本
    getModuleVersions () {
        let finalUrl = `${urlPre}/appmodule/version`
        return api.get(finalUrl).then((ret) => {
            return ret.data
        })
    }
    // 获取功能列表
    getModules ({version}) {
        let finalUrl = `${urlPre}/list`
        return api.get(finalUrl, {version}).then((ret) => {
            return ret.data
        })
    }
    // 添加功能
    // addModule ({group_id, type, type_id, url, name, icon, notify, notify_node, notify_icon, notify_text, sort, group = 0}) {
    //     let finalUrl = `${urlPre}/menuscheme/${group_id}/module`
    //     return api.post(finalUrl, {type, type_id, url, name, icon, notify, notify_node, notify_icon, notify_text, sort, group}).then((ret) => {
    //         return ret.data
    //     })
    // }
    addModule ({category_id, group_id, name, model, path, icon, title, download, sort}) {
        let finalUrl = `${urlPre}/create`
        return api.post(finalUrl, {category_id, group_id, name, model, path, icon, title, download, sort}).then((ret) => {
            return ret.data
        })
    }
    // 更新功能
    updateModule ({category_id, group_id, name, model, path, icon, title, download, sort, module_id}) {
        let finalUrl = `${urlPre}/edit/${module_id}`
        return api.post(finalUrl, {category_id, group_id, name, model, path, icon, title, download, sort})
    }
    // 上传功能图标
    // uploadModuleScheme ({image, alias, group_id}) {
    //     let finalUrl = `${urlPre}/menuscheme/${group_id}/module/icon`
    //     return api.post(finalUrl, {image, alias}).then((ret) => {
    //         return ret.data
    //     })
    // }

    uploadModuleScheme ({image, alias, group_id, biz='section'}) {
        let finalUrl =  `${config.apiHost}/common/upload/base64`
        return api.post(finalUrl, {image, alias, biz}).then((ret) => {
            xmview.showTip('success','上传成功')
            return ret.data
        })
    }
    //      // 专家上传头像
    // uploadExpertsAvatar({ image, alias = Date.now() + '.jpg', biz='expert' }) {
    //     let url = `${config.apiHost}/common/upload/base64`
    //     return api.post(url, { image, alias, biz }).then((ret) => {
    //         xmview.showTip('success',ret.message)
    //             return ret.data
    //     })
    // }
    // 功能排序
    sortModule ({group_id, modules}) {
        let finalUrl = `${urlPre}/menuscheme/${group_id}/module/sort`
        return api.post(finalUrl, {modules})
    }
}

export default new MobileService()
