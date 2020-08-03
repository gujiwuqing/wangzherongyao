<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="_id"
                    label="id">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="parentName.name"
                    label="上级分类">
            </el-table-column>
        </el-table>
        <pagination
                :total="count"
                :pageSize="params.pageSize"
                :currentPage="params.pageNo"
                @change-no="onchange"
                @change-size="changeSize"
        />
    </div>
</template>

<script>
    import {CagetgoryList} from '@/api/category'
    import pagination from "@/components/pagination";
    export default {
        name: "list",
        components:{
            pagination
        },
        data(){
            return{
                params:{
                    pageNo:1,
                    pageSize:2
                },
                tableData:[],
                count:0
            }
        },
        created() {
            this.getList()
        },
        methods:{
            async getList(){
                const {list,count} = await CagetgoryList(this.params)
                this.tableData = list
                this.count=count
            },
            onchange(val){
               this.params.pageNo=val
                this.getList()
            },
            changeSize(val){
                this.params.pageSize=val
                this.getList()
            }
        }
    }
</script>

<style scoped>

</style>