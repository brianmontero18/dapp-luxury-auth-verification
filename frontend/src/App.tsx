import { WalletProvider } from './context/WalletContext';
import ConnectWallet from './components/ConnectWallet';
import LuxuryItemVerifier from './components/LuxuryItemVerifier';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Luxury Item Verification DApp</h1>
      <WalletProvider>
        <ConnectWallet />
        <LuxuryItemVerifier />
      </WalletProvider>
    </>
  );
}

export default App;
