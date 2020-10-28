import request from '@/utils/request'

export function fetchwgList(data) {
  return request({
    url: '/smart/f/smart/smartGrid/selectGridListByPid',
    method: 'post',
    data
  })
}
export function selectGridList(data) {
  return request({
    url: '/smart/f/smart/smartGrid/selectGridList',
    method: 'post',
    data
  })
}
export function insertGrid(data) {
  return request({
    url: '/smart/f/smart/smartGrid/insertGrid',
    method: 'post',
    data
  })
}
export function updateGrid(data) {
  return request({
    url: '/smart/f/smart/smartGrid/updateGrid',
    method: 'post',
    data
  })
}
export function deleteGrid(data) {
  return request({
    url: '/smart/f/smart/smartGrid/deleteGrid',
    method: 'post',
    data
  })
}
export function selectGridDetail(data) {
  return request({
    url: '/smart/f/smart/smartGrid/selectGridDetail',
    method: 'post',
    data
  })
}
export function listForGrid(query) {
  return request({
    url: '/smart/f/back/household/listForGrid',
    method: 'get',
    params: query
  })
}
export function selectGridUserDetail(data) {
  return request({
    url: '/smart/f/smart/smartGrid/selectGridUserDetail',
    method: 'post',
    data
  })
}
export function selectGridUserList(data) {
  return request({
    url: '/smart/f/smart/smartGrid/selectGridUserList',
    method: 'post',
    data
  })
}
export function insertGridUser(data) {
  return request({
    url: '/smart/f/smart/smartGrid/insertGridUser',
    method: 'post',
    data
  })
}
export function saveGridUser(data) {
  return request({
    url: '/smart/f/smart/smartGrid/saveGridUser',
    method: 'post',
    data
  })
}
export function updateSetGrid(data) {
  return request({
    url: '/smart/f/smart/smartGrid/updateSetGrid',
    method: 'post',
    data
  })
}
export function selectAdministrativeListByGrid(data) {
  return request({
    url: '/smart/f/smart/smartGrid/selectAdministrativeListByGrid',
    method: 'post',
    data
  })
}
export function selectGridListNew(query) {
  return request({
    url: '/smart/f/smart/smartGrid/selectGridListNew',
    method: 'get',
    params: query
  })
}
export function statisticsGridList(query) {
  return request({
    url: '/smart/f/smart/smartGrid/selectGridIntegralNew',
    method: 'get',
    params: query
  })
}
