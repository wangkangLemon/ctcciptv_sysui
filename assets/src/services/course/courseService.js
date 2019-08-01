import * as api from '../api'
import authUtils from '../../utils/authUtils'
import config from '../../utils/config'
const urlPre = config.apiHost + '/course'

class CourseService {
    //========================种类数据请求===================================
    getCategoryTree({ id = 'tree', type, filter = true, pid = -1, level = -1, pagesize = -1, category_type}) {
        let finalUrl = urlPre + '/category/lists'
        return api.get(finalUrl, { id, filter, type, pid, level, pagesize, category_type}).then((ret) => {
            return ret
        })
    }

    // 搜索
    search_cate({ id, name, category_type, pid, level, ended, disabled, page, pagesize}) {
        let url = urlPre + '/category/lists'
        return api.get(url, { id, name, category_type, pid, level, ended, disabled, page, pagesize }, false).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }
    // 创建
    create_cate({ name, sort, sort_type, category_type, pid, ended, image, category_subject_num, course_sort}) {
        let reqParam = { name, sort, sort_type, category_type, pid, ended, image, category_subject_num, course_sort}
        if (pid === 0) delete reqParam['pid']
        let url = urlPre + '/category/create'
        return api.post(url, reqParam).then(ret => {
            if (ret.code == 0) {
                 xmview.showTip('success',ret.message)
                return ret.data
            } else {
                xmview.showTip('error',ret.message)
                return Promise.reject(ret)
            }
        })
    }

     // 更新
    update_cate({ id, name, image, category_type, sort, sort_type, ended, disabled, pid, category_subject_num, course_sort}) {
        let url = `${urlPre}/category/edit/${id}`
        return api.post(url, { name, image, category_type, sort, sort_type, ended, disabled, pid, category_subject_num, course_sort}).then(ret => {
            if (ret.code==0) {
            	return ret
            }else{
            	return Promise.reject(ret)
            }
        })
    }

        // 修改栏目
    updateCategory({ govid, type, name, image, sort, id }) {
        govid = govid || authUtils.getUserInfo().company_id
        let finalUrl = `${config.apiHost}/com/${govid}/course/category/${id}`
        return api.post(finalUrl, { type, name, image, sort })
    }

        // 移动栏目
    moveCategory({ id, to }) {
        let finalUrl = `${config.apiHost}/course/category/${id}/move`
        return api.post(finalUrl, { to })
    }
        // 移动栏目下内容
    moveCategoryContent({ id, to }) {
        let finalUrl = `${config.apiHost}/course/category/${id}/move/content`
        return api.post(finalUrl, { to })
    }


    getUploadCategoryImgUrl() { 
        return `${config.apiHost}/common/upload/file`
    }
    // 删除
    delete_cate(id) {
        let url = `${urlPre}/category/delete/${id}`
        // console.log(url)
        return api.post(url, {}).then(ret => {
            if (ret.code == 0) {
                xmview.showTip('success',ret.message)
                return ret.data
            } else {
                xmview.showTip('error',ret.message)
                return Promise.reject(ret)
            }
        })
    }


    //=======================课程数据请求===============================
    // 获取课程下拉列表
    courseList(keyword, page, pageSize) {
        let url = `${urlPre}/search/name`
        return api.get(url, { keyword, page, pagesize: pageSize }).then(ret => {
            return ret.data
        })
    }

    // 获取公开课列表 
    getPublicCourselist({ course_name = '', status, category_id, need_testing, create_start, create_end, page, pagesize, category_type, material_type,type}) {
        let url = urlPre + '/lists'
        return api.get(url, { course_name, status, category_id, need_testing, create_start, create_end, page, pagesize, category_type, material_type,type}, false).then(ret => {
            if (ret.code == 0) {
                return ret
            } else {
                return Promise.reject(ret)
            }
        })
    }

    // 创建
    addCourse({ category_id, experts_id, course_name, image, description, tags, type, material_type, material_id, need_testing, status, sort, share, noaccess, region,source_url,file_name,limit_time,limit_repeat}) {
        let url = urlPre + '/create'
        return api.post(url, { category_id, experts_id, course_name, image, description, tags, type, material_type, material_id, need_testing, sort, share, noaccess, region ,source_url,file_name,limit_time,limit_repeat}).then(ret => {
            if (ret.code == 0) {
                // console.log(ret)
                return ret.data
            } else {
                return Promise.reject(ret)
            }
        })
    }

    // 修改课程获取课程信息接口
    getCourseInfo( course_id ) {
        let finalUrl = `${config.apiHost}/course/get/${course_id}`
        return api.get(finalUrl).then((ret) => {
            return ret.data
        })
    }
    // 修改课程
    editCourse({ govid, contentid, category_id, experts_id, course_name, image, tags, type, material_type, material_id, description, need_testing, status, limit_time, limit_repeat, score_pass, sort, share, noaccess, region,source_url,file_name}) {
        govid = govid || authUtils.getUserInfo().company_id
        let finalUrl = `${config.apiHost}/course/edit/${contentid}`
        return api.post(finalUrl, { category_id, experts_id, course_name, image, tags, type, material_type, material_id, description, need_testing, limit_time, status, limit_repeat, score_pass, sort, share, noaccess, region,source_url,file_name}).then((ret) => {
            return ret.data
        })
    }


    

    
    // 上下线课程
    offlineCourse({ id, status }) {
        let finalUrl = `${config.apiHost}/course/edit/${id}`
        // console.log(finalUrl)
        return api.post(finalUrl, { status })
    }

    commonUploadImage() { 
        return `${config.apiHost}/common/upload/file`
    }

    // // 公共添加编辑课程上传图片  ---直传
    commonUploadImageBase(image, biz = 'section', extpath = 'category') {
        let url = `${config.apiHost}/common/upload/file`
        return api.post(url, image, biz, extpath).then((ret) => {
            xmview.showTip('success', ret.message)
            return ret.data
        })
    }

    // 公共添加编辑课程上传图片  ---传base64
    commonUploadImageBase({image, alias = Date.now() + '.jpg', biz='course', extpath}) {
        
        let url = `${config.apiHost}/common/upload/base64`
        return api.post(url, {image, alias, biz, extpath}).then((ret) => {
            xmview.showTip('success',ret.message)
            return ret.data
        })
    }
    
    commonUploadImageBaseSection({image, alias = Date.now() + '.jpg', biz='section', extpath}) {
        
        let url = `${config.apiHost}/common/upload/base64`
        return api.post(url, {image, alias, biz, extpath}).then((ret) => {
            xmview.showTip('success',ret.message)
            return ret.data
        })
    }
    // 添加编辑课程上传图片  ---传base64
    uploadCover4addCourse({ image, alias = Date.now() + '.jpg' }) {
        let url = `${config.apiHost}/course/subject/image`
        return api.post(url, { image, alias }).then((ret) => {
            return ret.data
        })
    }

    // 删除课程
    deleteCourse({ govid, course_id }) {
        govid = govid || authUtils.getUserInfo().company_id
        let finalUrl = `${config.apiHost}/course/delete/${course_id}`
        return api.post(finalUrl, {})
    }

    // 批量删除课程
    deleteCourseMulty({ govid, id }) {
        govid = govid || authUtils.getUserInfo().company_id
        let finalUrl = `${config.apiHost}/com/${govid}/course/batchdel`
        return api.post(finalUrl, { id })
    }

    // 批量删除视频
    deleteVideoMulty({ id }) {
        let finalUrl = `${urlPre}/video/batchdel`
        return api.post(finalUrl, { id })
    }

    // 批量移动课程到指定分类
    moveCourseToCategoryMulty({ govid, id, catid }) {
        govid = govid || authUtils.getUserInfo().company_id
        let finalUrl = `${config.apiHost}/com/${govid}/course/batchmove`
        return api.post(finalUrl, { id, catid })
    }

    // 获取文档上传url
    getCourseDocUploadUrl({ govid } = {}) {
        govid = govid || authUtils.getUserInfo().company_id
        return `${config.apiHost}/common/upload/file`
    }

   

    // 获取课程题目
    getTestingInfo({ course_id }) {
        // govid = govid || authUtils.getUserInfo().company_id
        let finalUrl = `${config.apiHost}/course/subject/listoptions`
        return api.get(finalUrl,{ course_id }).then((ret) => {
            // console.log(ret)
            return ret.data
        })
    }
    
    // 添加或修改题目
    addOrEditTesting({ govid, course_id, subjects }) {
        govid = govid || authUtils.getUserInfo().company_id
        let finalUrl = `${config.apiHost}/course/subject/updates/${course_id}`
        return api.post(finalUrl, subjects).then((ret) => {
             if (ret.code == 0) {
                 xmview.showTip('success',ret.message)
                return ret.data
            } else {
                xmview.showTip('error',ret.message)
                return Promise.reject(ret)
            }
        })
    }
    // 删除试题
    delCourse({ course_id,id }) {
        // govid = govid || authUtils.getUserInfo().company_id
        let finalUrl = `${config.apiHost}/course/subject/delete/${course_id}/${id}`
        return api.post(finalUrl,{ }).then((ret) => {
            // console.log(ret)
            return ret.data
        })
    }


    // ============================================= 专辑 开始 ======================================================
    
    // 获取专辑
    getAlbumList({ govid, page, pagesize, keyword, create_start, create_end }) {
        govid = govid || authUtils.getUserInfo().company_id
        let finalUrl = `${config.apiHost}/com/${govid}/course/album/search`
        return api.get(finalUrl, { page, pagesize, keyword, create_start, create_end }).then((ret) => {
            return ret.data
        })
    }

    // 删除专辑
    deleteAlbum({ govid, id }) {
        govid = govid || authUtils.getUserInfo().company_id
        let finalUrl = `${config.apiHost}/com/${govid}/course/album/${id}`
        return api.post(finalUrl, {})
    }

    // 批量删除专辑 ids: id数组
    deleteAlbumMulty({ govid, ids }) {
        govid = govid || authUtils.getUserInfo().company_id
        let finalUrl = `${config.apiHost}/com/${govid}/course/album/batchdel`
        return api.post(finalUrl, { id: ids.join(',') })
    }

    // 新增专辑
    addAlbum({ govid, course_id, name }) {
        govid = govid || authUtils.getUserInfo().company_id
        let finalUrl = `${config.apiHost}/com/${govid}/course/album/add`
        return api.post(finalUrl, { course_id: course_id.join(','), name })
    }

    // 编辑专辑
    editAlbum({ govid, course_id, name }) {
        govid = govid || authUtils.getUserInfo().company_id
        let finalUrl = `${config.apiHost}/com/${govid}/course/album/edit`
        return api.post(finalUrl, { course_id: course_id.join(','), name })
    }

    // 获取课程信息以及选项列表
    getCourseSubject({ contentid }) {
        let finalUrl = `${urlPre}/${contentid}/subject/stat`
        return api.get(finalUrl).then((ret) => {
            return ret.data
        })
    }

    // 获取课程题目答案分析
    getSubjectAnswer({ c_id, s_id }) {
        let finalUrl = `${urlPre}/${c_id}/subject/${s_id}/stat`
        return api.get(finalUrl).then((ret) => {
            return ret.data.stat
        })
    }

    //中草药录入接口
    // 创建
    addHerbal({ category_id, data, noJson }) {
        let url = `${config.apiHost}/course/herbal/create/${category_id}`
        return api.post(url,  data, noJson ).then(ret => {
            if (ret.code == 0) {
                // console.log(ret)
                xmview.showTip('success', ret.message)
                return ret.data
            } else {
                xmview.showTip('error', ret.message)
                return Promise.reject(ret)
            }
        })
    }
    //获取课程
    getHerbal({ contentid }) {
        let finalUrl = `${config.apiHost}/course/herbal/get/${contentid}`
        return api.get(finalUrl).then((ret) => {
            console.log(ret)
            return ret.data
        })
    }
    // 修改课程
    editHerbal({ category_id, id, data, noJson }) {
        let url = `${config.apiHost}/course/herbal/edit/${category_id}/${id}`
        return api.post(url, data, noJson ).then((ret) => {
            if (ret.code == 0) {
                // console.log(ret)
                xmview.showTip('success', ret.message)
                return ret.data
            } else {
                xmview.showTip('error', ret.message)
                return Promise.reject(ret)
            }
        })
    }

    //图文系列课程创建入口
    // 资讯获取
    getImgTxt({ contentid }) {
        let finalUrl = `${config.apiHost}/course/article/get/${contentid}`
        return api.get(finalUrl).then((ret) => {
            console.log(ret)
            return ret.data
        })
    }

    // 资讯创建
    createImgTxt({ category_id, data, noJson }) {
        let url = `${config.apiHost}/course/article/create/${category_id}`
        return api.post(url, data, noJson).then(ret => {
            if (ret.code == 0) {
                // console.log(ret)
                xmview.showTip('success', ret.message)
                return ret.data
            } else {
                xmview.showTip('error', ret.message)
                return Promise.reject(ret)
            }
        })
    }
    // 资讯更新
    editImgTxt({ category_id, id, data, noJson }) {
        let url = `${config.apiHost}/course/article/edit/${category_id}/${id}`
        return api.post(url, data, noJson).then((ret) => {
            if (ret.code == 0) {
                // console.log(ret)
                xmview.showTip('success', ret.message)
                return ret.data
            } else {
                xmview.showTip('error', ret.message)
                return Promise.reject(ret)
            }
        })
    }

}
export default new CourseService()
