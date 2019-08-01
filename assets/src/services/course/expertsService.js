import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/experts'

class sysService {
    //拿到数据 
    fetchExpertsData ({id, name, hospital_id, page, pagesize}) {
        let url = urlPre + '/lists'
        return api.get(url,{id, name, hospital_id, page, pagesize }).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }
    fetchHospitalData({id, name, hospital_id, page, pagesize}) {
        let url = urlPre + '/hospital/lists'
        return api.get(url,{id, name, hospital_id, page, pagesize }).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }
    // 搜索专家
    getExpertsInfo(id) {
        let url = `${urlPre}/get/${id}`         //传递的地址的id
        return api.get(url,{},false).then(ret => {
            if (ret.code == 0) {
                return ret.data
            } else {
                return Promise.reject(ret)
            }
        })
    }
    // 搜索医院
    getHospitalInfo(id) {
        let url = `${urlPre}/hospital/get/${id}`         //传递的地址的id
        return api.get(url,{},false).then(ret => {
            if (ret.code == 0) {
                return ret.data
            } else {
                return Promise.reject(ret)
            }
        })
    }

    // 创建专家
    createExperts({ name, image, professor, hospital_id, department, introduce, sex, goodat, honor }) {
        let url = urlPre + '/create'
        return api.post(url, { name, image, professor, hospital_id, department, introduce, sex, goodat, honor}).then(ret => {
            if (ret.code == 0) {
                return ret.data
            } else {
                xmview.showTip('error',ret.message)
                return Promise.reject(ret)
            }
        })
    }
    // 创建医院
    createHospital({ name }) {
        let url = urlPre + '/hospital/create'
        return api.post(url, { name }).then(ret => {
            if (ret.code == 0) {
                return ret.data
            } else {
                xmview.showTip('error',ret.message)
                return Promise.reject(ret)
            }
        })
    }
    // 更新专家
    updateExperts({ id, name, image, professor, hospital_id, department, introduce, sex, goodat, honor }) {
        let url = `${urlPre}/edit/${id}`
        return api.post(url, { name, image, professor, hospital_id, department, introduce, sex, goodat, honor }).then(ret => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }
    // 更新医院
    updateHospital({ id, name }) {
        let url = `${urlPre}/hospital/edit/${id}`
        return api.post(url, { name }).then(ret => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }


    // 删除专家
    deleteExperts(id) {
        let url = `${urlPre}/delete/${id}`
        // console.log(url)
        return api.post(url, {}).then(ret => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }
    // 删除医院
    deleteHospital(id) {
        let url = `${urlPre}/hospital/delete/${id}`
        // console.log(url)
        return api.post(url, {}).then(ret => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }

   
    // 批量删除管理员
    deleteMulty(ids) {
        let url = `${urlPre}/batchdel`
        return api.put(url, { ids })
    }

    // 批量移动管理员到指定分类
    moveToCategoryMulty({ ids, category_id }) {
        let url = `${urlPre}/batchmove`
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
    offline({id, disabled}) {
        let url = `${urlPre}/edit/${id}`
        return api.post(url, { disabled})
    }

    // 启用管理员
    online({id, disabled}) {
        let url = `${urlPre}/edit/${id}`
        return api.post(url, { disabled })
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
