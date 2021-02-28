<template>
  <div class="commodityManagement">
    <h2>课程</h2>
     <el-button type="success" @click="add"><i class="el-icon-edit"></i>新增</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column width="70" prop="id" label="id"></el-table-column>
      <el-table-column label="缩略图" width="130">
        <template slot-scope="scope">
          <img
            :src="scope.row.image | check_img"
            alt=""
            width="100%"
          />
        </template>
      </el-table-column>
      <el-table-column width="100" prop="name" label="名称"></el-table-column>
      <el-table-column width="100" prop="body" label="body"></el-table-column>
      <el-table-column label="完结" width="70">
        <template slot-scope="scope">
          <i :class="scope.row.completed ?  'el-icon-check' : 'el-icon-close'"  @click="change_icon(scope.row,1,scope.row.completed)"></i>
        </template>
      </el-table-column>
       <el-table-column label="发布" width="70">
        <template slot-scope="scope">
          <i :class="scope.row.published ?  'el-icon-check' : 'el-icon-close'" @click="change_icon(scope.row,2,scope.row.published)"></i>
        </template>
      </el-table-column>
        <el-table-column label="推荐" width="70">
        <template slot-scope="scope">
          <i :class="scope.row.recommended ?  'el-icon-check' : 'el-icon-close'" @click="change_icon(scope.row,3,scope.row.recommended)"></i>
        </template>
      </el-table-column>
       <el-table-column label="免费" width="70">
        <template slot-scope="scope">
          <i :class="scope.row.free ?  'el-icon-check' : 'el-icon-close'"  @click="change_icon(scope.row,4,scope.row.free)"></i>
        </template>
      </el-table-column>
       <el-table-column label="入门" width="70">
        <template slot-scope="scope">
          <i :class="scope.row.introductory ?  'el-icon-check' : 'el-icon-close'"  @click="change_icon(scope.row,5,scope.row.introductory)"></i>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="200">
        <template slot-scope="scope">
        <div>{{scope.row.createdAt | datetime}}</div>
        </template>
      </el-table-column>
                <el-table-column label="详情" width="130">
                   <template slot-scope="scope">
       <el-button type="primary" @click="chapter_list(scope.row)" round>详情</el-button>
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
      check_img(val){
           if(val==null){
        return ''
      }else if(val.substr(0,4)=='http'){
          return val
      }else{
        return 'http://images.canon4ever.com/'+val
      }
      },
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
      this.$router.push({ name: "coursesEdit", params: { id: row.id } });
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios.delete(`/admin/courses/${row.id}`).then((res) => {
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
      this.axios.get(`/admin/courses`).then((res) => {
       console.log(res)
       this.tableData=res.data.Courses
        this.page={
          }
      });
    },
    chapter_list(row){
      this.$router.push({name:"chapters",query:{CourseId:row.id}})
    },
     onSubmit() {
       this.page.current_page=1
       this.new_form={
          name:this.form.name,
        id:this.form.id,
        is_top:this.form.is_top,
        is_recommend:this.form.is_recommend,
        is_hot:this.form.is_hot,
        is_onsale:this.form.is_onsale,
        is_new:this.form.is_new,
        created_at:this.form.created_at,
       }
       if(this.new_form.created_at==null){
         this.new_form.created_at=""
       }
       this.init()
       },
       add(){
         this.$router.push({name:"coursesAdd"})
       },
       change_page(val){
          this.page.current_page=val;
          this.init()
       },
       change_icon(row,x,y){
         if(y){
           y=0
         }else{
           y=1
         }
         switch(x){
           case 1:x={completed:y}
           break
           case 2:x={published:y}
           break
            case 3:x={recommended:y}
           break
            case 4:x={free:y}
           break
            case 5:x={introductory:y}
           break
         }
                console.log(row,x,y)
                this.axios.put(`/admin/courses/${row.id}`,x).then(res=>{
                  this.init()
                })
       }
  }
};
</script>
<style >
/* .commodityManagement .el-input__inner {
  width: 140px;
} */
</style>