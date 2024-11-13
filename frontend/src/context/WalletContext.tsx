import { createContext, useContext, useState, ReactNode, useCallback, FC } from 'react';
import { BrowserProvider } from 'ethers';

interface WalletContextProps {
  provider: BrowserProvider | null;
  account: string | null;
  connectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed. Please install it to use this DApp.');
      return;
    }

    try {
      // Solicita permisos para acceder a la cuenta
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Crea el provider y obtiene la cuenta actual
      const newProvider = new BrowserProvider(window.ethereum);
      setProvider(newProvider);

      const signer = await newProvider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      alert('Error connecting to MetaMask');
    }
  }, []);

  return <WalletContext.Provider value={{ provider, account, connectWallet }}>{children}</WalletContext.Provider>;
};

// Custom hook para acceder al contexto de Wallet
export const useWallet = (): WalletContextProps => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
