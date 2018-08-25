import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class LoanNew extends Component {
	state = {
		description: '',
		loanAmount: '',
		interest: '',
		errorMessage: '',
		loading: false
	};

	onSubmit = async (event) => {
		event.preventDefault();

		this.setState({ loading: true, errorMessage: ''  });
		
		try{
			const accounts = await web3.eth.getAccounts();

			await factory.methods
				.createLoan(this.state.description, this.state.loanAmount, this.state.interest)
				.send({
					from: accounts[0]
			});
			Router.pushRoute('/');
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}

		this.setState({ loading: false});
	};
	render() {
		return (
			<Layout>
				<h4>Request a Loan</h4>
				<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
					<Form.Field>
						<label>Reason for taking a loan</label>
						<Input 
							value={this.state.description}
							onChange={event => this.setState({ description: event.target.value })}
						/>
					</Form.Field>
					<Form.Field>
						<label>Amount you want to borrow</label>
						<Input 
							label="wei" 
							labelPosition="right"
							value={this.state.loanAmount}
							onChange={event => this.setState({ loanAmount: event.target.value})}
						/>
					</Form.Field>
					<Form.Field>
						<label>Amount of interest you are offering to pay</label>
						<Input 
							label="wei" 
							labelPosition="right"
							value={this.state.interest}
							onChange={event => this.setState({ interest: event.target.value })}
						/>
					</Form.Field>
					<Message error header="Oops!" content= {this.state.errorMessage} />
					<Button loading={this.state.loading} primary>Submit Request</Button>
				</Form>
			</Layout>
		);
	}
}

export default LoanNew;
