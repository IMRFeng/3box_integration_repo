import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

const cookieStorage = {
  getItem: function(key) {
    return Cookies.getJSON(key)
  },
  setItem: function(key, value) {
    return Cookies.set(key, value, { expires: 3, secure: false })
  },
  removeItem: function(key) {
    return Cookies.remove(key)
  }
}

export default ({ store, isHMR, isServer, isClient }) => {
  window.onNuxtReady(nuxt => {
    createPersistedState({
      storage: cookieStorage,
      getState: cookieStorage.getItem,
      setState: cookieStorage.setItem
    })(store) // vuex plugins can be connected to store, even after creation
  })
}
