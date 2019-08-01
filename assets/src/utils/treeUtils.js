/**
 * Created by huanghuixin on 2017/3/29.
 */
// 操作tree的帮助方法

class TreeUtils {
    /**
     * 将arr变为tree的结构
     * @param arr 原始数组
     * @param pidKey 父id的key
     * @param idKey id的key
     *
     * return 结果  [{ item, children:[ {item,children}, {}] }] 没有children 说明是叶子节点
     */
    arr2Tree (arr, pid = 0, pidKey = 'parent_id', idKey = 'id', processItemFn) {

        if (arr == null || arr.length < 1) return null
        let ret = []
     
        arr.forEach((item) => {
            // console.log('+++++++++++++++++++')
            // console.log('pid='+pid)
            // console.log('pidKey='+pidKey)
            // console.log(item[pidKey])
            // console.log(item)
            if (item[pidKey] !== pid)
                return

            let currItem = processItemFn ? processItemFn(item) : {item}
            let nextArr = arr.filter(subitem => {
                return subitem != item
            })
            // id为0 一般表示未分类
            let children = item.id == 0 ? null : this.arr2Tree(nextArr, item[idKey], pidKey, idKey, processItemFn)
            if ((children && children.length > 0)) currItem.children = children
            ret.push(currItem)
        })

        return ret
    }

    // 数组转为elementui的cascader和tree数据结构
    arr2Cascader (arr, pid = 0, pidKey = 'parent_id', idKey = 'id', labelKey = 'name', valKey = 'id', hasChildrenKey = 'has_children') {
        
        return this.arr2Tree(arr, pid, pidKey, idKey, (item) => {
            
            return {
                label: item[labelKey],
                value: item[valKey] + '',
                item,
                children: item[hasChildrenKey] ? [{label: '加载中...'}] : null
            }
        })



        
    }
          
    /**
     * 查找某一项
     * @param arr 数据
     * @param levelPath 路径 形如 ['1', '2']
     * @param compareKey
     */
    findItem (arr, levelPath, compareKey = 'id') {
        // console.log('===========================')
        // console.log(compareKey)
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i]
            
            if (item[compareKey] == levelPath[0]) {     
                if (levelPath.length == 1) {
                    return item
                }
                return this.findItem(item.children, levelPath.slice(1), compareKey)
            }
        }
        
    }


    /**
 * 转换树结构
 * 
 */
 dataToTree(arr, id = 'id', pid = 'pid') {
    if (!arr instanceof Array) {
        console.error('arr必须是数组!')
        return
    }

    let _tree = []

    // 如果pid为0就是根组件
    function setTreeData(parentArr, currentObj) {
        if (currentObj[pid] === 0) {
            parentArr.push(currentObj)
            return
        } else {
            parentArr.forEach(e => {
                if (currentObj[pid] === e[id]) {
                    e.children ? e.children.push(currentObj) : e.children = [currentObj]
                    return
                } else if (e.children && e.children instanceof Array) {
                    setTreeData(e.children, currentObj)
                }
            })
        }
    }

    // 按照pid从大到小排序
    arr.sort((a, b) => a > b)
    console.log(JSON.stringify(arr))

    arr.forEach(e => {
        setTreeData(_tree, e)
    })
    return _tree
}
}

export default new TreeUtils()
