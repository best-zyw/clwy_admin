<template>
  <div>
    <h2>章节</h2>
     <el-button type="success" @click="add"><i class="el-icon-edit"></i>新增</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column width="70" prop="id" label="id"></el-table-column>
      <el-table-column width="100" prop="title" label="标题"></el-table-column>
       <el-table-column label="发布" width="70">
        <template slot-scope="scope">
          <i :class="scope.row.published ?  'el-icon-check' : 'el-icon-close'"></i>
        </template>
      </el-table-column>
             <el-table-column label="排序" width="130">
        <template slot-scope="scope">
          <el-input v-model="scope.row.sort" @change="px(scope.row.id,scope.row.sort)" size="small" style="width:50%"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="200">
        <template slot-scope="scope">
        <div>{{scope.row.createdAt | datetime}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      background
      style=" display: flex;justify-content: center"
      layout="prev, pager, next"
      :page-size="page.per_page"
      :total="page.total"
      :current-page="page.current_page"
      @current-change="change_page"
    >
    </el-pagination>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      form:{},
      new_form:{},
       tableData: [],
        value:"",
         page: {
        current_page: 1,
        total: 0,
        per_page: 0,
      },
    };
  },
  filters:{
        datetime(data){
      moment.locale('zh_cn');
        return moment(data).format('LL');  
    }
  },
  created(){
      this.init()
  },
  methods:{
        handleEdit(index, row) {
      // console.log(index, row);
      this.$router.push({ name: "chaptersEdit", params: { id: row.id } });
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios.delete(`/admin/chapters/${row.id}`).then((res) => {
                    this.$message({
            type: "success",
            message: "删除成功!",
          });
            this.init()
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
     init() {
       let courseid=""
       if(this.$route.query.CourseId){
         courseid=this.$route.query.CourseId
       }
       console.log(courseid)
      this.axios.get(`/admin/chapters?CourseId=${courseid}`).then((res) => {
       console.log(res)
       this.tableData=res.data.Chapters
        this.page={
          }
      });
    },
       add(){
         this.$router.push({name:"chaptersAdd"})
       },
          px(id,sort){
      console.log(id,sort)
      this.axios.put(`/admin/chapters/${id}`,{sort:sort}).then(res=>{
          this.init()
      }).catch((error)=>{
        if(error.response && error.response.status=="422"){
          this.$message.error("填写的排序不正确！必须是0~99的数字！")
        }
      })
    },
       change_page(val){
          this.page.current_page=val;
          this.init()
       },
  }
};
</script>
<style >
/* .commodityManagement .el-input__inner {
  width: 140px;
} */
</style>