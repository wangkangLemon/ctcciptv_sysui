/**
 * Created by huanghuixin on 2017/4/10.
 */

// 题目类型 0-判断 1-单选 2-多选
class TestingFactory {
    // 最全的课程原始数据
    getOrignData () {
        return {
            description: void 0, // 题目
            score: void 0, // 分数
            image: void 0, // 图片
            explain: void 0, // 答案详解
            correct: void 0,
            editable: true,
            options: [{ // 选项
                sort: 1,
                description: '',
                correct: void 0 // 是否正确答案 正确为1
            }]
        }
    }
    // 最全的应试考试原始数据
    getExamOrignData() {
        return {
            description: void 0, // 题目
            // score: void 0, // 分数
            image: void 0, // 图片
            explain: void 0, // 答案详解
            correct: void 0,
            editable: true,
            // qtype: '', //题型
            type: 1, //题型
            // title: '', //A3、A4题型题干
            options: [{ // 选项
                sort: 1,
                description: '',
                correct: void 0 // 是否正确答案 正确为1
            }]
        }
    }

    /**
     * 获取题目设置 （课程）
     * @param type 0-判断 1-单选 2-多选
     */
    getTestingSet (type) {
        let data = this.getOrignData()
        data.category = type
        if (type == 0) {
            delete data.options
            data.correct = void 0
            return data
        } else if (type == 1 || type == 2) {
            return data
        }
    }
    
    /**
     * 获取题目设置 （应试考试）
     * @param type 0-判断 1-单选 2-多选
     */
    getExamSet(type) {
        let data = this.getExamOrignData()
        data.type = type
        if (type == 0) {
            delete data.options
            data.correct = void 0
            return data
        } else if (type == 1 || type == 2) {
            return data
        }
    }

    /**
     * 获取题库设置
     * @param type 0-判断 1-单选 2-多选
     */
    getLibSet(type) {
        let data = this.getOrignData()
        data.subject_type = type
        if (type == 0) {
            delete data.options
            data.correct = 1
            return data
        } else if (type == 1 || type == 2) {
            return data
        }
    }
}

export default new TestingFactory()
