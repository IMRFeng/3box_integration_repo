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
        console.log(`The whole profile is ${JSON.stringify(profile)}`)
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
          dispatch('loadProfileData', onComplete)
        }

        Box.openBox(state.defaultAccount, window.ethereum, {}).then(
          async box => {
            console.log(box)
            commit('updateBoxData', box)
            box.onSyncDone(syncComplete)
          }
        )
      },

      loadProfileData({ commit, state }, onComplete) {
        // state.box.public.all().then(profile => {
        //   console.log(`The profile is ${JSON.stringify(profile)}`)
        //   commit('updateProfileData', profile)
        // })

        Box.getProfile(state.defaultAccount, {}).then(async profile => {
          console.log(`The profile is ${JSON.stringify(profile)}`)
          const email = await state.box.private.get('email')
          const phoneNumber = await state.box.private.get(
            'linked-ref.phoneNumber'
          )
          commit('updateProfileData', { email, phoneNumber, ...profile })

          typeof onComplete === 'function' ? onComplete() : undefined

          // console.log(`The profile is  ${JSON.stringify(profile)}`)
          Object.entries(profile).map(kv => {
            console.log(`>> ${kv[0]} : ${JSON.stringify(kv[1])}`)
          })
        })
      },
      async updateProfileData({ state, commit }, newProfile) {
        await state.box.public.set('name', newProfile.name)
        await state.box.public.set('location', newProfile.location)
        await state.box.public.set('school', newProfile.school)
        await state.box.public.set(
          'linked-ref.department',
          newProfile.department
        )
        await state.box.public.set('linked-ref.hireDate', newProfile.hireDate)
        await state.box.public.set('linked-ref.dob', newProfile.DoB)
        await state.box.public.set('linked-ref.gender', newProfile.gender)
        await state.box.private.set('email', newProfile.email)
        await state.box.private.set(
          'linked-ref.phoneNumber',
          newProfile.phoneNumber
        )
      }
    }
  })
}

export default createStore
