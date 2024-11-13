# Luxury Item Authenticity DApp

## Description

This DApp enables the verification of luxury item authenticity (such as watches and jewelry) using a "digital passport" stored on the blockchain through a smart contract. The application is designed to prevent counterfeiting, allowing users to verify item authenticity and authorized users to register new items.

## Access the DApp

The DApp is deployed and available on Google Pages.

![DApp Home](frontend/public/image.png)

## Project Structure

The project consists of three main layers:

1. **Smart Contract (Logic Layer)**: A Solidity smart contract that allows for the registration and verification of luxury items. It has been deployed on the Ganache test network.
2. **Visual Interface (Client Layer)**: A simple user interface developed with React and TypeScript. It provides forms for verifying and registering items via MetaMask.
3. **Web3 Provider (Connection Layer)**: `ethers.js` and MetaMask are used to connect the interface with the smart contract, allowing both read and write actions on the blockchain.

---

## DApp Features

1. **Authenticity Verification**: Users can enter an item's serial number and verify its authenticity. The DApp displays details such as the manufacturer, current owner, registration date, and authenticity status.

2. **Item Registration**: Authorized users can register new luxury items by providing a serial number and manufacturer name. This registration is securely stored on the blockchain.

---

## Questions Answered

### What is the purpose of the DApp?

The DApp's purpose is to provide a solution for verifying the authenticity of luxury items using blockchain technology, helping to prevent counterfeiting and ensuring transparency in the luxury goods market.

### What variables and functions are in the Smart Contract?

The `LuxuryItemAuth` smart contract includes the following key variables and functions:

- **Variables**:

  - `owner`: Address of the contract owner.
  - `items`: Mapping that stores data for each registered item, including the manufacturer, current owner, registration date, and authenticity status.

- **Functions**:
  - `registerItem(string serialNumber, string manufacturer)`: Allows the contract owner to register a luxury item.
  - `verifyItem(string serialNumber)`: Allows users to verify an item's authenticity.

### What library did you implement for the connection layer: Web3.js or Ethers.js? Why?

`ethers.js` was used for the Web3 connection layer. `ethers.js` is compatible with TypeScript and easily integrates with MetaMask for both read calls and write transactions to the contract. Additionally, it provides a simple, secure interface for working with smart contracts on the Ethereum blockchain.

---

## Installation and Configuration

1. **Clone the repository**:

   ```bash
   git clone https://github.com/brianmontero18/dapp-luxury-auth-verification
   cd dapp-luxury-auth-verification
   ```

2. **Configure environment variables** (in `.env`):

   - `ETH_GANACHE_TESTNET_RPC`: Ganache network.
   - `SIGNER_GANACHE_PRIVATE_KEY`: private key to sign your operations.

3. **Install dependencies**:

   Install dependencies in the frontend directory:

   ```bash
   cd frontend
   npm install
   ```

   Install dependencies in the root directory for smart contracts:

   ```bash
   cd ..
   npm install
   ```

   This will start the React application, which will be accessible at http://localhost:5173.

4. **Deploy the smart contract locally**:

   ```bash
   npm run deploy --network ethereum_ganache_testnet

   ```

5. **Save the deployed contract address**:

   CAfter deploying the contract, copy its address and paste it into the file [frontend/src/constants.ts](frontend/src/constants.ts)

---

## Smart Contract Deployment

The `LuxuryItemAuth` smart contract was deployed on the Ganache test network using `Hardhat`. Deployment instructions can be found in the `scripts/deploy.ts` file within the project.

---

## How to Use the DApp

1. Connect your wallet to MetaMask and select the Ganache network.
2. Enter an item's serial number to verify its authenticity or register it via the form provided on the visual interface.

---

## Documentation & Links

### Deployed Contract Addresses & Verification Links

The contract was deployed on the Sepolia testnet and has been verified on Etherscan:

- **LuxuryItemAuth Contract** - [0xa6A0F4B2E7feFCe948bdc994FD4D19AD84971567](https://sepolia.etherscan.io/address/0xa6A0F4B2E7feFCe948bdc994FD4D19AD84971567#code)

### Transaction Hashes for Key Operations

Key operations performed after deployment, including minting a sample luxury item and registering a new item, are as follows:

- **Minted Sample Item (Rolex with serial number 123456789)**: [0x501481330c578ce2e15da667d8c1d27a7477299ba3139570362f5815816a353b](https://sepolia.etherscan.io/tx/0x501481330c578ce2e15da667d8c1d27a7477299ba3139570362f5815816a353b)

- **Registered New Item (TREN with serial number 11132024)**: [0x63d568ff1ef46c7acbed65c3a8aee41f0ec5a185085a7d7ebe805caeb82e9cbb](https://sepolia.etherscan.io/tx/0x63d568ff1ef46c7acbed65c3a8aee41f0ec5a185085a7d7ebe805caeb82e9cbb)
