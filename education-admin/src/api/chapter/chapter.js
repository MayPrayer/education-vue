import request from '@/utils/request'

export default {

  //查询当前课程所有章节及小结信息
  getAllChapter(courseid) {
    return request({
      url: `/edu/chapter/getchapter/`+courseid,
      method: 'get'
    })
  },
  //添加章节信息
  addchapter(chapter) {
    return request({
      url: '/edu/chapter/addchapter',
      method: 'post',
      data: chapter
    })
  },
  //修改章节信息
  updatechapter(chapter) {
    return request({
      url: `/edu/chapter/updatechapter`,
      method: 'post',
      data: chapter
    })
  },
  //根据章节id查询当前章节信息
  findChapter(chapterid) {
    return request({
      url: `/edu/chapter/getOnechapter/` + chapterid,
      method: 'get'
    })
  },
//根据章节id删除当前章节信息
  deleteChapter(chapterid) {
    return request({
      url: `/edu/chapter/` + chapterid,
      method: 'delete'
    })
  }
}
