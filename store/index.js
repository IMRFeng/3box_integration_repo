import Vuex from 'vuex'
import Box from '3box'

const createStore = () => {
  // noinspection JSValidateTypes
  return new Vuex.Store({
    state: () => ({
      networkVersion: undefined,
      defaultAccount: undefined,
      box: undefined,
      profile: undefined
    }),

    mutations: {
      updateDefaultAccData(state, defaultAcc) {
        state.defaultAccount = defaultAcc
      },
      updateBoxData(state, box) {
        state.box = box
      },
      updateProfileData(state, profile) {
        state.profile = profile
      }
    },

    actions: {
      initialization({ commit }) {
        window.ethereum
          .enable()
          .then(addresses => {
            commit('updateDefaultAccData', addresses[0])
          })
          .catch(reason => {
            console.error(reason === 'User rejected provider access')
          })

        window.ethereum.on('accountsChanged', accounts => {
          commit('updateDefaultAccData', accounts[0])
        })
      },

      initializeBox({ commit, state, dispatch }, onComplete) {
        const syncComplete = res => {
          dispatch('updateProfileData')
          onComplete()
        }

        Box.openBox(state.defaultAccount, window.ethereum, {}).then(box => {
          console.log(box)
          commit('updateBoxData', box)
          box.onSyncDone(syncComplete)
        })
      },

      updateProfileData({ commit, state }) {
        // state.box.public.all().then(profile => {
        //   console.log(`The profile is ${JSON.stringify(profile)}`)
        //   commit('updateProfileData', profile)
        // })

        Box.getProfile(state.defaultAccount, {}).then(profile => {
          commit('updateProfileData', profile)
          console.log(`The profile is  ${JSON.stringify(profile)}`)
          Object.entries(profile).map(kv => {
            console.log(`>> ${kv[0]} : ${JSON.stringify(kv[1])}`)
          })
        })
      }
    }
  })
}

export default createStore
