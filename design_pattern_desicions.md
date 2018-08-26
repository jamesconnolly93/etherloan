# Design Pattern Decisions

When creating this project, the following Design Patters were followed in accordance with best practices:

#### Design Patterns

1. **Restricting Access with Function Modifiers**
- Used to restrict access to the circuit breaker to allow only the deployer of the contract (in this case, myself) to call the circuit breaker function.
- Used to modify functions that only the lender should be able to call
- Used to modify functions that only the borrower should be able to call
2. **Circuit Breaker**
- Used to allow the owner of the `LoanFactory` contract to pause all future creation of loans in the event of code vulnerability
3. **Fail Early and Loud88
- Using clear require statements to ensure functions execute only under proper conditions and have reasonable error messages
4. **Pull Over Push Payments/Withdrawal Pattern**
- After withdrawals are approved, the borrower must withdraw the funds rather than having then pushed to them. This is in keeping with best practices.