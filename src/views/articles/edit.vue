<template>
    <div><el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="新闻标题">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="新闻分类">
    <el-select v-model="form.categoryId" placeholder="请选择分类">
      <el-option v-for="category in categories" :key="category.id" :label="category.name" :value="category.id"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="新闻内容">
    <el-input v-model="form.content"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button @click="cancel">取消</el-button>
  </el-form-item>
</el-form></div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
         title: '',
        content:'',
        categoryId:'',
        },
        categories:[],
      }
    },
    async created(){
                let res=await this.axios.get(`admin/article_categories`)
        this.categories=res.data.data.category.rows
      this.init()
    },
    methods: {
      async onSubmit() {
          let id = this.$route.params.id;
        await this.axios.put(`admin/articles/${id}`,this.form)
        this.$router.push({name:"Articles"})
      },
      async init(){
           let id = this.$route.params.id;
            let res=await  this.axios.get(`admin/articles/${id}`)
            console.log(res)
            this.form={
                 title: res.data.article.title,
        content:res.data.article.content,
        categoryId:res.data.article.categoryId,
               }

      },
      cancel(){
       this.form={  
           title:'',
        content:'',
        categoryId:'',}
      }
    }
  }
</script>