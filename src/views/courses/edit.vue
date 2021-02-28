<template>
  <div class="add">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增</el-breadcrumb-item>
    </el-breadcrumb>
    <h2>新增课程</h2>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="description" >
          <quill-editor
    ref="myQuillEditor"
    v-model="ruleForm.content" 
  />
      </el-form-item>
       <el-form-item label="缩略图" required>
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
      <el-form-item label="课程分类">
        <el-select v-model="ruleForm.categoryId" placeholder="请选择">
          <el-option
            v-for="item in tableData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
            <el-form-item label="作者">
        <el-select v-model="ruleForm.userId" placeholder="请选择">
          <el-option
            v-for="item in userData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
          <el-form-item label="适合人群" >
        <el-input v-model="ruleForm.target_person"></el-input>
      </el-form-item>
              <el-form-item label="适合人群详情" >
        <el-input v-model="ruleForm.target_person_details"></el-input>
      </el-form-item>
      <el-checkbox v-model="ruleForm.published">发布</el-checkbox>
       <el-checkbox v-model="ruleForm.completed">完成</el-checkbox>
        <el-checkbox v-model="ruleForm.recommended">推荐</el-checkbox>
         <el-checkbox v-model="ruleForm.free">免费</el-checkbox>
         <el-checkbox v-model="ruleForm.introductory">入门</el-checkbox>
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
      tableData: [],
      userData:[],
      dialogImageUrl: "",
      dialogVisible: false,
      rules: {
        name: [
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
  created() {
          let id = this.$route.params.id;
    this.axios.get(`admin/course_categories`).then((res) => {
      console.log(res);
      this.tableData = res.data.data.category.rows;
    });
    this.axios.get(`/admin/users`).then(res=>{
      console.log(res)
      this.userData=res.data.Users
    });
    this.axios.get(`admin/courses/${id}`).then(res=>{
        // console.log(res)
        this.ruleForm=res.data.Course
        this.ruleForm.published=!!res.data.Course.published
         this.ruleForm.completed=!!res.data.Course.completed
          this.ruleForm.recommended=!!res.data.Course.recommended
           this.ruleForm.free=!!res.data.Course.free
            this.ruleForm.introductory=!!res.data.Course.introductory
        
    })
  },
  methods: {
    submitForm(formName) {
         let id = this.$route.params.id;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          this.axios
            .put(`admin/courses/${id}`, this.ruleForm)
            .then((res) => {
              // console.log(res)
              this.$message({
                message: "恭喜你，这是一条成功消息",
                type: "success",
              });
              this.$router.push({ name: "courses" });
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