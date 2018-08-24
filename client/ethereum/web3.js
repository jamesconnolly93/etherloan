import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
	// In the browser and Metamask is running
	web3 = new Web3(window.web3.currentProvider);
} else {
	// We are on the server or user not running metamask
	const provider = new Web3.providers.HttpProvider(
		'https://ropsten.infura.io/nYLmNb8gXG3f5tptJsem'
	);
	web3 = new Web3(provider);
}

export default web3;