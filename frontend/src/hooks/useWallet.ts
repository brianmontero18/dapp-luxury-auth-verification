import { useState } from 'react';
import { BrowserProvider } from 'ethers';

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed. Please install it to use this DApp.');
      return;
    }

    try {
      // Solicita permisos para acceder a la cuenta
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Crear el provider y obtener la cuenta actual
      const newProvider = new BrowserProvider(window.ethereum);
      setProvider(newProvider);

      const signer = await newProvider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      alert('Error connecting to MetaMask');
    }
  };

  return { account, provider, connectWallet };
}
