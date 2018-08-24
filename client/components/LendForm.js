import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Loan from '../ethereum/loan';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class LendForm extends Component {
	state = {
		errorMessage: '',
		loading: false
	};

	onSubmit = async event => {
		event.preventDefault();
		const loan = Loan(this.props.address);
		//const summary = await loan.methods.getSummary().call();
		//const principal = summary[3];
		const principal = await loan.methods.loanAmount().call();
		console.log(principal);
		this.setState({ loading: true, errorMessage: '' });

		try {
			const accounts = await web3.eth.getAccounts();
			
			await loan.methods.lend().send({
				from: accounts[0],
				value: principal,
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
				<Button primary loading={this.state.loading}>Lend</Button>
			</Form>
		)
	}
}

export default LendForm;