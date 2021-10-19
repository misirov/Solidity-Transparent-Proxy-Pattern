// migrations/NN_deploy_upgradeable_box.js
const { deployProxy } = require('@openzeppelin/truffle-upgrades'); // deploy proxy admin contract
const { prepareUpgrade } = require('@openzeppelin/truffle-upgrades'); // upgrade proxy contract


const Box = artifacts.require('Box');
const BoxV2 = artifacts.require('BoxV2');

// uncomment / comment the commands below based on 1) initial deployment, 2) upgrade contract

// 1) deploy intitial contract, setup proxy admin
module.exports = async function (deployer) {
  const instance = await deployProxy(Box, { deployer });
  console.log('Instance deployed at address:', instance.address);
};


// 2) upgrade contract to new version
// module.exports = async function (deployer) {
//   const box = await Box.deployed();
//   await prepareUpgrade(box.address, BoxV2, { deployer });
// };