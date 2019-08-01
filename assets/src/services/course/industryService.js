import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/industry'

class FinanceService {
    // // 商品获取
    getDrug(id) {
        let url = `${urlPre}/drug/get/${id}`         //传递的地址的id
        return api.get(url).then(ret => {
            return ret.data
        })
    }
    // 商品列表
    fetchDrugList(params) {
        let url = urlPre + '/drug/lists'
        return api.get(url, params).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }
    // // 商品创建
    createDrug(fetchParam) {
        let url = urlPre + '/drug/create'
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
    // 商品更新
    editDrug(fetchParam, id) {
        let url = `${urlPre}/drug/edit/${id}`
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
    // // 商品删除
    deleteDrug(id) {
        let url = `${urlPre}/drug/delete/${id}`
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

    // // 课程管理
    // // 课程获取
    getCourse(id) {
        let url = `${urlPre}/course/get/${id}`         //传递的地址的id
        return api.get(url).then(ret => {
            return ret.data
        })
    }
    // // 课程列表
    fetchCourseList(params) {
        let url = urlPre + '/course/lists'
        return api.get(url, params).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }
    // 课程创建
    addCourse(fetchParam) {
        let url = urlPre + '/course/create'
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
    // 课程更新
    editCourse(fetchParam, id) {
        let url = `${urlPre}/course/edit/${id}`
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
    // // 课程删除
    deleteCourse(id) {
        let url = `${urlPre}/course/delete/${id}`
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

    // 订单列表
    fetchOrderList(params) {
      let url = urlPre + '/consultation/lists'
      return api.get(url, params).then(ret => {
        if (ret.code == 0) {
          return ret
        } else {
          return Promise.reject(ret)
        }
      })
    }
    //订单获取
    getOrder(id) {
      let url = `${urlPre}/consultation/get/${id}` //传递的地址的id
      return api.get(url).then(ret => {
        return ret.data
      })
    }
    // 订单创建
    createOrder(fetchParam) {
      let url = urlPre + '/consultation/create'
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
    // 订单更新
    editOrder(fetchParam, id) {
      let url = `${urlPre}/consultation/edit/${id}`
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
    // 订单删除
    deleteOrder(id) {
      let url = `${urlPre}/consultation/delete/${id}`
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

    // 工业公司列表
    fetchCompanyList(params) {
      let url = urlPre + '/company/lists'
      return api.get(url, params).then(ret => {
        if (ret.code == 0) {
          return ret
        } else {
          return Promise.reject(ret)
        }
      })
    }
    //工业公司获取
    getCompany(id) {
      let url = `${urlPre}/company/get/${id}` //传递的地址的id
      return api.get(url).then(ret => {
        return ret.data
      })
    }
    // 工业公司创建
    createCompany(fetchParam) {
      let url = urlPre + '/company/create'
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
    // 工业公司更新
    editCompany(fetchParam, id) {
      let url = `${urlPre}/company/edit/${id}`
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
    // 工业公司删除
    deleteCompany(id) {
      let url = `${urlPre}/company/delete/${id}`
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

export default new FinanceService()
