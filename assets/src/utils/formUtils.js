
import * as typeUtils from './typeUtils'
class FormUtils {
    // 序列化数组 格式为  xxx[0]=123&hhh[id][name]=234 的形式
    serializeArray (data, keyName, arrayNeedKey = true) {
        let ret = serialize(data, keyName, arrayNeedKey)
        return ret.substr(0, ret.length - 1)
    }

    // 序列化对象  并且对象中有int类型的数组 没有多层嵌套
    serializeObjectWithArrayInt (data) {
        let ret = ''
        for (let key in data) {
            if (typeUtils.isArray(data[key])) {
                data[key].forEach((item) => {
                    ret += `int[]=${item}&`
                })
            } else {
                ret += `${key}=${data[key]}`
            }
        }
        return ret
    }
}
let serialize = function serialize (data, keyName = 'subjects', arrayNeedKey) {
    let ret = ''
    if (typeUtils.isArray(data)) {
        data.forEach((item, index) => {
            ret += produceData4serialize(arrayNeedKey ? index : '', item, keyName, arrayNeedKey)
        })
    } else if (typeUtils.isObject(data)) {
        for (let key in data) {
            ret += produceData4serialize(key, data[key], keyName, arrayNeedKey)
        }
    }

    return ret
}

function produceData4serialize (key, val, keyName, arrayNeedKey) {
    let ret = ''
    if (typeUtils.isArray(val) || typeUtils.isObject(val)) {
        ret += serialize(val, `${keyName}[${key}]`, arrayNeedKey)
    } else {
        val = val == null ? '' : val
        ret += `${keyName}[${key}]=${val}&`
    }

    return ret
}


/**
 * 判断参数为undefined 转化为 空
 * obj {name: undefined, code: xx}
 */
function transformParam(obj) {
    for (let i in obj) {
        obj[i] = obj[i] == undefined ? '' : obj[i]
    }
}

function delParam(obj,name) {
    for (let i in obj) {
        obj[name].splice(i, 1)
        console.log(obj);
        
    }
}


export default new FormUtils()
