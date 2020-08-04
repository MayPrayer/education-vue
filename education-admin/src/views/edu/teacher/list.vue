<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="教师名称">
        <el-input v-model="teacherQuery.name" placeholder="请输入教师名称"></el-input>
      </el-form-item>
      <el-form-item label="教师等级">
        <el-select v-model="teacherQuery.level" placeholder="请选择教师头衔">
          <el-option label="普通教师" value="1"></el-option>
          <el-option label="高级教师" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间">
        <el-date-picker v-model="teacherQuery.gmtCreate" type="datetime" placeholder="创建时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="选择时间">
        <el-date-picker v-model="teacherQuery.gmtModified" type="datetime" placeholder="更新时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" icon="el-icon-zoom-in" plain @click="getList()">查询</el-button>
      </el-form-item>
      <el-button @click="resetData">清空</el-button>
    </el-form>
    <!--数据表格-->
    <el-table :data="list" border style="width: 100%" class="data-table">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号">
        <template slot-scope="scope">{{(curpage - 1) * pagesize + scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="intro" label="简介" width="800px"></el-table-column>
      <el-table-column prop="career" label="职位"></el-table-column>
      <el-table-column prop="level" label="等级"></el-table-column>
      <el-table-column prop="sort" label="排序"></el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间"></el-table-column>
      <el-table-column prop="gmtModified" label="更新时间"></el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="studentEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div align="center">
      <el-pagination
        @current-change="getList"
        :current-page="curpage"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import teacher from '@/api/teacher/teacher'

  export default {
    data() {
      return {
        curpage: 1,
        pagesize: 5,
        teacherQuery: {},
        total: 0,
        list: null
      }
    },
    created() {
      this.getList()
    },

    methods: {
      //默认参数curpage 无参数师默认为1，有参，则赋值
      getList(curpage = 1) {
        this.curpage = curpage
        console.log('this.curpage变成了：' + this.curpage)
        teacher.getTeacherListPage(this.curpage, this.pagesize, this.teacherQuery).then(response => {
          if (response.data.code = 20000) {
            console.log(response)
            this.list = response.data
            this.total = response.count
          }
        }).catch(error => {
          console.log(error)
          console.log('执行完毕！')
        })
      },
      resetData() {
        this.teacherQuery = {}
        this.getList()
      },
      removeDataById(id) { //删除讲师按钮的方法
        this.$confirm('此操作将永久删除讲师信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          teacher.deleteTeacherById(id)
            .then(response => { //删除成功
              //提示信息
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              //回到列表页面
              this.getList()
            })
        })
        //点取消执行catch方法  用户体验角度
        //此处无需进行提示取消
        //框架在./utils/request.js封装好了提示error的方法
      }
    }
  }
</script>

<style scoped>
  .data-table {
    margin: 30px 20px;
  }


</style>
