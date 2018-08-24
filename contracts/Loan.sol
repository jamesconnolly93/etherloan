pragma solidity ^0.4.17;

contract Loan {
    struct Withdrawal {
        string purpose;
        uint value;
        address recipient;
        bool complete;
        bool approved;
    }

    Withdrawal[] public withdrawals;
    address public borrower;
    address public lender;
    string public description;
    uint public loanAmount;
    uint public interest;
    bool public repaid;
    uint public repaymentAmount;

    modifier onlyLender() {
        require(msg.sender == lender);
        _;
    }
    
    modifier onlyBorrower() {
        require(msg.sender == borrower);
        _;
    }

    constructor(string _description, uint _loanAmount, uint _interest, address _borrower) public {
        borrower = _borrower;
        loanAmount = _loanAmount;
        interest = _interest;
        description = _description;
        repaid = false;
        repaymentAmount = loanAmount + interest;
    }

    function lend() public payable {
        require(msg.value == loanAmount);
        require(lender == 0x0000000000000000000000000000000000000000);
        lender = msg.sender;
    }
    
    function repay() public payable {
        require(msg.value == loanAmount + interest);
        lender.transfer(msg.value);
        repaid = true;
    }

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

    //RESTRICT THIS TO ONLY THE LENDER ABLE TO CALL
    function approveWithdrawal(uint index) public onlyLender {
        Withdrawal storage withdrawal = withdrawals[index];
        withdrawal.approved = true;
    }

   
    // RESTRICT THIS TO ONLY OWNER
    function makeWithdrawal(uint index) public onlyBorrower {
        Withdrawal storage withdrawal = withdrawals[index];

        require(withdrawal.approved);
        require(!withdrawal.complete);

        withdrawal.recipient.transfer(withdrawal.value);
        withdrawal.complete = true;
    }

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

    function getWithdrawalsCount() public view returns (uint) {
        return withdrawals.length;
    }
}