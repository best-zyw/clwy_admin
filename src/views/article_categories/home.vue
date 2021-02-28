<template>
	<div>

        <el-button type="success" @click="add"><i class="el-icon-edit"></i>新增</el-button>
    <el-button type="success"><i class="el-icon-edit"></i>导出</el-button>
      
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="品牌id"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
            label="品牌名称"
            width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
            label="排序"
            width="500">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.sort }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
      <el-pagination
              background
              layout="prev, pager, next"
              :page-size="page.pageSize"
              :total="page.total"
              @current-change="fy">
      </el-pagination>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        tableData: [],
        tableDataOut:[],
        msg:'',
        page:{
            current_page:1,
            total:0,
            pageSize:0,
        }
            

        
      }
    },
    filters: {
    check_show(val){
    // console.log(val,'wos')
    return  val ? 'el-icon-check':'el-icon-close'
  }
},
    created(){
      this.init();
    },
    methods: {
      handleEdit(index, row) {
        // console.log(index, row);
        this.$router.push({name:'articleCategoriesEdit',params:{id:row.id}})
      },
      handleDelete(index, row) {
        // console.log(index, row);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.axios.delete(`admin/article_categories/${row.id}`).then(res=>{
                   this.init();
                     this.$message({
            type: res.data.success?"success":"error",
            message:res.data.msg
          });
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      init(){
          this.axios.get(`admin/article_categories`).then(res=>{
                    console.log(res)
                    this.tableData=res.data.data.category.rows
        })
      },
      fy(val){
          // console.log(val);
          this.page.current_page=val;
          this.init();
      },
      add(){
          this.$router.push({name:"articleCategoriesAdd"})
      }
    }
  }
</script>
<style scoped>
  .el-pagination{
    display: flex;
    justify-content: center;
  }
  .el-icon-check{
    color:green;
  }
  .el-icon-close{
    color: red;
  }
</style>
