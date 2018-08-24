import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';


class loanIndex extends Component {
	static async getInitialProps() {
		const loans = await factory.methods.getDeployedLoans().call();
		const accounts = await web3.eth.getAccounts();
		return { loans, accounts }
	}

	renderAddress() {
		const account = this.props.accounts[0];
		console.log(account);
		return account;
	}

	renderloans() {
		const accounts = this.props.accounts[0];
		const items = this.props.loans.map(address => {
			return {
				header: address,
				description: (
					<Link route={`/loans/${address}`}>
					<a>View loan</a>
					</Link>
				),
				fluid: true
			};
		});

		return <Card.Group items={items} />;
	}


	render() {
		return (
			<Layout>
				<div>
					<p>Using web3 at {this.renderAddress()}</p>
					<h4>Open loans</h4>
					<Link route="/loans/new">
						<a>
							<Button
								floated="right"
								content="Create loan"
								icon="add circle"
								primary
							/>
						</a>
					</Link>
					{this.renderloans()}
				</div>
			</Layout>
		);
	}
}

export default loanIndex;