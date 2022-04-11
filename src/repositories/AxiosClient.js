import axios from 'axios'
const baseDomain = process.env.VUE_APP_BASE_API
const baseURL = `${baseDomain}`

import store from '@/store'
import tokenService from '@/utils/service/token.service'
import authAxiosInstance from '@/repositories/AuthAxiosClient'
import Utils from '@/utils/Utils'
import router from '@/router'

const instance = axios.create({
  baseURL: baseURL,
  // withCredentials : true,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
})
let refreshTokenFlg = false
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

instance.interceptors.request.use(
  async (config) => {
    while (refreshTokenFlg && config.url != '/auth/refreshtoken') {
      await sleep(1)
    }
    return new Promise((resolve, reject) => {
      // trigger 'loading=true' event here
      store.dispatch('setLoading', true)

      const token = 'Bearer ' + localStorage.getItem('access_token')
      if (token) {
        config.headers['Authorization'] = token
        resolve(config)
      } else {
        reject()
      }
    })
  },

  (error) => {
    // trigger 'loading=false' event here
    store.dispatch('setLoading', false)

    return Promise.reject(error)
  },
)

// let isRefreshing = false
// let failedQueue = []
// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error)
//     } else {
//       prom.resolve(token)
//     }
//   })

//   failedQueue = []
// }
instance.interceptors.response.use(
  (res) => {
    store.dispatch('setLoading', false)
    return res.data
  },
  async (err) => {
    store.dispatch('setLoading', false)
    const originalConfig = err.config
    if (originalConfig.url !== '/auth/login' && err.response) {
      // Access Token was expired
      // if (true) {
      if (
        err.response.status === 401 &&
        err.response.data.message === 'TokenExpiredError' &&
        !originalConfig._retry
      ) {
        if (refreshTokenFlg) {
          // retry request
          return instance(originalConfig)
        }
        originalConfig._retry = true
        refreshTokenFlg = true
        try {
          const signature = tokenService.sign()
          const data = { signature: signature }
          const res = await authAxiosInstance.post('/auth/refreshtoken', data)
          if (res) {
            instance.defaults.headers.common['Authorization'] =
              'Bearer ' + res.data.access_token
            originalConfig.headers['Authorization'] =
              'Bearer ' + res.data.access_token
            tokenService.updateLocalAccessToken(res.data.access_token)
            tokenService.updateLocalRefreshToken(res.data.refresh_token)
            return instance(originalConfig)
          }
        } catch (_error) {
          // router.replace({
          //   path: '/login',
          //   query: { redirect: router.currentRoute.fullPath },
          // })
          return Promise.reject(_error)
        } finally {
          refreshTokenFlg = false
        }
      } else if (
        err.response.status === 400 &&
        err.response.data.message === 'UserLogout'
      ) {
        router.replace({
          path: '/login',
          query: { redirect: router.currentRoute.fullPath },
        })
      }
    }

    let errMsg = 'システムエラーが発生しました。再度操作してください。'
    switch (err.response.status) {
      case 409:
        errMsg = '指定されたメールアドレスは既に存在しています。'
        break
      case 400:
        if (err.response.data.message === 'UserLogout')
          errMsg = 'ユーザーがシステムからログアウトしました。'
        break
      default:
        process.env.NODE_ENV === 'development'
          ? err.response.status + '-' + err.response.data.message
          : 'システムエラーが発生しました。再度操作してください。'
    }
    Utils.showToast(errMsg)
    return Promise.reject(err)
  },
)

export default instance
