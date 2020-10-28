import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
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

export function getMenus(token) {
  return request({
    url: '/vue-element-admin/menus',
    method: 'get',
    params: { token }
  })
}
