import * as api from '../api'
import config from '../../utils/config'
const urlPre = config.apiHost + '/exam'

class examService {
    //16.1--栏目


    //16.6--章节
    //拿到应试列表
    fetchChapterCategory(fetchParam) {
        let url = urlPre + '/chapter/lists'
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
        let url = `${urlPre}/chapter/get/${id}`         //传递的地址的id
        return api.get(url, {}, false).then(ret => {
            if (ret.code == 0) {
                return ret.data
            } else {
                return Promise.reject(ret)
            }
        })
    }

    // 创建章节chapter栏目
    ChapterCategoryCreate(fetchParam) {
        let url = urlPre + '/chapter/create'
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
    ChapterCategoryEdit(fetchParam,id) {
        let url = `${urlPre}/chapter/edit/${id}`
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
    ChapterCategorydelete(id) {
        let url = `${urlPre}/chapter/delete/${id}`
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
    // // 公共添加编辑课程上传图片  ---传base64
    commonUploadImageBase(image, biz = 'section', extpath = 'category') {
        let url = `${config.apiHost}/common/upload/file`
        return api.post(url, image, biz, extpath).then((ret) => {
            xmview.showTip('success', ret.message)
            return ret.data
        })
    }
    //课程列表
    fetchCourseLists(params) {
        let url = urlPre + '/course/lists'
        return api.get(url, params).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }
    //
    // 添加课程
    addCourse(fetchParam) {
        let finalUrl = urlPre + '/course/create'
        return api.post(finalUrl, fetchParam).then((ret) => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }
    // 更新课程信息
    updateCourse(fetchParam, id) {
        let finalUrl = `${urlPre}/course/edit/${id}`
        return api.post(finalUrl, fetchParam).then((ret) => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }
    getExamCourse(id) {
        let url = `${urlPre}/course/get/${id}`         //传递的地址的id
        return api.get(url, {}, false).then(ret => {
            if (ret.code == 0) {
                return ret.data
            } else {
                return Promise.reject(ret)
            }
        })
    }
    // 上下线课程
    offlineCourse({ govid, id, status }) {
        // govid = govid || authUtils.getUserInfo().company_id
        let finalUrl = `${urlPre}/course/edit/${id}`
        return api.post(finalUrl, { status })
    }

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
    // // 添加课程
    // addSubject(fetchParam) {
    //     let finalUrl = urlPre + '/subject/create'
    //     return api.post(finalUrl, fetchParam).then((ret) => {
    //         if (ret.code) {
    //             return Promise.reject(ret)
    //         }
    //     })
    // }
    // 添加或修改题目
    addSubjectA1({ category_id, chapter_id, subjects }) {
        let finalUrl = `${urlPre}/subject/create/${category_id}/${chapter_id}`
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
    addSubject({ category_id, chapter_id, subjects, style, noJson }) {
        let finalUrl = `${urlPre}/subject/create/${style}/${category_id}/${chapter_id}`
        return api.post(finalUrl, subjects, noJson ).then((ret) => {
            if (ret.code == 0) {
                xmview.showTip('success', ret.message)
                return ret.data
            } else {
                xmview.showTip('error', ret.message)
                return Promise.reject(ret)
            }
        })
    }
    // 更新课程信息
    upSubject(fetchParam, id) {
        let finalUrl = `${urlPre}/subject/edit/${id}`
        return api.post(finalUrl, fetchParam).then((ret) => {
            if (ret.code) {
                return Promise.reject(ret)
            }
        })
    }
    
    fetchExamCategory(fetchParam) {
        let url = urlPre + '/chapter/lists'
        return api.get(url, fetchParam
        ).then(ret => {
            if (ret.code == 0) {
                return ret.data
            } else {
                return Promise.reject(ret)
            }
        })
    }
    getExamSubject(id) {
        let url = `${urlPre}/subject/get/${id}`         //传递的地址的id
        return api.get(url, {}, false).then(ret => {
            if (ret.code == 0) {
                return ret.data
            } else {
                return Promise.reject(ret)
            }
        })
    }
    delSubject(id) {
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
    //拿到应试种类总列表
    fetchExamCategory(fetchParam) {
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

    getExamCategory(id) {
        let url = `${urlPre}/category/get/${id}`         //传递的地址的id
        return api.get(url, {}, false).then(ret => {
            if (ret.code == 0) {
                return ret.data
            } else {
                return Promise.reject(ret)
            }
        })
    }

    // 创建应试category栏目
    ExamCategoryCreate(fetchParam) {
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
    // 更新应试category栏目
    ExamCategoryEdit(fetchParam, id) {
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

    // 删除应试category栏目
    ExamCategorydelete(id) {
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
    //上传文件解析接口
    upload(fetchParam) {
        let url = `${urlPre}/subject/parse`      
        return api.post(url, fetchParam).then(ret => {
            if (ret.code == 0) {
                return ret.data
            } else {
                return Promise.reject(ret)
            }
        })
    }
    //上传文件保存接口
    subjectSave(param) {
        let url = `${urlPre}/subject/save`
        return api.post(url, param).then(ret => {
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
