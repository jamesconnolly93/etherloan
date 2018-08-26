# Avoiding Common Attacks

The following strategies were used to prevent these common attacks

#### Re-entrancy

Was prevented on the `makeWithdrawal` function by using `require(!withdrawl.complete);` to ensure that if a withdrawal has already occured, the user is not able to make the same withdrawal again.

#### General issues/flaws found in the future

In the event that flaws are found in the contract design in the future, the owner of the contract has the ability to call the circuitbreaker function which will prevent any further loans from being created.

#### Denial of Service

Denial of service issues could arrise if the funds were dispersed from the contract automatically as withdrawals were approved. Using the withdrawal design pattern ensures each transaction occurs one at a time and prevents DoS issues.

#### Tx.Origin Authentication

This is avoided by using the recommended `msg.sender` syntax.

```
function circuitbreaker() public onlyOwner {
        paused = true;
    }
 ```