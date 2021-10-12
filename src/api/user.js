import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
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
export function setInfo(token, data) {
  return request({
    url: `/profile/${token}`,
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
export function register(data) {
  return request({
    url: '/register/user',
    method: 'post',
    data
  })
}
export function regAdmin(data) {
  return request({
    url: '/register/admin',
    method: 'post',
    data
  })
}
export function regEmployee(data) {
  return request({
    url: '/register/employee',
    method: 'post',
    data
  })
}
export function regEmployer(data) {
  return request({
    url: '/register/employer',
    method: 'post',
    data
  })
}
