const Loan = artifacts.require('./Loan.sol');

contract('Loan', (accounts) => {
	let loan;

	beforeEach('Deploy a loan for testing', async function() {
		loan = await Loan.new("Loan for testing", 10, 1, accounts[0]);
	})

	it('Should store the correct parameters', async () => {
		
		const description = await loan.description.call();
		const loanAmount = await loan.loanAmount.call();
		const interest = await loan.interest.call();
		assert.equal(description,"Loan for testing","description not equal");
		assert.equal(loanAmount,10,"amount not equal");
		assert.equal(interest, 1," interest not equal");
	});

	it('Allows a user to lend the amount', async () => {
		await loan.lend({
			value: '10',
			gas: '2000000',
			from: accounts[1]
		});
		const lender = await loan.lender.call();
		assert.equal(lender, accounts[1],"lender not set");
	});

	it('Allows a borrower to repay the amount with interest', async () => {
		await loan.lend({
			value: '10',
			gas: '2000000',
			from: accounts[1]
		});
		await loan.repay({
			value: '11',
			gas: '2000000',
			from: accounts[0]
		});
		const repaid = loan.repaid.call();
		assert(repaid);
	});

	it('Allows the borrower to request a withdrawal', async () => {
		await loan.lend({
			value: '10',
			gas: '2000000',
			from: accounts[1]
		});
		await loan.createWithdrawal("test withdrawal", 1, accounts[0], {
			gas: '2000000',
			from: accounts[0]
		});
		const numberOfWithdrawals = await loan.getWithdrawalsCount.call(); 
		assert.equal(numberOfWithdrawals, 1, "withdrawal not created");
	});

	it('Allows the lender to approve a withdrawal and then lets borrower withdraw the correct amount', async () => {
		await loan.lend({
			value: '10',
			gas: '2000000',
			from: accounts[1]
		});
		await loan.createWithdrawal("test withdrawal", 1, accounts[0], {
			gas: '2000000',
			from: accounts[0]
		});
		await loan.approveWithdrawal(0, {
			gas: '2000000',
			from: accounts[1]
		});
		await loan.makeWithdrawal(0, {
			gas: '2000000',
			from: accounts[0]
		});
		const withdrawal = await loan.withdrawals(0);
		const withdrawalComplete = withdrawal[3];
		console.log(withdrawalComplete);
		assert(withdrawalComplete);
	});
})
