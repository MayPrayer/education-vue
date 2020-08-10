<template>
  <!--课程发布-->
  <div class="app-container">
    <el-steps :active="3" finish-status="success">
      <el-step title="课程信息"></el-step>
      <el-step title="课程章节"></el-step>
      <el-step title="课程发布"></el-step>
    </el-steps>

    <el-button style="margin-top: 12px;" @click="next">保存</el-button>
    <el-button style="margin-top: 12px;" @click="pre">上一步</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return { courseid: '' }
    },

    methods: {
      next() {
      },
      pre() {
        this.$router.push({ path: '/course/chapter/' + this.courseid })
      }
    },
    created() {
      this.courseid = this.$route.params.id
    }
  }
</script>

<style scoped>

</style>
