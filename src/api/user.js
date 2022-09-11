// export function login(url, parameter) {
//   return axios({
//     url: url,
//     method: "post",
//     data: parameter,
//   });
// }
import request from '@/utils/request'
// import store from "@/store";
export const login = (data) => {
  return request({ method: 'POST', url: 'v1_0/authorizations', data })
}

export const getCode = (mobile) => {
  return request({ method: 'get', url: `/v1_0/sms/codes/${mobile}` })
}

export const getUserinfo = () => {
  return request({
    method: 'get',
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`,
    // },
  })
}
