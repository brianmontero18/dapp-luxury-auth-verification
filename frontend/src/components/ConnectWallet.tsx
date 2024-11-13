import { FC } from 'react';
import { useWallet } from '../context/WalletContext';

const ConnectWallet: FC = () => {
  const { account, connectWallet } = useWallet();

  return (
    <div>{account ? <p>Connected as: {account}</p> : <button onClick={connectWallet}>Connect MetaMask</button>}</div>
  );
};

export default ConnectWallet;
