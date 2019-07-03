<template>

  <div>
      <br/><br/>
      <h4>1. read a contract from Ethereum mainnet</h4><br/>
      <h4>2. redeploy it on another chain⠀⠀⠀⠀⠀⠀⠀</h4>
      <br/><br/>
    <Metamask/><br/>
    <br />
    <b-container fluid>
      <b-row class="text-left">
        <b-col sm="2">
          <label for="input-small">name:</label>
          <br />
          <br />
          <label for="input-small">address:</label>
          <br />
          <br/>
          <label for="input-small">new chainID:</label>
          <br />     
        </b-col>
        <b-col sm="10">
          <b-form-input id="input-small" v-model="name" size="sm"></b-form-input>
          <br />
          <b-form-input id="input-small" v-model="address" size="sm"></b-form-input>
          <br />
          <b-form-input id="input-small" v-model="chainId" v-on:input="getChain" size="sm"></b-form-input>
          <br />
        </b-col>
      </b-row>
    </b-container>
    <br />
    <b-container >
    <b-row>
        <b-col>
            <div class="read-button">
            <h4 v-on:click="clickRead">
                <strong>read from mainnet</strong>
            </h4>
            </div>
        </b-col>
        <b-col>
            <div class="read-button">
            <h4 v-on:click="clickWrite">
                <strong>write to {{ chain }}</strong>
            </h4>
            </div>
        </b-col>    </b-row>
    </b-container>
    <img class="center" v-if="pendingRead" height="120px" id="loader" src="https://loading.io/spinners/lava-lamp/index.lava-lamp-preloader.gif">
    <div v-if="readEvent" align="left" style="margin: 15px 10px 15px 100px;">
      successfully read {{ this.name }} contract at <a :href="'https://etherscan.io/address/' + this.address" target="blank"> {{ this.address }} </a>
      <br /> bytecode: <br/>
      <pre> {{ bytecode }}</pre>
      <br />(decoded with eveem.org) <br/><br/>
      <pre>{{ json | pretty }}</pre>
    </div>
    <br/><br/>
  </div>

</template>

<script>
import Metamask from '@/components/Metamask'
const axios = require("axios");
var web3 = require('web3');

export default {
  name: "Main",
  beforeCreate () {
      // console.log('registerWeb3 Action dispatched from RollupNC.vue')
      this.$store.dispatch('registerWeb3')
  },
  
  computed: {
    web3() {
      return this.$store.state.web3;
    },
    chain() {
      return this.$store.state.chainId;
    }
  },
  
  data() {
    return {
      pendingRead: false,
      readEvent: false,
      name: "DSToken",
      address: "0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359",
      json: null,
      bytecode: null,
      web3provider: "https://mainnet.infura.io/v3/73c7b6df9ad24664bb7cfdfafbec3c3d",  
      chainId: this.$store.state.web3.networkId,
      chain: this.$store.state.chainId[this.$store.state.web3.networkId]
    };
  },

  methods: {
    clickRead() {
      this.pendingRead = true;

      web3 = new Web3(new Web3.providers.HttpProvider(this.web3provider));
      web3.eth.getCode(this.address, (error, result) => {
        if (!error){
          this.readEvent = true;
          this.pendingRead = false;
          this.bytecode = result;
        } else {
          console.log(error)
        }
      })
      const url = "http://eveem.org/code/" + this.address + ".json";
      axios.get(url)
      .then(response => {
          this.readEvent = true;
          this.pendingRead = false;
          this.json = response.data;
      })
      .catch(function(error) {
          console.log(url)
          console.log(error);
      });
    },
    
    clickWrite(){

    },

    getChain(id){
      this.chain = this.$store.state.chainId[id]
    }

  },

  filters: {
    pretty: function(value) {
      return JSON.stringify(value, null, 2);
    },

    // truncate: function(string) {
    //   return string.substring(1,200) + "..."
    // }
  },

    components: {
    'Metamask': Metamask
    }
};
</script>

<style scoped>

  pre {
    max-height: 300px;
    white-space: pre-wrap;       /* Since CSS 2.1 */
    white-space: -moz-pre-wrap !important;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
    width: 80%;
    overflow: auto;
    border: 1px solid #aaa;
    padding-left: 10;
    margin: 15px 10px 15px 100px;
  }
  .read-button {
    padding: 10px;
    /* display: inline-block; */
    text-align: center;
    border: 1px solid black;
    height: 50px;
    width: 300px;
    margin: 20px auto;
    background-color: #FFDFCC;
  }

  .read-button:hover {
    background-color: #ffc999;
    color: #444444;
    box-shadow: 0px 0px #ffc999;
  }
</style>