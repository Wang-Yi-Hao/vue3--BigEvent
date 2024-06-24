import request from '@/utils/request'

export const userRegisterService = (user) => {
  return request.post('/api/reg', {
    ...user
  })
}
