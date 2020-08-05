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
                    prop="icon"
                    label="图片">
                    <template slot-scope="scope">
                        <img :src="scope.row.icon" alt="">
                    </template>
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
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="物品图片">
                    <upload @upload-img="uploadImg" :imageUrl="form.icon"></upload>
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
    import {articleList,articleDelete,articleInfo,articleUpdate} from '@/api/article'
    import pagination from "_c/pagination";
    import upload from "_c/upload";
    export default {
        name: "list",
        components: {
            pagination,
            upload
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
                form:{},
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                    ],
                },
            }
        },
        created() {
            
            this.getList()
        },
        methods: {
            
            async getList() {
                const {list, count} = await articleList(this.params)
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
                const {model} =  await articleInfo({id:id})
                this.form = model
            },
            uploadImg(path){
                this.form.icon = path
                console.log(this.form.icon);
            },
            async handleUpdate(){
               const {status,msg} =  await articleUpdate(this.form)
            //    if (status==200){
            //        this.getList()
            //        this.$message.success(msg)
            //        this.dialogFormVisible=false
            //    }
            },
            handleDelete(id) {
                this.$confirm('确认是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const {status} = await articleDelete({id})
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

<style lang='scss' scoped>
    .el-pagination {
        margin-top: 20px;
    }
</style>