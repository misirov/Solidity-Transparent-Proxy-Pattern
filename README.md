## Transparent Proxy Pattern

This is a summary of what i learned while playing with the Transparent Proxy Pattern\*

```
User ---- tx ---> Proxy ----------> Implementation_v0
                     |
                      ------------> Implementation_v1
                     |
                      ------------> Implementation_v2
```



Clone this repo and on you root folder run:
> ```npm i truffle```

> ```npm i --save-dev @openzeppelin/truffle-upgrades```

> ```npm i --save-dev chai``` --> for testing


This proxy pattern Uses `delegate call` in order to execute the logic of Smart Contract B inside the context of the Proxy (contract A). All data is on the ProxyAdmin storage, so when the admin wants to change the smart contract logic the ProxyAdmin contract points to the address of the newly deployed contract.
![[Pasted image 20211019215352.png]]
When users call a function, the proxy checks if the caller is an admin or a user, then it delegates the call to the target smart contract to execute the logic under using the data stored in the proxy contract (executing inside the proxy context).

The drawbacks are:

- storage / function collisions. All variables must not be touched and new ones must be introduced at the end.
- gas spent to check if the caller of a function is the admin or a regular user. Writing data to storage is also very costly.
- How proxies expose the interface without requiring a one to one mapping of the entire logc contract's interface. fallback functions solve this:
  - (1) the `calldata` is copied to memory,
  - (2) the call is forwarded to the logic contract,
  - (3) the return data from the call to the logic contract is retrieved, and
  - (4) the returned data is forwarded back to the caller

> ![[Pasted image 20211019220314.png]] > https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable

Expected output when deploying for the first time:

`
1_box_migration.js
==================

		Replacing 'Box'
		---------------

		Deploying 'ProxyAdmin'
		----------------------

		Deploying 'TransparentUpgradeableProxy'
		---------------------------------------

Summary
=======
> Total deployments:   3
`

Expected output when upgrading the contract:

`
1_box_migration.js
==================

   Replacing 'BoxV2'
   -----------------

Summary
=======
> Total deployments:   1
`

<br><br>
#### sources:
<br>
Openzeppelin Proxies: https://docs.openzeppelin.com/upgrades-plugins/1.x/

Openzeppelin Transparent Proxy Pattern with truffle: https://forum.openzeppelin.com/t/openzeppelin-upgrades-step-by-step-tutorial-for-truffle/3579

Step by step with truffle on: https://forum.openzeppelin.com/t/openzeppelin-upgrades-step-by-step-tutorial-for-truffle/3579

Using Openzeppelin plugins:https://docs.openzeppelin.com/upgrades-plugins/1.x/truffle-upgrades

Smart Contract Upgrades and Proxy Patterns (Hands-On): https://www.youtube.com/watch?v=YpEm9Ki0qLE

Upgrading your Smart Contracts | A Tutorial & Introduction: https://www.youtube.com/watch?v=bdXJmWajZRY

>With L0ve:
>PM
