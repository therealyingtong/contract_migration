import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../utils/getWeb3'

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
        }
    }
})