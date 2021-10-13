import request from '@/utils/request'

export function listAll(data) {
  return request({
    url: '/listAllProperty',
    method: 'post',
    data
  })
}
export function addProperty(data) {
  return request({
    url: '/add-property',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: `/profile/${token}`,
    method: 'get'
  })
}
