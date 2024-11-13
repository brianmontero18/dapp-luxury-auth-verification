import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contracts with the account: ${deployer.address}`);

  // 1. Deploy LuxuryItemAuth contract
  const LuxuryItemAuth = await ethers.getContractFactory('LuxuryItemAuth');
  const luxuryItemAuth = await LuxuryItemAuth.deploy();
  await luxuryItemAuth.waitForDeployment();
  console.log('LuxuryItemAuth deployed at:', await luxuryItemAuth.getAddress());

  // 2. Configure roles if necessary
  //   console.log('Configuring roles for deployer...');
  //   await luxuryItemAuth.connect(deployer).grantRole(await luxuryItemAuth.DEFAULT_ADMIN_ROLE(), deployer.address);
  //   await luxuryItemAuth.connect(deployer).grantRole(await luxuryItemAuth.MINTER_ROLE(), deployer.address);
  //   console.log('Roles configured for deployer.');

  // 3. Mint sample luxury item for testing (e.g., Rolex)
  console.log('Minting sample luxury item...');
  let tx = await luxuryItemAuth.connect(deployer).registerItem(
    '123456789', // Serial number
    'Rolex' // Manufacturer
  );
  console.log('Minted Rolex with serial number 123456789, Tx:', tx.hash);
  await tx.wait();

  // 4. Verify that the item was registered
  console.log('Verifying item registration...');
  const itemData = await luxuryItemAuth.verifyItem('123456789');
  console.log('Verification result for Rolex:', itemData);

  // Additional setup and configuration steps if needed
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
