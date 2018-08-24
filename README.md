# EtherLoan Overview

#### General Description of the DApp

EtherLoan is a DApp created to allow users of the Ethereum network to lend ether to one another. This allows loan history to be stored on the blockchain in a decentralized manner, allowing borrowers to own their own credit history.

There are many features that I would have liked to add to this project, but as a minimal implementation, this allows users to borrow and lend money and has some basic controls to prevent untrusted parties from taking advantage of one another.

#### Installation

To install the repository on your local machine for testing purposes:

1. Clone this repository.
2. From the root project directory, `cd client` to get to the directory that holds the front end.
3. `npm install`

#### Running Tests

Tests for this project use the truffle framework and are written in JavaScript. The project has two contracts `LoanFactory` and `Loan`. To run these tests:

1. Compile the contracts using `truffle compile`.
2. Make sure you are running a local ganache-cli blockchain on port 8545.
3. Migrate the contracts with `truffle migrate`.
4. Run `truffle test`

*Note, if you are currently in the `./client` directory after following the installation steps, you will need to `cd` back into the project root directory before running the above.*

#### Running the Application

The front end of the application is configured by default to run using the instance of the DApp deployed to the Rinkeby test network. Please ensure you have Metamask installed, running and can connect to Rinkeby.

To access to DApp front-end in the browser:
1. From the project root directory `cd client`
2. Install dependencies with `npm install`
3. Serve the application by running `npm run dev`
4. In browser, navigate to `localhost:3000`

#### What the DApp does

This DApp, as metioned, allows users to lend ether to one another. The general workflow is as follows:

1. A potential borrower creates a new `Loan` contract. This actually happens behind the scenes by calling a method from the `LoanFactory` contract for reasons discussed in the Design Decisions/Avoiding Attacks files.
2. The loan contract specifies the reason the user wants a loan, the amount they wish to borrow as well as how much interest they are willing to pay.
3. Once the loan is created, potential lenders can browse the homepage of the site and click on loans they are interested in lending to.
4. If a lender finds a loan that appeals to them, they can lend the money to the borrower by clicking on that loan and then clicking the **Lend** button.
5. The `Loan` contract will now be funded with the amount of money the borrower had requested to borrow. The borrower, however, will not have access to these funds yet.
6. When the borrower wants to access some/all of the funds, they will have to submit a new withdrawal request. They can do this by navigating to the page that shows the details of their loan and clicking on the button the access the withdrawals page.
7. The borrower can enter a reason for accessing the funds (e.g. buying a piece of equipment) and the amount they want to withdraw at this point in time.
8. The lender then has to navigate to the withdrawals page and *Approve* the withdrawal, effectively giving the borrower permission to access a portion or all of the funds.
9. The borrower can now finalize the withdrawal from the same page and the funds will be transferred to them.
10. When the borrower is ready to repay the loan, all they have to do is click the **Repay** button on the loan page and the loan will be repayed automatically with the promised interest and marked as complete.

#### Interacting with the app

Within the DApp, there are two roles a user can take on (users are not limitted to one role of course). They can act either as **borrowers** or as **lenders**. The following will walk you through how each interacts with the DApp and the steps needed to achieve this.

When you launch the DApp, you will be taken to the homescreen which essentially provides a starting point for navigation and also lists all of the `Loans`.

For best experience, you will need to have at least two accounts configured in Metamask so you can switch between acting as the borrower and as the lender.

**Note: Please ensure you are connected to the Rinkeby network using Metamask**
