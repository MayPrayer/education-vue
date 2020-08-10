<template>
  <!--课程信息-->
  <!-- 步骤条-->
  <div class="app-container">

    <el-steps :active="1" finish-status="success">
      <el-step title="课程信息"></el-step>
      <el-step title="课程章节"></el-step>
      <el-step title="课程发布"></el-step>
    </el-steps>

    <!--表单信息-->
    <el-form ref="form" label-width="80px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title"></el-input>
      </el-form-item>
      <!--讲师-->
      <el-form-item label="教师名称">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择教师">
          <el-option v-for="(teacher,index) in teacherList" :key="index" :label="teacher.name"
                     :value="teacher.id"></el-option>
        </el-select>
      </el-form-item>
      <!--课程分类-->
      <el-form-item label="课程分类">
        <el-select v-model="courseInfo.subjectParentId" placeholder="请选择一级分类" @change="getSonSubject">
          <el-option v-for="(subject,index) in subjectlist" :key="index" :label="subject.title"
                     :value="subject.id"></el-option>
        </el-select>
        <el-select v-model="courseInfo.subjectId" placeholder="请选择二级分类">
          <el-option v-for="(subject,index) in sonsubjectlist" :key="index" :label="subject.title"
                     :value="subject.id"></el-option>
        </el-select>
      </el-form-item>
      <!--封面-->
      <el-form-item label="课程封面">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:9001/edo/oss/fileUpload"
          :show-file-list="false"
          :on-success="handleCoverSuccess"
          :before-upload="beforeCoverUpload">
          <img v-if="courseInfo.cover" :src="courseInfo.cover" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number v-model="courseInfo.lessonNum" :min="0" label="优先级"></el-input-number>
      </el-form-item>
      <el-form-item label="课程简介">
        <el-input v-model="courseInfo.description"></el-input>
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input-number v-model="courseInfo.price" :min="0" label="优先级"></el-input-number>
      </el-form-item>
    </el-form>

    <el-button style="margin-top: 12px;" @click="saveAndUpdate">保存并下一步</el-button>
  </div>

</template>

<script>
  import course from '@/api/course/course'
  import teacher from '@/api/teacher/teacher'
  import subject from '@/api/subject/subject'

  export default {
    data() {
      return {
        courseInfo: {
          teacherId: '',
          price: '',
          lessonNum: 0,
          description: '',
          title: '',
          subjectId: '',
          subjectParentId: '',
          cover: ''
        },
        courseid: 0,
        teacherList: [],
        teacher: {},
        subjectlist: [],
        sonsubjectlist: []
      }
    },
    methods: {
      saveAndUpdate() {
        if (this.$route.params && this.$route.params.id) {
          //修改操作
          course.UpdateCourse(this.courseInfo)
        } else {
          //新增操作
          course.addCourse(this.courseInfo).then(response => {
            this.courseid = response.data
            this.$message({
              type: 'success',
              message: '添加课程成功'
            })
            this.$router.push({ path: '/course/chapter/' + this.courseid })
          })
        }
      },
      getAllTeacher() {
        teacher.getAllTeacher().then(response => {
          this.teacherList = response.data
        })
      },
      getAllSubject() {
        subject.getSubjectList().then(response => {
          this.subjectlist = response.data
        })
      },
      getSonSubject(value) {
        //先遍历一级目录
        console.log('执行了')
        for (let i = 0; i < this.subjectlist.length; i++) {
          if (this.subjectlist[i].id === value) {
            this.sonsubjectlist = this.subjectlist[i].children
            this.courseInfo.subjectId = []
          }
        }
      },
      handleCoverSuccess(res, file) {
        this.courseInfo.cover = res.data.filepath
      },
      beforeCoverUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    },
    created() {
      //如果是修改课程信息页面的话，获取courside
      if (this.$route.params && this.$route.params.id) {
        //初始化联动的数据，初始化讲师
        this.getAllTeacher()
        this.getAllSubject()
        course.findCourse(this.$route.params.id).then(response => {
            this.courseInfo = response.data
            //查询所有分类信息 ,初始化原来的信息，还原现场
            for (var i = 0; i < this.subjectlist.length; i++) {
              //获取每个一级分类
              var oneSubject = this.subjectlist[i]
              //比较当前一级分类id和courseInfo里的id是否相同
              if (this.courseInfo.subjectParentId == oneSubject.id) {
                //获取一级分类下的二级分类
                this.sonsubjectlist = oneSubject.children
              }
            }
          })
      } else {
        //就是新增课程信息
        this.getAllTeacher()
        this.getAllSubject()
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
</style>
