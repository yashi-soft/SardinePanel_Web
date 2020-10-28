import request from '@/utils/request'

export function getTree(data) {
  return request({
    url: '/sardlineMenu/queryAllMenu',
    method: 'post',
    data
  })
}
export function getList(roleId) {
  return request({
    url: '/sardlineRole/apiAndMenulist',
    method: 'post',
    data: { roleId }
  })
}
export function addMenu(data) {
  return request({
    url: '/sardlineMenu/addMenu',
    method: 'post',
    data
  })
}
export function editMenu(data) {
  return request({
    url: '/sardlineMenu/updateMenu',
    method: 'post',
    data
  })
}
export function deleteMenu(data) {
  return request({
    url: '/sardlineMenu/deleteMenu',
    method: 'post',
    data
  })
}
export function addApi(data) {
  return request({
    url: '/sardlineApi/addApi',
    method: 'post',
    data
  })
}
export function editApi(data) {
  return request({
    url: '/sardlineApi/updateApi',
    method: 'post',
    data
  })
}
export function deleteApi(data) {
  return request({
    url: '/sardlineApi/deleteApi',
    method: 'post',
    data
  })
}
export function getApi(id) {
  return request({
    url: '/sardlineApi/selectOne',
    method: 'get',
    params: { id }
  })
}

