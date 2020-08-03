import request from '@/utils/request'

export default {
  getTeacherListPage(curpage, pagesize, teacherquery) {
    return request({
      url: `/edu/teacher/pageTeacherConditions/${curpage}/${pagesize}`,
      method: 'post',
      data: teacherquery
    })
  }
}
