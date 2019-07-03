<template>
  <div>
    <h1 align="center">
      <strong>read</strong>
    </h1>
    <br />
    <b-container fluid>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-small">name:</label>
          <br />
          <br />
          <label for="input-small">address:</label>
          <br />
        </b-col>
        <b-col sm="10">
          <b-form-input id="input-small" v-model="name" size="sm"></b-form-input>
          <br />
          <b-form-input id="input-small" v-model="address" size="sm"></b-form-input>
        </b-col>
      </b-row>
    </b-container>
    <br />
    <div class="read-button">
      <h4 v-on:click="clickRead">
        <strong>read from mainnet</strong>
      </h4>
    </div>
    <img class="center" v-if="pendingRead" height="120px" id="loader" src="https://loading.io/spinners/lava-lamp/index.lava-lamp-preloader.gif">
    <div v-if="readEvent" align="left">
      successfully read {{ this.name }} contract at address <a :href="'https://etherscan.io/address/' + this.address" target="blank"> {{ this.address }} </a>
      <br />(made with eveem.org) <br/><br/>
      <pre>{{ json | pretty }}</pre>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "Read",

  data() {
    return {
      pendingRead: false,
      readEvent: false,
      name: "DSToken",
      address: "0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359",
      json: null
    };
  },

  methods: {
    clickRead() {
      this.pendingRead = true;
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

  },

  filters: {
    pretty: function(value) {
      return JSON.stringify(value, null, 2);
    }
  }
};
</script>

<style scoped>

  pre {
      white-space: pre-wrap;       /* Since CSS 2.1 */
      word-wrap: break-word;       /* Internet Explorer 5.5+ */
  }
  .read-button {
    padding: 10px;
    /* display: inline-block; */
    text-align: center;
    border: 1px solid black;
    height: 50px;
    width: 300px;
    margin: 20px auto;
    background-color: #bdc3c7;
  }

  .read-button:hover {
    background-color: #6d7b8d;
    color: #444444;
    box-shadow: 0px 0px #6d7b8d;
  }
</style>