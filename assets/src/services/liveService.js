import * as api from './api'
import config from '../utils/config'
const urlPre = config.apiHost + '/live'

class LiveService {
    // 搜索
    getLivelists(params) {
        let url = urlPre + '/lists'
        return api.get(url, params).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }

    // 获取
    getLive (id) {
        let finalUrl = `${urlPre}/get/${id}/`
        return api.get(finalUrl).then((ret) => {
            return ret.data
        })
    }
    // 直播创建
    createLive(fetchParam) {
        let url = urlPre + '/create'
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
    // 直播更新
    editLive(fetchParam, id) {
        let url = `${urlPre}/edit/${id}`
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
    // 删除
    deleteLive(id) {
        let url = `${urlPre}/delete/${id}`
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


    // 部门搜索
    getCommtlists(params) {
        let url = urlPre + '/comment/lists'
        return api.get(url, params).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }
    // 部门获取
    getCommt(id) {
        let finalUrl = `${urlPre}/comment/get/${id}/`
        return api.get(finalUrl).then((ret) => {
            return ret.data
        })
    }
    // 部门删除
    createCommt(fetchParam,id) {
        let url = `${urlPre}/comment/create/${id}`
        return api.post(url, fetchParam).then(ret => {
            if (ret.code == 0) {
                xmview.showTip('success', ret.message)
                return ret.data
            }
        })
    }
    // 直播更新
    editCommt({ content, id}) {
        let url = `${urlPre}/comment/edit/${id}`
        return api.post(url, { content}).then(ret => {
            if (ret.code == 0) {
                xmview.showTip('success', ret.message)
                return ret.data
            } else {
                xmview.showTip('error', ret.message)
                return Promise.reject(ret)
            }
        })
    }
    agreeCommt({ status, id }) {
        let url = `${urlPre}/comment/edit/${id}`
        return api.post(url, { status }).then(ret => {
            if (ret.code == 0) {
                xmview.showTip('success', ret.message)
                return ret.data
            } else {
                xmview.showTip('error', ret.message)
                return Promise.reject(ret)
            }
        })
    }
    // 删除
    deleteCommt(id) {
        let url = `${urlPre}/comment/delete/${id}`
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
   
}

export default new LiveService()
