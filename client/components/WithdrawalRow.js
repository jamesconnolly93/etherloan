import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Loan from '../ethereum/loan';

class WithdrawalRow extends Component {
  onApprove = async () => {
    const loan = Loan(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await loan.methods.approveWithdrawal(this.props.id).send({
      from: accounts[0]
    });
  };

  onFinalize = async () => {
    const loan = Loan(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await loan.methods.makeWithdrawal(this.props.id).send({
      from: accounts[0]
    });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, withdrawal } = this.props;
    const readyToWithdraw = withdrawal.approved;

    return (
      <Row
        disabled={withdrawal.complete}
        positive={readyToWithdraw && !withdrawal.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{withdrawal.purpose}</Cell>
        <Cell>{web3.utils.fromWei(withdrawal.value, 'ether')}</Cell>
        <Cell>{withdrawal.recipient}</Cell>
        <Cell>
          {withdrawal.approved.toString()}
        </Cell>
        <Cell>
          {withdrawal.complete ? null : (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {withdrawal.complete ? null : (
            <Button color="teal" basic onClick={this.onFinalize}>
              Withdraw Funds
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default WithdrawalRow;