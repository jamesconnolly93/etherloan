const LoanFactory = artifacts.require('./LoanFactory.sol');
const Loan = artifacts.require('./Loan.sol');


contract('LoanFactory', (accounts) => {
	let loanFactory;

	beforeEach('Deploy a loan factory for testing', async function() {
		loanFactory = await LoanFactory.new("Loan Factory for testing");
		await loanFactory.createLoan("new loan for testing", 10, 1);
	})

	it('Should deploy a loan', async () => {
		deployedLoan = loanFactory.deployedLoans(0);
		assert(deployedLoan);
	});

	it('Stores an array of deployed loans', async () => {
		deployedLoans = loanFactory.deployedLoans(0);
		assert(deployedLoan);
	});

	it('Has a function to get a list of loans', async () => {
		deployedLoans = await loanFactory.getDeployedLoans.call();
		console.log(deployedLoans);
		numberOfLoans = deployedLoans.length;
		console.log(numberOfLoans);
		assert(numberOfLoans, 1, "wrong number")
	});

	it('Accepts the parameters needed for a loan', async () => {
		deployedLoans = await loanFactory.getDeployedLoans.call();
		loanAddress = deployedLoans[0];
		loan = await Loan.at(loanAddress);
		description = await loan.description;
		//console.log(loan.description);
		assert(description, "new loan for testing", "wrong description parameter");
	});

	it('Correctly assigns the borrower to a loan using msg.sender', async () => {
		deployedLoans = await loanFactory.getDeployedLoans.call();
		loanAddress = deployedLoans[0];
		loan = await Loan.at(loanAddress);
		borrower = await loan.borrower;
		//console.log(loan.description);
		assert(borrower, accounts[0], "wrong borrower");
	});
})

