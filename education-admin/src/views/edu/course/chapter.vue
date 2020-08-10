<template>
  <!--课程大纲，章节-->
  <div class="app-container">
    <el-steps :active="2" finish-status="success">
      <el-step title="课程信息"></el-step>
      <el-step title="课程章节"></el-step>
      <el-step title="课程发布"></el-step>
    </el-steps>

    <el-button style="margin-top: 12px;" @click="next">保存并下一步</el-button>
    <el-button style="margin-top: 12px;" @click="pre">上一步</el-button>
  </div>
</template>

<script>
  import chapter from '@/api/chapter/chapter'

  export default {
    data() {
      return {
        chapterlist: [],
        videolist: [],
        courseid: ''
      }
    },

    methods: {
      next() {
        this.$router.push({ path: '/course/publish/2' })
      },
      pre() {
        this.$router.push({ path: '/course/info/' + this.courseid })
      },
      getChapter(courseid) {
        chapter.getChapterByCId(courseid).then(response => {
          this.chapterlist = response.data
        })
      }
    },
    created() {
      this.courseid = this.$route.params.id
      this.getChapter(this.courseid)
    }
  }
</script>

<style scoped>

</style>
