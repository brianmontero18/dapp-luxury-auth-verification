// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    SIGNER_PRIVATE_KEY: string;
    ETH_SEPOLIA_TESTNET_RPC: string;
    ETH_SCAN_API_KEY: string;
    ETH_GANACHE_TESTNET_RPC: string;
    SIGNER_GANACHE_PRIVATE_KEY: string;
  }
}
