import request from '@/utils/request'

export function getTree(data) {
  return request({
    url: '/sysdept/getTree',
    method: 'post',
    data
  })
}
export function addDept(data) {
  return request({
    url: '/sysdept/add',
    method: 'post',
    data
  })
}
export function editDept(data) {
  return request({
    url: '/sysdept/edit',
    method: 'post',
    data
  })
}
export function deleteDept(data) {
  return request({
    url: '/sysdept/delete',
    method: 'post',
    data
  })
}
