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
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.row._id)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row._id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination
                :total="count"
                :pageSize="params.pageSize"
                :currentPage="params.pageNo"
                @change-no="onchange"
                @change-size="changeSize"
        />
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-width="120px">
                <el-form-item label="上级分类">
                    <el-select v-model="form.parentName" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleUpdate">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {CagetgoryList,categoryDelete,optionCategoryList,categoryInfo,categoryUpdate} from '@/api/category'
    import pagination from "@/components/pagination";

    export default {
        name: "list",
        components: {
            pagination
        },
        data() {
            return {
                dialogFormVisible:false,
                options:[],
                params: {
                    pageNo: 1,
                    pageSize: 2
                },
                tableData: [],
                count: 0,
                form:{}
            }
        },
        created() {
            this.getOptions()
            this.getList()
        },
        methods: {
            async getOptions(){
                const {list}  = await optionCategoryList()
                if (Array.isArray(list)){
                    this.options = list.map(item=>({
                        label:item.name,
                        value:item._id
                    }))
                }
            },
            async getList() {
                const {list, count} = await CagetgoryList(this.params)
                this.tableData = list
                this.count = count
            },
            onchange(val) {
                this.params.pageNo = val
                this.getList()
            },
            changeSize(val) {
                this.params.pageSize = val
                this.getList()
            },
            handleEdit(id){
                this.dialogFormVisible=true
                this.getInfo(id)
            },
            async getInfo(id){
                const {model} =  await categoryInfo({id:id})
                this.form = model
            },
            async handleUpdate(){
               const {status,msg} =  await categoryUpdate(this.form)
               if (status==200){
                   this.getList()
                   this.$message.success(msg)
                   this.dialogFormVisible=false
               }
            },
            handleDelete(id) {
                this.$confirm('确认是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const {status} = await categoryDelete({id})
                    if (status==200){
                        this.$message.success('删除成功')
                        this.getList()
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .el-pagination {
        margin-top: 20px;
    }
</style>