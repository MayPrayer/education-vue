import request from '@/utils/request'

export default {
  //获取分页教师数据
  getTeacherListPage(curpage, pagesize, teacherquery) {
    return request({
      url: `/edu/teacher/pageTeacherConditions/${curpage}/${pagesize}`,
      method: 'post',
      data: teacherquery
    })
  },

  // 根据id删除教师数据
  deleteTeacherById(teacherId) {
    return request({
      url: `/edu/teacher/${teacherId}`,
      method: 'delete'
    })
  }
}
