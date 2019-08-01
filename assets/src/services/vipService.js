import * as api from './api'
import config from '../utils/config'
const urlPre = config.apiHost + '/user'

class VipService {
    // 搜索
    getViplists(params) {
        let url = urlPre + '/vip/lists'
        return api.get(url, params).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }

    // 获取
    getVip (id) {
        let finalUrl = `${urlPre}/vip/${id}/`
        return api.get(finalUrl).then((ret) => {
            return ret.data
        })
    }
    // 删除
    deleteVip(id) {
        let url = `${urlPre}/vip/delete/${id}`
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
    getGovViplists(params) {
        let url = urlPre + '/gov/vip/lists'
        return api.get(url, params).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }

    // 部门获取
    getGovVip(id) {
        let finalUrl = `${urlPre}/vip/${id}/`
        return api.get(finalUrl).then((ret) => {
            return ret.data
        })
    }
    // 部门删除
    deleteGovVip(id) {
        let url = `${urlPre}/vip/delete/${id}`
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
    // 部门vip充值
    payGovVip(govid) {
        let url = `${urlPre}/gov/vip/payment/${govid}`
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
    // 部门编辑
    editGovVip({ id, vip_cnt}) {
        let url = `${urlPre}/gov/vip/edit/${id}`
        return api.post(url, { vip_cnt}).then(ret => {
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

export default new VipService()
