<template>
  <!--课程发布-->
  <div class="app-container">
    <el-steps :active="3" finish-status="success">
      <el-step title="课程信息"></el-step>
      <el-step title="课程章节"></el-step>
      <el-step title="课程发布"></el-step>
    </el-steps>

    <div class="ccInfo">
      <img :src="publishCourseInfo.cover">
      <div class="main">
        <h2>{{ publishCourseInfo.title }}</h2>
        <p class="gray"><span>共{{ publishCourseInfo.lessonNum }}课时</span></p>
        <p><span>所属分类：{{ publishCourseInfo.subjectLevelOne }} — {{ publishCourseInfo.subjectLevelTwo }}</span></p>
        <p>课程讲师：{{ publishCourseInfo.teacherName }}</p>
        <h3 class="red">￥{{ publishCourseInfo.price }}</h3>
      </div>
    </div>

    <el-button style="margin-top: 12px;" @click="next">发布课程</el-button>
    <el-button style="margin-top: 12px;" @click="pre">返回修改</el-button>
  </div>
</template>

<script>
  import course from '@/api/course/course'

  export default {
    data() {
      return {
        courseid: '',
        publishCourseInfo: {}
      }
    },

    methods: {
      next() {
        this.$router.push({ path: '/course/list/'})
      },
      pre() {
        this.$router.push({ path: '/course/chapter/' + this.courseid })
      },
      //获取最终课程信息
      getFinalCourseInfo() {
        course.getFinalCouseinfo(this.courseid).then(response => {
          this.publishCourseInfo = response.data
        })
      }
    },
    created() {
      this.courseid = this.$route.params.id
      this.getFinalCourseInfo()
    }
  }
</script>

<style scoped>
  .ccInfo {
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 40px;
    position: relative;
  }

  .ccInfo img {
    background: #d6d6d6;
    width: 500px;
    height: 278px;
    display: block;
    float: left;
    border: none;
  }

  .ccInfo .main {
    margin-left: 520px;
  }

  .ccInfo .main h2 {
    font-size: 28px;
    margin-bottom: 30px;
    line-height: 1;
    font-weight: normal;
  }

  .ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
  }

  .ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
  }

  .ccInfo .main h3 {
    left: 540px;
    bottom: 20px;
    line-height: 1;
    font-size: 28px;
    color: #d32f24;
    font-weight: normal;
    position: absolute;
  }
</style>
