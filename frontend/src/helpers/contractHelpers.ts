import { BrowserProvider, Contract } from 'ethers';
import LuxuryItemAuthABI from '../abis/LuxuryItemAuth.json';
import { LuxuryItemAuth } from '../../../typechain-types';
import { contractAddress } from '../constants';

export const getContract = async (provider: BrowserProvider, withSigner = false): Promise<LuxuryItemAuth | null> => {
  if (!provider) {
    alert('Please connect to MetaMask first.');
    return null;
  }

  const signerOrProvider = withSigner ? await provider.getSigner() : provider;
  const contract = new Contract(contractAddress, LuxuryItemAuthABI, signerOrProvider) as unknown as LuxuryItemAuth;
  return contract;
};
