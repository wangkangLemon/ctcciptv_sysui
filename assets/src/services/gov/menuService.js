import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/gov'

class sysService {
    //拿到数据 
    fetchData (page, pagesize, level, pid ,menu_name) {
        let url = urlPre + '/menu/lists'
        return api.get(url,page, pagesize, level, pid, menu_name).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }
    
    // 搜索
    getAdminInfo(id) {
        let url = `${urlPre}/menu/view/${id}`         //传递的地址的id
        return api.get(url,{},false).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }

    // 创建
    create({ menu_name, menu_node, remark, sort, pid , level }) {
        let url = urlPre + '/menu/create'
        return api.post(url, { menu_name, menu_node, remark, sort, pid , level }).then(ret => {
            if (ret.code == 0) {
                xmview.showTip('success',ret.message)  
            } else {
                xmview.showTip('error',ret.message)
                return Promise.reject(ret)
            }
        })
    }

    // 更新
    update({ id, menu_name, menu_node, remark, sort, pid, level, disabled}) {
        let url = `${urlPre}/menu/update/${id}`
        return api.post(url, { menu_name, menu_node, remark, sort, pid, level,disabled }).then(ret => {
            if (ret.code == 0) {
                return ret.data
            } else {
                xmview.showTip('error',ret.message)
                return Promise.reject(ret)
            }
        })
    }

    // 删除
    delete(id) {
        let url = `${urlPre}/menu/delete/${id}`
        // console.log(url)
        return api.post(url, {}).then(ret => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }
    

    // 批量删除管理员
    deleteMulty(ids) {
        let url = `${urlPre}/menu/batchdel`
        return api.put(url, { ids })
    }

    // 批量移动管理员到指定分类
    moveToCategoryMulty({ ids, category_id }) {
        let url = `${urlPre}/menu/batchmove`
        return api.put(url, { ids, category_id })
    }

    // 设置管理员
    setLesson({ id, data }) {
        let url = `${urlPre}/${id}/setlesson`
        return api.put(url, data).then(ret => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }
    
    // 禁用管理员
    offline(id, menu_name, menu_node, remark, sort, pid, level, disabled) {
        let url = `${urlPre}/menu/update/${id}`
        console.log('进入offline(id)')
        return api.post(url, { menu_name, menu_node, remark, sort, pid, level, disabled})
    }

    // 启用管理员
    online(id, menu_name, menu_node, remark, sort, pid, level, disabled) {
        let url = `${urlPre}/menu/update/${id}`
        console.log('进入offline(id)')
        return api.post(url, { menu_name, menu_node, remark, sort, pid, level, disabled})
    }

    // 获取添加编辑课程上传图片的url
    getUploadUrl({image, alias}) {
        let url = `${urlPre}/menu/upload`
        return api.post(url, {image, alias}).then((ret) => {
            return ret.data
        })
    }

}
export default new sysService()
