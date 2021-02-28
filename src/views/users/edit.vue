<template>
    <div><el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="用户名">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
    <el-form-item label="密码">
    <el-input v-model="form.password"></el-input>
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
       password:'',
        },
      }
    },
    created(){
         let id = this.$route.params.id;
        this.axios.get(`/admin/users/${id}`).then(res=>{
            this.form=res.data.User
            console.log(res)
        })
    },
    methods: {
      async onSubmit() {
           let id = this.$route.params.id;
        await this.axios.put(`admin/users/${id}`,this.form)
        this.$router.push({name:"users"})
      },
      cancel(){
       this.form={  name: '',
       password:'',}
      }
    }
  }
</script>