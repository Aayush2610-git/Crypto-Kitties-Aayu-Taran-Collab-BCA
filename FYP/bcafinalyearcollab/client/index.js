var web3=new Web3(Web3.givenProvider);
//the url to whatever eth node wwe have
//and luckily we have metamask so we don't have to provide link ourselves
//instead we write givenprovider  this will take whatever provider we get from metamask like testnet,local node,real eth blockchaion.. 
//it will take that and access the blockchain
var instance;
//contract instance
var user;
var contractAddress="";

$(document).ready(function(){
    //whenever we use metamask we need to call metamask enable function
    //it will prompt the user to allow our website to use their metamask acc to interact with the blockchain
    //our account in metamask will have 1 single address always
    //abi is the summary of everything that a contract does
    window.etherum.enable().then(function(accounts){
        instance=new web3.eth.Contract(abi,contractAddress,{from:accounts[0]})
        user=accounts[0];
        console.log(instance);
    })
})