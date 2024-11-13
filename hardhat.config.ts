import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@typechain/hardhat';

dotenv.config();

const chainIds = {
  eth_sepolia_id: 11155111,
  eth_ganache_id: 1337,
};

const {
  SIGNER_PRIVATE_KEY,
  ETH_SEPOLIA_TESTNET_RPC,
  ETH_SCAN_API_KEY,
  ETH_GANACHE_TESTNET_RPC,
  SIGNER_GANACHE_PRIVATE_KEY,
} = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.27',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    ethereum_sepolia_testnet: {
      url: ETH_SEPOLIA_TESTNET_RPC,
      chainId: chainIds.eth_sepolia_id,
      accounts: SIGNER_PRIVATE_KEY !== undefined ? [SIGNER_PRIVATE_KEY] : [],
    },
    ethereum_ganache_testnet: {
      url: ETH_GANACHE_TESTNET_RPC,
      chainId: chainIds.eth_ganache_id,
      accounts: SIGNER_GANACHE_PRIVATE_KEY !== undefined ? [SIGNER_GANACHE_PRIVATE_KEY] : [],
    },
  },
  typechain: {
    outDir: 'typechain-types',
    target: 'ethers-v6',
  },
  etherscan: {
    apiKey: {
      goerli: ETH_SCAN_API_KEY!,
      sepolia: ETH_SCAN_API_KEY!,
    },
  },
  mocha: {
    timeout: 0,
  },
  sourcify: {
    enabled: false,
  },
};

export default config;
