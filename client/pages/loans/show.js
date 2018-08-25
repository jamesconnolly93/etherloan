import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Loan from '../../ethereum/loan';
import web3 from '../../ethereum/web3';
import LendForm from '../../components/LendForm';
import RepayForm from '../../components/RepayForm';
import { Link } from '../../routes';

class LoanShow extends Component {
	static async getInitialProps(props){
		const loan = Loan(props.query.address);
		const summary = await loan.methods.getSummary().call();
		// const loanAmount = await loan.methods.loanAmount.call();
		// const interest = await loan.methods.interest.call();
		console.log(summary);
		return {
			address: props.query.address,
			description: summary[0],
			balance: summary[1],
			loanAmount: summary[2],
			interest: summary[3],
			repaid: summary[5],
			borrower: summary[6],
		};
	}

	renderCards() {
		const {
			description,
			balance,
			loanAmount,
			interest,
			repaid,
			borrower,
		} = this.props;

		const items = [
			{
				header: borrower,
				meta: 'Address of the Borrower',
				description: 'Blame this person if you do not get repaid.',
				style: { overflowWrap: 'break-word'}
			},
			{
				header: description,
				meta: 'Description of purpose of loan',
				description: 'this is the reason this lender needed the loan.',
				style: { overflowWrap: 'break-word' }
			},
			{
				header: web3.utils.fromWei(loanAmount, 'ether'),
				meta: 'Loan Principal',
				description: 'The amount borrowed/requested to borrow.'
			},
			{
				header: web3.utils.fromWei(interest, 'ether'),
				meta: 'Loan Interest',
				description: 'The amount of ether that will be paid as interest'
			},
			{
				header: repaid.toString(),
				meta: 'Has the loan be repaid already?',
				description: 'Once the borrower has paid off the balance with interest, this will say TRUE.'
			},
			{
				header: web3.utils.fromWei(balance, 'ether'),
				meta: 'Outstanding balance (ether)',
				description: 'Amount of money still in the Loan contract.'
			}
		];

		return <Card.Group items={items} />;
	}

	render() {
		return (
			<Layout>
				<h4>Loan Overview and Status!</h4>
				<Grid>
					<Grid.Row>
						<Grid.Column width={10}>
							{this.renderCards()}
						</Grid.Column>
						<Grid.Column width={6}>
							<h4>Want to lend money to this guy?, click Lend!</h4>
							<p>Note: if button is grayed out, someone else beat you to it</p>
							<LendForm address={this.props.address} />
							<h4>Are you the borrower and want to repay your loan?, click Repay!</h4>
							<RepayForm address={this.props.address} />
							<h4>If you are the borrower or lender, click below to see pending and approved fund withdrawls</h4>
							<Link route={`/loans/${this.props.address}/withdrawals`}>
								<a>
									<Button primary>Make or Approve Withdrawls</Button>
								</a>
							</Link>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Layout>
		)
	}
}

export default LoanShow;