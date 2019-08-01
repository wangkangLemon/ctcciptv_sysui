import * as api from './api'
import config from '../utils/config'
const urlPre = config.apiHost + '/user'

class ReviewService {
   // 医师资格获取
    getCert(id) {
        let url = `${urlPre}/certificate/get/${id}`         //传递的地址的id
        return api.get(url).then(ret => {
            return ret.data
        })
    }
    // 医师资格列表
    fetchCertList(params) {
        let url = urlPre + '/certificate/lists'
        return api.get(url, params).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }
    // 医师资格创建
    CertCreate(fetchParam) {
        let url = urlPre + '/certificate/create'
        return api.post(url, fetchParam).then(ret => {
            if (ret.code == 0) {
                xmview.showTip('success', ret.message)
                return ret.data
            } else {
                xmview.showTip('error', ret.message)
                return Promise.reject(ret)
            }
        })
    }
    // 医师资格更新
    CertEdit(fetchParam, id) {
        let url = `${urlPre}/certificate/edit/${id}`
        return api.post(url, fetchParam).then(ret => {
            if (ret.code == 0) {
                xmview.showTip('success', ret.message)
                return ret.data
            } else {
                xmview.showTip('error', ret.message)
                return Promise.reject(ret)
            }
        })
    }
    // 医师资格删除
    deleteCert(id) {
        let url = `${urlPre}/certificate/delete/${id}`
        return api.post(url, {}).then(ret => {
            if (ret.code == 0) {
                xmview.showTip('success', ret.message)
                return ret.data
            } else {
                xmview.showTip('error', ret.message)
                return Promise.reject(ret)
            }
        })
    }

    // 启用管理员
    agree({id, status}) {
        let url = `${urlPre}/certificate/edit/${id}`
        return api.post(url,  {status} )
    }

}

export default new ReviewService()
