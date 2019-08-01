import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/lib'

class examService {
    //19--题库管理
    //19.1--栏目查询
    fetchLibCategory(fetchParam) {
        let url = urlPre + '/category/lists'
        return api.get(url, fetchParam
        ).then(ret => {
            if (ret.code == 0) {
                return ret.data
            } else {
                return Promise.reject(ret)
            }
        })
    }
    fetchCategoryVal(fetchParam) {
        let url = `${config.apiHost}` + '/setting/lists'
        return api.get(url, fetchParam
        ).then(ret => {
            if (ret.code == 0) {
                return ret.data
            } else {
                return Promise.reject(ret)
            }
        })
    }


    // 搜索章节chapter栏目
    getCategory(id) {
        let url = `${urlPre}/category/get/${id}`         //传递的地址的id
        return api.get(url, {}, false).then(ret => {
            if (ret.code == 0) {
                return ret.data
            } else {
                return Promise.reject(ret)
            }
        })
    }

    // 创建章节chapter栏目
    LibCategoryCreate(fetchParam) {
        let url = urlPre + '/category/create'
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
    // 更新章节chapter栏目
    LibCategoryEdit(fetchParam,id) {
        let url = `${urlPre}/category/edit/${id}`
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

    // 删除章节chapter栏目
    LibCategorydelete(id) {
        let url = `${urlPre}/category/delete/${id}`
        // console.log(url)
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

    // 添加或修改题目
    addOrEditLib({ category_id, subjects }) {
        let finalUrl = `${config.apiHost}/lib/subject/updates/${category_id}`
        return api.post(finalUrl, subjects).then((ret) => {
            if (ret.code == 0) {
                xmview.showTip('success', ret.message)
                return ret.data
            } else {
                xmview.showTip('error', ret.message)
                return Promise.reject(ret)
            }
        })
    }
    //课程列表
    fetchSubjectLists(params) {
        let url = urlPre + '/subject/listoptions'
        return api.get(url, params).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }
    // // 公共添加编辑课程上传图片  ---传base64
    commonUploadImageBase(image, biz = 'section', extpath = 'category') {
        let url = `${config.apiHost}/common/upload/file`
        return api.post(url, image, biz, extpath).then((ret) => {
            xmview.showTip('success', ret.message)
            return ret.data
        })
    }

    // 删除题库栏目
    libCategorydelete(id) {
        let url = `${urlPre}/category/delete/${id}`
        // console.log(url)
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
    //课程列表
    fetchSubjectLists(params) {
        let url = urlPre + '/subject/lists'
        return api.get(url, params).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }
    // 获取课程题目
    getLibSubject(id) {
        // govid = govid || authUtils.getUserInfo().company_id
        let finalUrl = `${config.apiHost}/lib/subject/get/${id}`
        return api.get(finalUrl).then((ret) => {
            // console.log(ret)
            return ret.data
        })
    }
    // 删除试题
    delLib(id) {
        let url = `${urlPre}/subject/delete/${id}`
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
export default new examService()
