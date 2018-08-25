import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Loan from '../../../ethereum/loan';
import WithdrawalRow from '../../../components/WithdrawalRow';

class WithdrawalIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const loan = Loan(address);
    const withdrawalsCount = await loan.methods.getWithdrawalsCount().call();
    //const approversCount = await campaign.methods.approversCount().call();

    const withdrawals = await Promise.all(
      Array(parseInt(withdrawalsCount))
        .fill()
        .map((element, index) => {
          return loan.methods.withdrawals(index).call();
        })
    );

    return { address, withdrawals, withdrawalsCount };
  }

  renderRows() {
    return this.props.withdrawals.map((withdrawal, index) => {
      return (
        <WithdrawalRow
          key={index}
          id={index}
          withdrawal={withdrawal}
          address={this.props.address}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3>Withdrawal history and approvals</h3>
        <Link route={`/loans/${this.props.address}/withdrawals/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>
              Withdraw Funds
            </Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Reason</HeaderCell>
              <HeaderCell>Amount (ETH)</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approved</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.withdrawalsCount} requests.</div>
      </Layout>
    );
  }
}

export default WithdrawalIndex;