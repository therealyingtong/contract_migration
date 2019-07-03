axios = require('axios');

module.exports = function load_contract(address, name = address){
    
    const url = "http://eveem.org/code/" + address + ".json"
    axios.get(url)
    .then(function (response) {
        var json = JSON.stringify(response.data);
        console.log(name, 'successfully read')
        return json;
    })
    .catch(function (error) {
      console.log(error);
    });
    
}

