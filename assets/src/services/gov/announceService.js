import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/gov/announce'

class sysService {

 // 获取课程任务模板分列表
    getCategoryTree({ id = 'tree', type, filter = true, pid =-1 , level=-1, pagesize=-1, disabled=-1}) {
        let finalUrl = urlPre + '/category/lists'
        return api.get(finalUrl, { id, name, pagesize,disabled}).then((ret) => {
            return ret
        })
    }
    create_cate ({parent_id, name, image, sort, remark, disabled}) {
        let finalUrl = urlPre + `/category/create`
        let reqParam = { name, image, sort, remark, disabled }
        // if (parent_id === 0) delete reqParam['parent_id']
        return api.post(finalUrl, reqParam)
    }

    // 修改分类
    update_cate ({ name, image, sort, remark, disabled, id}) {
        let finalUrl = urlPre + `/category/edit/${id}`
        return api.post(finalUrl, { name, image, sort, remark, disabled})
    }

    // 删除分类
    delCategory ({id}) {
        let finalUrl = urlPre + `/category/delete/${id}`
        return api.post(finalUrl).then((ret) => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }
    // 获取分类上传图片地址
    getCategoryImageUrl () {
        let finalUrl = urlPre + `/category/image`
        return finalUrl
    }

    // 移动分类
    moveCategory ({id, to}) {
        let finalUrl = urlPre + `/category/${id}/move`
        return api.post(finalUrl, {to})
    }

    // 移动分类内容
    moveCategoryContent ({id, to}) {
        let finalUrl = urlPre + `/category/${id}/move/content`
        return api.post(finalUrl, {to})
    }
    // 禁用管理员
    offline({id, pushabled}) {
        let url = `${urlPre}/edit/${id}`
        return api.post(url, { pushabled})
    }

    // 启用管理员
    online({id, pushabled}) {
        let url = `${urlPre}/edit/${id}`
        return api.post(url, { pushabled })
    }

    // 获取添加编辑课程上传图片的url
    getUploadUrl({image, alias}) {
        let url = `${urlPre}/upload`
        return api.post(url, {image, alias}).then((ret) => {
            return ret.data
        })
    }

}
export default new sysService()
