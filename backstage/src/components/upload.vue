<template>
    <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:3000/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
    export default {
        name: "upload",
        data(){
            return{

            }
        },
        props:{
            imageUrl:{
                type:String,
                default:''
            }
        },
        methods:{
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.$emit('upload-img',res.url)
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style scoped lang='scss'>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        min-width: 178px;
        line-height: 178px;
        @include wh(100%,100%);
        text-align: center;
        border: 1px dashed #d9d9d9;
    }

    .avatar {
        min-width: 178px;
        @include wh(100%,100%);
        /*width: 100%;*/
        /*height: 178px;*/
        display: block;
        border: 1px dashed #d9d9d9;
    }
</style>