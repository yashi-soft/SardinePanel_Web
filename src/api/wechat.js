import request from '@/utils/request'

export function selectOne(data) {
  return request({
    url: '/sardineEnterpriseInfo/selectOne',
    method: 'get',
    params: data
  })
}

export function saveEnterpriseInfo(data) {
  return request({
    url: '/sardineEnterpriseInfo/saveEnterpriseInfo',
    method: 'post',
    data
  })
}
