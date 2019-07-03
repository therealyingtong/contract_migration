let state = {
    web3: {
        isInjected: false,
        web3Instance: null,
        networkId: null,
        coinbase: null,
        balance: null,
        error: null
    },

    chainId: {
        1: "mainnet",
        3: "ropsten",
        4: "rinkeby",
        5: "gorli",
        6: "kotti",
        30: "RSK",
        42: "kovan",
        62: "ETC",
        99: "POA",
        100: "xDAI"
    },
    
    contractInstance: null,
    provingKey: null
}
export default state