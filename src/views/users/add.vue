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
    },
    methods: {
      async onSubmit() {
        await this.axios.post(`admin/users`,this.form)
        this.$router.push({name:"users"})
      },
      cancel(){
       this.form={  name: '',
       password:'',}
      }
    }
  }
</script>