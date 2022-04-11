export default {
  state: () => ({
    isLoading: false,
    msgList: [],
    storageInfo: {
      usedSize: 0,
      limitStorage: 0,
      duration: 0,
      isShow: false,
    },
  }),

  getters: {
    checkLoading(state) {
      return state.isLoading
    },
    getStorageInfo(state) {
      return state.storageInfo
    },
  },

  mutations: {
    SET_LOADING(state, payload) {
      state.isLoading = payload
    },
    SET_TOAST_MSG(state, payload) {
      state.msgList.push(payload)
    },
    SET_STORAGE_INFO(state, data) {
      state.storageInfo.usedSize = data.usedSize
      state.storageInfo.limitStorage = data.limitStorage
      state.storageInfo.duration = data.duration
      state.storageInfo.isShow = data.isShow
    },
  },

  actions: {
    setLoading({ commit }, data) {
      commit('SET_LOADING', data)
    },
    setToastMsg({ commit }, data) {
      commit('SET_TOAST_MSG', data)
    },
    setStorage({ commit }, data) {
      commit('SET_STORAGE_INFO', data)
    },
  },
}
