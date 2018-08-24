import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Loan from '../../../ethereum/loan';
import RequestRow from '../../../components/RequestRow';

class WithdrawalIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const loan = Loan(address);
    withdrawalsCount = await loan.methods.getWithdrawalsCount().call();
    //const approversCount = await campaign.methods.approversCount().call();

    const withdrawals = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return loan.methods.withdrawals(index).call();
        })
    );

    return { address, withdrawals, requestCount, approversCount };
  }

  renderRows() {
    return this.props.withdrawals.map((withdrawal, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
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
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.requestCount} requests.</div>
      </Layout>
    );
  }
}

export default WithdrawalIndex;