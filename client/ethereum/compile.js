const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const loanPath = path.resolve(__dirname, 'contracts', 'LoanFactory.sol');
const source = fs.readFileSync(loanPath, 'utf8');
const output = solc.compile(source, 2).contracts;
console.log(output);

fs.ensureDirSync(buildPath);

for (let contract in output) {
	fs.outputJsonSync(
		path.resolve(buildPath, contract.replace(':', '') + '.json'),
		output[contract]
	);
}