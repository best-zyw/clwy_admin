<template>
    <div><el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="分类标题">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
    <el-form-item label="分类排序">
    <el-input v-model="form.sort"></el-input>
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
         name: '',
        sort:'',
        },
        categories:[],
      }
    },
    created(){
        this.init()
    },
    methods: {
      async onSubmit() {
           let id = this.$route.params.id;
        await this.axios.put(`admin/course_categories/${id}`,this.form)
        this.$router.push({name:"courseCategories"})
      },
         async init(){
           let id = this.$route.params.id;
            let res=await  this.axios.get(`admin/course_categories/${id}`)
            console.log(res)
            this.form={
                 name: res.data.data.category.name,
        sort:res.data.data.category.sort,
               }

      },
      cancel(){
       this.form={ 
        name: '',
        sort:'',
      }
      }
    }
  }
</script>