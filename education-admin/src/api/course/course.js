import request from '@/utils/request'

export default {
  addCourse(courseInfo) {
    return request({
      url: '/edu/course/addcourse',
      method: 'post',
      data: courseInfo
    })
  },
  findCourse(courseid) {
    return request({
      url: '/edu/course/findcourse/' + courseid,
      method: 'get'
    })
  },
  UpdateCourse(courseInfo) {
    return request({
      url: '/edu/course/updatecourse',
      method: 'post',
      data: courseInfo
    })
  }
}
