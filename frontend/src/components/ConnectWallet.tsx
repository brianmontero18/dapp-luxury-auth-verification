import { useState } from 'react';
import { BrowserProvider } from 'ethers';

const ConnectWallet: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Solicita permisos para acceder a la cuenta
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Crear proveedor y obtener la cuenta actual
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } catch (error) {
        console.error('Error al conectar a MetaMask:', error);
        alert('Error al conectar a MetaMask');
      }
    } else {
      alert('MetaMask no está instalado. Por favor, instálalo para usar esta DApp.');
    }
  };

  return (
    <div>{account ? <p>Connected as: {account}</p> : <button onClick={connectWallet}>Connect MetaMask</button>}</div>
  );
};

export default ConnectWallet;
