import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../utils/getWeb3'
import pollWeb3 from '../utils/pollWeb3'

Vue.use(Vuex)

/* eslint-disable */

export const store = new Vuex.Store({
    strict: false,
    state,
    mutations: {
        async registerWeb3Instance (state, payload) {
            // console.log('registerWeb3instance Mutation being executed', payload)
            let result = payload
            let web3Copy = state.web3
            web3Copy.coinbase = result.coinbase
            web3Copy.networkId = result.networkId
            web3Copy.balance = parseInt(result.balance, 10)
            web3Copy.isInjected = await result.injectedWeb3
            web3Copy.web3Instance = result.web3
            state.web3 = web3Copy
            pollWeb3()
        },

        pollWeb3Instance (state, payload) {
            // console.log('pollWeb3Instance mutation being executed', payload)
            state.web3.coinbase = payload.coinbase
            state.web3.balance = parseInt(payload.balance, 10)
        }


    },
    actions: {
        registerWeb3 ({commit}) {
            // console.log('registerWeb3 Action being executed')
            getWeb3.then(result => {
            //   console.log('committing result to registerWeb3Instance mutation', result)
              commit('registerWeb3Instance', result)
            }).catch(e => {
              console.log('error in action registerWeb3', e)
            })
        },

        pollWeb3 ({commit}, payload) {
            // console.log('pollWeb3 action being executed')
            commit('pollWeb3Instance', payload)
        }

    }
})