import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Loan from '../ethereum/loan';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class RepayForm extends Component {
	state = {
		errorMessage: '',
		loading: false
	};

	onSubmit = async event => {
		event.preventDefault();
		const loan = Loan(this.props.address);
		// const principal = await web3.toBigNumber(loan.methods.loanAmount().call());
		// const interest = await web3.toBigNumber(loan.methods.interest().call());
		const repaymentAmount = await loan.methods.repaymentAmount.call();
		this.setState({ loading: true, errorMessage: '' });

		try {
			const accounts = await web3.eth.getAccounts();
			
			await loan.methods.repay().send({
				from: accounts[0],
				value: repaymentAmount,
				gas: '2000000'
			});
			console.log('replacing route...');
			Router.replaceRoute(`/loans/${this.props.address}`);
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}

		this.setState({ loading: false, value: '' });
	}
	render() {
		return (
			<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
				<Message error header="Oops!" content= {this.state.errorMessage} />
				<Button primary loading={this.state.loading}>Repay</Button>
			</Form>
		)
	}
}

export default RepayForm;