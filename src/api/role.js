import request from '@/utils/request'

export function getMenu(roleId) {
  return request({
    url: '/sardlineRole/apiAndMenulist',
    method: 'post',
    data: { roleId }
  })
}

export function getRoles(query) {
  return request({
    url: '/sardlineRole/listForPage',
    method: 'get',
    params: query
  })
}

export function addRole(data) {
  return request({
    url: '/sardlineRole/addRole',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/sardlineRole/updateRole',
    method: 'post',
    data
  })
}

export function deleteRole(roleId) {
  return request({
    url: '/sardlineRole/delete',
    method: 'post',
    data: { roleId }
  })
}

export function getOrgList(orgName) {
  return request({
    url: '/sardlineOrganization/orgTree',
    method: 'get',
    params: { orgName }
  })
}
