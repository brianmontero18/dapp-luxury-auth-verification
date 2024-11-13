// src/hooks/useLuxuryItemAuth.ts
import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { getContract } from '../helpers/contractHelpers';

export function useLuxuryItemAuth() {
  const { provider } = useWallet();
  const [verificationResult, setVerificationResult] = useState<[string, string, bigint, boolean] | null>(null);
  const [registerMessage, setRegisterMessage] = useState<string | null>(null);

  const verifyItem = async (serialNumber: string) => {
    try {
      if (!provider) return;
      const contract = await getContract(provider, false);
      if (!contract) return;

      const result = await contract.verifyItem(serialNumber);
      setVerificationResult(result);
    } catch (error) {
      console.error('Verification failed:', error);
      alert('Item not found or verification failed');
    }
  };

  const registerItem = async (serialNumber: string, manufacturer: string) => {
    try {
      if (!provider) return;
      const contract = await getContract(provider, true);
      if (!contract) return;

      const tx = await contract.registerItem(serialNumber, manufacturer);
      await tx.wait();
      setRegisterMessage(`Item registered successfully with Tx hash: ${tx.hash}`);
    } catch (error) {
      console.error('Registration failed:', error);
      setRegisterMessage('Failed to register item');
    }
  };

  return { verificationResult, registerMessage, verifyItem, registerItem };
}
