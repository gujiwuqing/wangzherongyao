<template>
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="total">
    </el-pagination>
</template>

<script>
    export default {
        name: "pagination",
        props:{
            currentPage:{
                type:Number,
                default:1
            },
            pageSize:{
                type:Number,
                default:8
            },
            total:{
                type:Number,
                default:0
            }
        },
        methods:{
            handleSizeChange(val) {
                this.$emit('change-size',val)
            },
            handleCurrentChange(val) {
               this.$emit('change-no',val)
            }
        }
    }
</script>

<style scoped>

</style>