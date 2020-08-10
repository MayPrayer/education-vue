import request from '@/utils/request'

export default {
  getChapterByCId(courseid) {
    return request({
      url: `/edu/chapter/getchapter/{courseid}`,
      method: 'get'
    })
  }
}
