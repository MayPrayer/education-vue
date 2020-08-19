<template>
  <!--课程大纲，章节-->
  <!--步骤条-->
  <div class="app-container">
    <el-steps :active="2" finish-status="success">
      <el-step title="课程信息"></el-step>
      <el-step title="课程章节"></el-step>
      <el-step title="课程发布"></el-step>
    </el-steps>

    <!--弹出层-->
    <el-dialog title="添加章节" :visible.sync="dialogFormmVisible">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title"/>
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormmVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改小节表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="1">免费</el-radio>
            <el-radio :label="0">默认</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="上传视频">
          <el-upload
            ref="upload"
            :auto-upload="false"
            :on-error="handleUploadError"
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API+'/eduvod/video/uploadAlyVideo'"
            :limit="1"
            class="upload-demo">
            <!-- <el-button size="small" type="primary">上传视频</el-button> -->
            <el-button slot="trigger" size="small" type="primary">选择视频</el-button>
            <el-button
              :disabled="uploadBtnDisabled"
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload()">上传
            </el-button>
            <el-tooltip placement="right-end">
              <div slot="content">最大支持1G，<br>
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                SWF、TS、VOB、WMV、WEBM 等视频格式上传
              </div>
              <i class="el-icon-question"/>
            </el-tooltip>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">确 定</el-button>
      </div>
    </el-dialog>


    <!-- 章节 -->
    <ul class="chanpterList">
      <li v-for="chapter in chapterlist" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button style="" type="text" @click="openVideo(chapter.id)">添加课时</el-button>
            <el-button style="" type="text" @click="openEditChatper(chapter.id)">编辑</el-button>
            <el-button type="text" @click="removeChapter(chapter.id)">删除</el-button>
          </span>
        </p>

        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>
              {{ video.title }}
              <el-tag v-if="!video.videoSourceId" size="mini" type="danger">
                {{ '尚未上传视频' }}
              </el-tag>
              <span class="acts">
                <!-- <el-tag v-if="video.isFree" size="mini" type="success">{{ '免费观看' }}</el-tag> -->
                <el-button style="" type="text" @click="openEditVideo(video.id)">编辑</el-button>
                <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>

    <!--操作按钮-->
    <el-button type="primary" @click="resetdata">添加章节</el-button>
    <el-button style="margin-top: 12px;" @click="next">保存并下一步</el-button>
    <el-button style="margin-top: 12px;" @click="pre">上一步</el-button>
  </div>
</template>

<script>
  import chapter from '@/api/chapter/chapter'
  import video from '@/api/chapter/video'

  export default {
    data() {
      return {
        chapterlist: [],
        videolist: [],
        courseid: this.courseid,
        chapter: {},
        dialogFormmVisible: false,
        dialogVideoFormVisible: false,
        video: {},
        saveVideoBtnDisabled: false,
        uploadBtnDisabled: false,
        BASE_API: process.env.BASE_API,// 接口API地址
        fileList: []
      }
    },

    methods: {
      next() {
        this.$router.push({ path: '/course/publish/' + this.courseid })
      },
      pre() {
        this.$router.push({ path: '/course/info/' + this.courseid })
      },
      getAllChapter(courseid) {
        chapter.getAllChapter(courseid).then(response => {
          this.chapterlist = response.data
        })
      }, resetdata() {
        this.dialogFormmVisible = true
        this.chapter = {}
      },
      saveOrUpdate() {
        if (this.chapter.id) {
          //修改操作
          chapter.updatechapter(this.chapter).then(response => {
            //关闭弹窗
            this.dialogFormmVisible = false
            //提示信息
            this.$message({
              type: 'success',
              message: '修改章结成功！'
            })
            //刷新页面。重新获得数据
            this.getAllChapter(this.courseid)
          })
        } else {
          //新增操作，保存时封装
          this.chapter.courseId = this.courseid
          chapter.addchapter(this.chapter).then(response => {
            //关闭弹窗
            this.dialogFormmVisible = false
            //提示信息
            this.$message({
              type: 'success',
              message: '添加章结成功！'
            })
            //刷新页面。重新获得数据
            this.getAllChapter(this.courseid)
          })
        }
      },
      saveOrUpdateVideo() {
        this.video.courseId = this.courseid
        video.addvideo(this.video).then(() => {
          this.$message({
            type: 'success',
            message: '添加小结成功！'
          })
        })
      },
      openVideo(chapterid) {
        //添加小结信息
        this.dialogVideoFormVisible = true
        this.video.chapterId = chapterid
      },
      openEditChatper(chapterid) {
        //获得当前章节信息，设置可见 ，自动填充
        chapter.findChapter(chapterid).then(response => {
          this.chapter = response.data
          this.dialogFormmVisible = true
        })
      },
      removeChapter(chapterid) {
        this.$confirm('此操作将永久删除章节信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          chapter.deleteChapter(chapterid).then(() => {
            this.$message({
              type: 'success',
              message: '删除章结成功！'
            })
            //刷新页面
            this.getAllChapter(this.courseid)
          })
        })
      },
      removeVideo(videoid) {
        this.$confirm('此操作将永久删除小结信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          video.deleteVideo(videoid).then(() => {
            this.$message({
              type: 'success',
              message: '删除小结成功！'
            })
            //刷新页面
            this.getAllChapter(this.courseid)
          })
        })
      },
      //上传视频成功调用的方法
      handleVodUploadSuccess(response, file, fileList) {
        this.uploadBtnDisabled = false
        if (response.success) {
          //上传视频id赋值
          this.video.videoSourceId = response.data.videoId
          //上传视频名称赋值
          this.video.videoOriginalName = file.name
        } else {
          this.$message.error('上传失败（非20000）')
        }
      },
      // 失败回调
      handleUploadError() {
        this.uploadBtnDisabled = false
        this.$message.error('上传失败（http）')
      },
      handleUploadExceed() {
        this.$message.warning('想要重新上传视频，请先删除已上传的视频')
      },

      //删除小节中的视频 点击×调用这个方法
      beforeVodRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      handleVodRemove() {
        //调用接口的删除视频的方法
        video.deleteAlyVod(this.video.videoSourceId)
          .then(response => {
            //提示信息
            this.$message({
              type: 'success',
              message: '删除视频成功! 😄'
            })
            //把文件列表清空
            this.fileList = []
            //把video视频id和视频名称值清空
            //上传视频id赋值
            this.video.videoSourceId = ''
            //上传视频名称赋值
            this.video.videoOriginalName = ''
            // 删除视频的同时更新video数据信息
            video.updatevideo(this.video)
            this.$message.success(response.message)
          })
      }
    },
    created() {
      this.courseid = this.$route.params.id
      this.getAllChapter(this.courseid)
    }
  }
</script>

<style scoped>
  .chanpterList {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .chanpterList li {
    position: relative;
  }

  .chanpterList p {
    float: left;
    font-size: 20px;
    margin: 10px 0;
    padding: 10px;
    height: 70px;
    line-height: 50px;
    width: 100%;
    border: 1px solid #DDD;
  }

  .chanpterList .acts {
    float: right;
    font-size: 14px;
  }

  .videoList {
    padding-left: 50px;
  }

  .videoList p {
    float: left;
    font-size: 14px;
    margin: 10px 0;
    padding: 10px;
    height: 50px;
    line-height: 30px;
    width: 100%;
    border: 1px dotted #DDD;
  }
</style>
