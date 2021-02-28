<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>章节管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <h2>新增课程</h2>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
       <el-form-item label="视频" required>
       <el-upload
  class="upload-demo"
  drag
  :data="qiniuForm"
  action="https://upload.qiniup.com"
   list-type="picture"
  :before-upload="beforeUpload"
  :on-success="uploadSuccess"
  :on-remove="Remove"
  :limit=1
  :on-exceed="fileExeced"
  :on-preview="handlePictureCardPreview"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
       </el-form-item>
          <el-form-item label="时长" >
        <el-input v-model="ruleForm.time"></el-input>
      </el-form-item>
      <el-checkbox v-model="ruleForm.published" style="margin-left:60px;margin-bottom:20px">发布</el-checkbox>
        <el-form-item label="内容" prop="content" >
          <quill-editor
    ref="myQuillEditor"
    v-model="ruleForm.content" 
  />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="cancelForm('ruleForm')">取消</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form>
  </div>
</template>
<script>
import {v4 as uuidv4} from 'uuid'
export default {
  data() {
    return {
       qiniuForm:{
          token:"USsFn5LITOFjLBJnqu0Ouj1X2gDDGo8YgPgNWxFU:oHW3BQV74vMITfM0iNGZdsrL4jA=:eyJzY29wZSI6Inp5dy1jbXMiLCJkZWFkbGluZSI6MTYxMTAyNjQxM30=",
        key:''
        },
      ruleForm: {
      },
      dialogImageUrl: "",
      dialogVisible: false,
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        sort_order: [
          { required: true, message: "请输入排序", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // description: [
        //   { required: true, message: '请填写品牌描述', trigger: 'blur' }
        // ]
      },
    };
  },
  async created() {
        let id = this.$route.params.id;
      let res=await this.axios.get(`admin/chapters/${id}`)
      console.log(res)
      this.ruleForm=res.data.Chapter
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          this.axios
            .put(`admin/chapters/${this.$route.params.id}`, this.ruleForm)
            .then((res) => {
              // console.log(res)
              this.$message({
                message: "恭喜你，这是一条成功消息",
                type: "success",
              });
              this.$router.push({ name: "chapters" });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancelForm(forName) {
      this.$router.push({ name: "courses" });
    },
    async beforeUpload(file){
          // console.log('111',file)
          const isJPG=file.type==='image/jpeg';
          const isPNG=file.type==='image/png';
          // const isGIF=file.type==='image/gif';
          const islt2M=file.size/1024/1024<2;
          if(!isPNG&&!isJPG){
            this.$message.error('上传文件只能是jpg/png');
            return false;
          };
          if(!islt2M){
            this.$message.error('图片大小不能超过2m');
            return false;
          }
          let fileType =file.type==='image/jpeg'? 'jpg':'png';
          let res =await this.axios.get(`/photos`)
          this.qiniuForm={
            key:`${uuidv4()}.${fileType}`,
            token:res.data.uploadToken
          }
      },
        uploadSuccess(response, file, fileList){
          console.log(response)
          this.ruleForm.image='http://qn2aflg8e.hd-bkt.clouddn.com/'+response.key
        },
    Remove(file, fileList) {
      this.ruleForm.image = "";
    },
    fileExeced(files, fileList) {
      this.$message.error("只能上传一张图片，请先删除再上传");
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>
<style lang="scss">
.add{
  .ql-toolbar.ql-snow + .ql-container.ql-snow {
    min-height:200px
  }
}
</style>