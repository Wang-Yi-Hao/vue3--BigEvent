import request from '@/utils/request'

// 注册
export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', {
    username,
    password,
    repassword
  })
}

// 登录
export const userLoginService = ({ username, password }) => {
  return request.post('/api/login', {
    username,
    password
  })
}

// 获取用户信息
export const userGetInfoService = () => request.get('/my/userinfo')

// 更新用户信息
export const userSetInfoService = (form) => request.put('/my/userinfo', form)

// 更新用户头像
export const userSetavatarService = (avatar) => request.patch('/my/update/avatar', { avatar })

// 更新用户密码
export const userSetpwdService = (pwdForm) => request.patch('/my/updatepwd', { ...pwdForm })
