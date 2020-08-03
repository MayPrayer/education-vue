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
        <el-button type="primary" icon="el-icon-zoom-in" plain @click="getList">查询</el-button>
      </el-form-item>
      <el-button  @click="resetData">清空</el-button>
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
          <el-button type="danger" size="small" @click="studentDelete(scope.row)">删除</el-button>
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
        console.log(this.teacherQuery)
        teacher.getTeacherListPage(this.curpage, this.pagesize, this.teacherQuery).then(response => {
          if (response.data.code = 20000) {
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
      }
    }

  }
</script>

<style scoped>
  .data-table {
    margin: 30px 20px;
  }


</style>
