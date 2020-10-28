import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(username) {
  return request({
    url: '/user/queryUser',
    method: 'post',
    data: { username }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function modifyPassword(data) {
  console.log(data)
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getMenus(roleId) {
  return request({
    url: '/sardlineMenu/list',
    method: 'post',
    data: { roleId }
  })
}

export function fetchList(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/user/deleteUser',
    method: 'post',
    data
  })
}

export function editUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function resetPassword(data) {
  return request({
    url: '/sysuser/resetPassword',
    method: 'post',
    data
  })
}

export function listPage(data) {
  return request({
    url: '/sysuser/listPage',
    method: 'post',
    data
  })
}

export function getRoles(data) {
  return request({
    url: '/sardlineRole/roleList',
    method: 'post',
    data
  })
}

export function setRoles(data) {
  return request({
    url: '/user/setRoles',
    method: 'post',
    data
  })
}

export function getOrgan(data) {
  return request({
    url: '/sardlineOrganization/orgList',
    method: 'post',
    data
  })
}

export function setOrgs(data) {
  return request({
    url: '/user/setOrgs',
    method: 'post',
    data
  })
}

