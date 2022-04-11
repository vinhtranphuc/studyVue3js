import axios from 'axios'
const baseDomain = process.env.VUE_APP_BASE_API_AUTH
const baseURL = `${baseDomain}`
import router from '@/router'
import store from '@/store'
import Utils from '@/utils/Utils'
import Constants from '@/utils/Constants'
const instance = axios.create({
  baseURL: baseURL,
  withCredentials : true,
  // headers: {
  //   'Content-Type': 'application/json; charset=UTF-8',
  // }
})
instance.defaults.headers
instance.interceptors.request.use(
  (config) => {
    // trigger 'loading=true' event here
    store.dispatch('setLoading', true)
    
    const token = "Bearer " + localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },

  (error) => {
    // trigger 'loading=false' event here
    store.dispatch('setLoading', false)
    return Promise.reject(error);
  }
);


instance.interceptors.response.use(
  (res) => {
    store.dispatch('setLoading', false)
    return res.data;
  },
  async (err) => {
    store.dispatch('setLoading', false)
    localStorage.clear()
    if (err.response.status === 777 || err.response.status === 999 || err.response.status === 401 || err.response.status === 888) {
      router.replace({
        path: '/login',
        query: { redirect: router.currentRoute.fullPath }
      })
    }
    
    let errMsg = "システムエラーが発生しました。再度操作してください。";
    
    const timestamp = err.response.data.dataErr.account_lock_time
    const date = new Date(Number(timestamp));
    const difference = date.getTime() - new Date().getTime();
    const seconds = Math.ceil(difference / 1000 );
    const tryLoginCount = 5 - Number(err.response.data.dataErr.count_login_fail);
    switch (err.response.status) {
      case 777:
        errMsg = Constants.STATUS_MESS.SESSION_NOT_EXIST
        break;
      case 401:
        errMsg = Constants.STATUS_MESS.SESSION_NOT_EXIST
        break;
      case 999:
        errMsg = Constants.STATUS_MESS.USER_NOT_EXIST
        break;
      case 901:
        errMsg = Constants.STATUS_MESS.INCORRECT_USER.replace("{XX}", tryLoginCount) 
        break;
      case 902:
        errMsg = Constants.STATUS_MESS.LOCK_USER.replace("{XX}", seconds) 
        break;
      case 903:
        errMsg = Constants.STATUS_MESS.USER_INACTIVE
        break;
      case 904:
        errMsg = Constants.STATUS_MESS.USER_SUSPENDED
        break;
      default:
        process.env.NODE_ENV === 'development'
          ? err.response.status + "-" + err.response.data.message
          : "システムエラーが発生しました。再度操作してください。"
    }
    Utils.showToast(errMsg);
    return Promise.reject(err);
  }
);

// //HTTP response interceptor
// instance.interceptors.response.use(
//   response => {
//     // trigger 'loading=false' event here
//     store.dispatch('setLoading', false)

//     //Not logged in or session expired
//     if ('401' === response.data.statusCode) {//phan này để sau
//       //Redirect to login page
//       router.replace({
//         path: '/login',
//         query: {redirect: router.currentRoute.fullPath}
//       })
//     }
//     return response.data;
//   },
//   error => {
//     // trigger 'loading=false' event here
//     store.dispatch('setLoading', false)
//     console.log(error.response.status, error.response.data.message)
//     if (500 === error.response.data.statusCode) {
//       //Server exception  
//     }else if (412 === error.response.data.statusCode){
//       console.log(error.response.data.message)
//     }else if (error.response.status === 401 && err.response.data.message === "NotSession") {
//       router.replace({
//         path: '/login',
//         query: { redirect: router.currentRoute.fullPath }
//       })
//     }
//     return error
//   }
// );
export default instance
