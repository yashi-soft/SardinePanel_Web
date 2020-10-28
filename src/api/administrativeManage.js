import request from '@/utils/request'

export function fetchxzList(data) {
  return request({
    url: '/smart/f/smart/smartAdministrative/selectAdministrativeListInfo',
    method: 'post',
    data
  })
}
export function fetchxzListTwo(data) {
  return request({
    url: '/smart/f/smart/smartAdministrative/selectVillageListInfo',
    method: 'post',
    data
  })
}
export function fetchChidList(data) {
  return request({
    url: '/smart/f/smart/smartAdministrative/selectAdministrativeListInfoByPid',
    method: 'post',
    data
  })
}
export function selectAdministrativeList(data) {
  return request({
    url: '/smart/f/smart/smartAdministrative/selectAdministrativeList',
    method: 'post',
    data
  })
}
export function insertAdministrative(data) {
  return request({
    url: '/smart/f/smart/smartAdministrative/insertAdministrative',
    method: 'post',
    data
  })
}
export function updateAdministrative(data) {
  return request({
    url: '/smart/f/smart/smartAdministrative/updateAdministrative',
    method: 'post',
    data
  })
}
export function selectAdministrativeDetail(data) {
  return request({
    url: '/smart/f/smart/smartAdministrative/selectAdministrativeDetail',
    method: 'post',
    data
  })
}
export function deleteAdministrative(data) {
  return request({
    url: '/smart/f/smart/smartAdministrative/deleteAdministrative',
    method: 'post',
    data
  })
}
export function selectAdministrativeListByPid(data) {
  return request({
    url: '/smart/f/smart/smartAdministrative/selectAdministrativeListByPid',
    method: 'post',
    data
  })
}
