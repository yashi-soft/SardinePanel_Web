import request from '@/utils/request'

export function getOrgList(orgName) {
  return request({
    url: '/sardlineOrganization/orgTree',
    method: 'get',
    params: { orgName }
  })
}
export function addOrgan(data) {
  return request({
    url: '/sardlineOrganization/addOrg',
    method: 'post',
    data
  })
}
export function editOrgan(data) {
  return request({
    url: '/sardlineOrganization/updateOrg',
    method: 'post',
    data
  })
}
export function deleteOrgan(data) {
  return request({
    url: '/sardlineOrganization/delete',
    method: 'post',
    data
  })
}

