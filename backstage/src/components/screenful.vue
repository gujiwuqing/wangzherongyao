<template>
    <div>
       <i class="el-icon-full-screen" @click="click" title="全屏"></i>
    </div>
</template>

<script>
    import screenfull from 'screenfull'
    export default {
        name: 'Screenfull',
        data() {
            return {
                isFullscreen: false
            }
        },
        mounted() {
            this.init()
        },
        beforeDestroy() {
            this.destroy()
        },
        methods: {
            click() {
                if (!screenfull.enabled) {
                    this.$message({
                        message: '浏览器不能全屏',
                        type: 'warning'
                    })
                    return false
                }
                screenfull.toggle()
            },
            change() {
                this.isFullscreen = screenfull.isFullscreen
            },
            init() {
                if (screenfull.enabled) {
                    screenfull.on('change', this.change)
                }
            },
            destroy() {
                if (screenfull.enabled) {
                    screenfull.off('change', this.change)
                }
            }
        }
    }
</script>

<style scoped>
i{
    margin-right: 10px;
}
</style>