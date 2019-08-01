

import govService from '../../services/gov/govService'
export default {
    data(){
       return{
            govData: [],
       }

    },created () {
        this.getData()
    },
    methods: {
         getData() {
                this.loading = true
                return govService.getSelectList({
                    pagesize: -1,
                    pid: this.fetchParam.pid,
                    province_id	: this.fetchParam.provinceSelect,
                    city_id	: this.fetchParam.citySelect,
                    area_id: this.fetchParam.areaSelect
                }).then((ret) => {
                    this.govData = ret.data
                }).then(() => {
                    this.loading = false
                })
            }
    }

}