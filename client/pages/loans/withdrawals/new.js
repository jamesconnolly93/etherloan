import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Loan from '../../../ethereum/loan';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';

class WithdrawalNew extends Component {
	state= {
		value: '',
		purpose: '',
		recipient: '',
		loading: false,
		errorMessage: ''
	};

	static async getInitialProps(props) {
		const { address } = props.query;
		return { address };
	}

	onSubmit = async event => {
		event.preventDefault();

		const loan = Loan(this.props.address);
		const { purpose, value, recipient } = this.state

		this.setState({ loading: true, errorMessage: '' });

		try {
			const accounts = await web3.eth.getAccounts();
			await loan.methods.createWithdrawal(purpose, web3.utils.toWei(value, 'ether'), recipient).send({
				from: accounts[0]
			});
			Router.pushRoute(`/loans/${this.props.address}/withdrawals`);
		} catch (err){
			this.setState({ errorMessage: err.message });
		}

		this.setState({ loading: false });
	};
	render() {
		return (
			<Layout>
				<Link route={`/loans/${this.props.address}/withdrawals`}>
				<a>Back</a>
				</Link>
				<h3>Request to Withdraw Funds</h3>
				<p>This form is to be completed by the borrower when they want to actually access the funds. They can ask for all or part of the full loan, provide a reason and then once the lender approves their request, they can come back and finalize the withdrawal.</p>
				<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
					<Form.Field>
						<label>Purpose (i.e. What will the funds be used for)</label>
						<Input 
							value={this.state.purpose}
							onChange={event => this.setState({ purpose: event.target.value })}
						/>
					</Form.Field>
					<Form.Field>
						<label>Value in Ether</label>
						<Input 
							value={this.state.value}
							onChange={event => this.setState({ value: event.target.value })}
						/>
					</Form.Field>
					<Form.Field>
						<label>Recipient</label>
						<Input 
							value={this.state.recipient}
							onChange={event => this.setState({ recipient: event.target.value })}
						/>
					</Form.Field>

					<Message error header = "Oops!" content={this.state.errorMessage}/>
					<Button primary loading={this.state.loading}>Create!</Button>
				</Form>
			</Layout>
		);
	}
}

export default WithdrawalNew;