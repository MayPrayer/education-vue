<template>
  <div class="app-container">
    <el-form ref="form" :model="teacher" label-width="80px">

      <el-form-item label="教师名字">
        <el-input v-model="teacher.name"></el-input>
      </el-form-item>

      <el-form-item label="教师头衔">
        <el-select v-model="teacher.career" placeholder="请选择教师头衔">
          <el-option label="普通教师" value="普通教师"></el-option>
          <el-option label="高级教师" value="高级教师"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="教师排序">
        <el-input-number v-model="teacher.sort" :min="0" :max="5" label="优先级"></el-input-number>
      </el-form-item>
      <el-form-item label="教师简介">
        <el-input type="textarea" placeholder="请输入简介，最长不超过50字" v-model="teacher.intro" max="50" show-word-limit
                  :rows="12"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveAndUpdateTeacher()">立即创建</el-button>
        <el-button @click="resetTeacherData()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import teacher from '@/api/teacher/teacher'

  export default {
    data() {
      return {
        teacher: {
          name: '',
          sort: 0,
          intro: '',
          level: 1,
          career: '',
          avatar: ''
        }
      }
    },
//切换路由的时候调用
    watch: {
      $route(to, from) {
        //路由跳转就会执行初始化方法
        this.init()
      }
    },
    //页面渲染前调用，一个页面只会执行一次
    created() {
      this.init()
    },
    methods: {
      init() {
        //判断当前页面是修改还是新增
        //添加页面渲染的时候判断是添加表单，还是修改表单，通过url的路径中是否由id值
        if (this.$route.params && this.$route.params.id) {
          //此为修改页面
          this.getOneTeacherById(this.$route.params.id)
        } else {
          this.teacher = {}
        }
      },

      //添加与更新教师信息方法
      saveAndUpdateTeacher() {
        if (this.$route.params && this.$route.params.id) {
          this.updateOneTeacher(this.teacher)
        } else {
          this.saveTeacher()
        }
      }
      ,
      saveTeacher() {
        console.log('开始创建')
        teacher.addOneTeacher(this.teacher).then((response) => {
          //成功提示添加成功
          this.$message({
            type: 'sucess',
            message: `添加成功`
          })
          //路由跳转
          this.$router.push({ path: '/teacher/list' })
          console.log('执行完毕')
        })
      }
      ,
      resetTeacherData() {
        this.teacher = {}
      }
      ,
      getOneTeacherById(id) {
        teacher.getOneTeacherByID(id).then((response) => {
          this.teacher = response.data
        })
      }
      ,
      updateOneTeacher(teacherinfo) {
        teacher.updateOneTeacher(teacherinfo).then((response) => {
          this.$message({
            type: 'sucess',
            message: `修改成功`
          })
          //路由跳转
          this.$router.push({ path: '/teacher/list' })
          console.log('执行完毕')
        })
      }
    }
  }
</script>
<style>

</style>
