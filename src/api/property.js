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
export function editProperty(data) {
  return request({
    url: '/update-property',
    method: 'post',
    data
  })
}
export function buyProperty(data) {
  return request({
    url: '/purchase-property',
    method: 'post',
    data
  })
}

export function deleteProperty(data) {
  return request({
    url: '/remove-property',
    method: 'post',
    data
  })
}

export function myProperty() {
  return request({
    url: '/my-property',
    method: 'post'
  })
}
export function myBought() {
  return request({
    url: '/view-my-bought',
    method: 'post'
  })
}
export function getPropertyById(data) {
  return request({
    url: '/view-property-pid',
    method: 'post',
    data
  })
}
export function myFavorite() {
  return request({
    url: '/view-favorite',
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: `/profile/${token}`,
    method: 'get'
  })
}
