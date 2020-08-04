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
  },

  //添加一个教师信息
  addOneTeacher(teacherinfo) {
    return request({
      url: `/edu/teacher/addTeacher`,
      method: 'post',
      data: teacherinfo
    })
  },

  //根据id查询一个教师详细信息
  getOneTeacherByID(id){
    return request({
      url: `/edu/teacher/${id}`,
      method: 'get'
    })
  },
  //修改教师信息
  updateOneTeacher(teacherinfo){
    return request({
      url: `/edu/teacher/modifTeacher`,
      method: 'post',
      data: teacherinfo
    })
  }

}
