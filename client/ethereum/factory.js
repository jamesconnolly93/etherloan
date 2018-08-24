import web3 from './web3';
import LoanFactory from './build/LoanFactory.json';

const instance = new web3.eth.Contract(
	JSON.parse(LoanFactory.interface),
	'0x62452c56e1f16c1231ada030a0ae27533ee596c4'
);

export default instance;