import web3 from './web3';
import LoanFactory from './build/LoanFactory.json';

const instance = new web3.eth.Contract(
	JSON.parse(LoanFactory.interface),
	'0x5ddde9a0fd0a3acffcbb933587d772587d8f0f57'
);

export default instance;