<style>
    #course-docshow {
        width: 100%;
    }
</style>
<template>
    <iframe id="course-docshow" ref="container" :src="dataUrl" frameborder="0"></iframe>
</template>

<script>
    import authUtils from '../../../utils/authUtils'
    export default{
        data () {
            return {
                loading: true,
                url: void 0,
                token: void 0,
                dataUrl: void 0,
            }
        },
        created () {
            this.token = authUtils.getAuthToken()
            this.url = this.$route.query.url

            var xhr = new window.XMLHttpRequest()

            xhr.open('GET', this.url)
            xhr.onreadystatechange = handler
            xhr.responseType = 'blob'
            xhr.setRequestHeader('Authorization', 'Bearer ' + authUtils.getAuthToken())
            xhr.setRequestHeader('TwoStep', `Bearer ${authUtils.getTwiceToken()}`)
            xhr.send()
            let _this = this

            function handler () {
                if (this.readyState === this.DONE) {
                    if (this.status === 200) {
                        // this.response is a Blob, because we set responseType above
                        var data_url = window.URL.createObjectURL(this.response)
                        _this.dataUrl = data_url
                        this.loading = false
                    } else {
                        xmview.showTip('error', '文档初始化错误')
                    }
                }
            }
        },
        mounted () {
            this.$refs.container.style.height = window.innerHeight - 5 + 'px'
        },
        methods: {},
        components: {}
    }
</script>
