pragma solidity ^0.4.17;

// Open zeppelin Ownable contract is used via EthPM to ensure killswitch is only accesible to the contract deployer
import '../installed_contracts/zeppelin/contracts/ownership/Ownable.sol';

/** @title Loan Factory. */
contract LoanFactory is Ownable {
    // LoanFactory keeps track of an array of loans it has deployed and will not create new loans if paused by the circuit breaker
    address[] public deployedLoans;
    bool public paused;
    
    // Allow the owner to pause creation of new contracts
    function circuitbreaker() public onlyOwner {
        paused = true;
    }

    // Factory creates new loans, deploys them to network and stores address in an array
    function createLoan(string description, uint loanAmount, uint interest) public {
        require(!paused);
        address newLoan = new Loan(description, loanAmount, interest, msg.sender);
        deployedLoans.push(newLoan);
    }

    // Returns a full array of all deployed loans (default behaviour of Solidity is to require user to get array elements by index)
    function getDeployedLoans() public view returns (address[]) {
        return deployedLoans;
    }
}

contract Loan {
    // Struct used to store requests to withdraw funds from a loan
    struct Withdrawal {
        string purpose;
        uint value;
        address recipient;
        bool complete;
        bool approved;
    }

    // Initial variable instantiation
    Withdrawal[] public withdrawals;
    address public borrower;
    address public lender;
    string public description;
    uint public loanAmount;
    uint public interest;
    bool public repaid;
    uint public repaymentAmount;

    // Function modifier applied to functions that should only be called by the person who lent money to a loan
    modifier onlyLender() {
        require(msg.sender == lender);
        _;
    }
    
    // Function modifier applied to functions that should only be called by the person who borrowed money
    modifier onlyBorrower() {
        require(msg.sender == borrower);
        _;
    }

    // Basic constructor function to create a new loan
    constructor(string _description, uint _loanAmount, uint _interest, address _borrower) public {
        borrower = _borrower;
        loanAmount = _loanAmount;
        interest = _interest;
        description = _description;
        repaid = false;
        repaymentAmount = loanAmount + interest;
    }

    // Lend funds to a given loan, sets the caller as the lender, giving them all onlyLender privileges for this loan
    function lend() public payable {
        // Ensure nobdy already lent the money and that the lender is lending the correct amount
        require(lender == 0x0000000000000000000000000000000000000000);
        require(msg.value == loanAmount);
        
        lender = msg.sender;
    }
    
    // Allow borrower to repay the loan
    function repay() public payable {
        require(msg.value == repaymentAmount);
        lender.transfer(msg.value);
        repaid = true;
    }

    // Allow borrower to request to withdraw funds
    function createWithdrawal(string purpose, uint value, address recipient) public onlyBorrower {
        Withdrawal memory newWithdrawal = Withdrawal({
           purpose: purpose,
           value: value,
           recipient: recipient,
           complete: false,
           approved: false
        });

        withdrawals.push(newWithdrawal);
    }

    // Approve a request to withdraw funds (only lender can do this)
    function approveWithdrawal(uint index) public onlyLender {
        Withdrawal storage withdrawal = withdrawals[index];
        withdrawal.approved = true;
    }

   
    // Withdraw funds from the loan after approved (only borrower can do this) 
    function makeWithdrawal(uint index) public onlyBorrower {
        Withdrawal storage withdrawal = withdrawals[index];

        require(withdrawal.approved);
        require(!withdrawal.complete);

        withdrawal.recipient.transfer(withdrawal.value);
        withdrawal.complete = true;
    }

    // helper function to return some variables associated with the loan
    function getSummary() public view returns (
      string, uint, uint, uint, uint, bool, address
      ) {
        return (
          description,
          address(this).balance,
          loanAmount,
          interest,
          withdrawals.length,
          repaid,
          borrower
        );
    }

    // helper function to return the number of withdrawals associated with a loan, useful for looping through them on the front end
    function getWithdrawalsCount() public view returns (uint) {
        return withdrawals.length;
    }
}