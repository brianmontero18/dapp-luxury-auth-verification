import { useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import LuxuryItemAuthABI from '../abis/LuxuryItemAuth.json';
import { LuxuryItemAuth } from '../../../typechain-types';

const contractAddress = '0xd89bc1AF366C635Be169bDC9d420A32848C77821';

const LuxuryItemVerifier: React.FC = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [verificationResult, setVerificationResult] = useState<[string, string, bigint, boolean] | null>(null);

  const verifyItem = async () => {
    if (!window.ethereum) return alert('MetaMask is not installed');

    try {
      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, LuxuryItemAuthABI, provider) as unknown as LuxuryItemAuth;
      const result = await contract.verifyItem(serialNumber);

      setVerificationResult(result);
    } catch (error) {
      console.error('Verification failed:', error);
      alert('Item not found or verification failed');
    }
  };

  return (
    <div>
      <h2>Verify Luxury Item</h2>
      <input
        type="text"
        placeholder="Enter serial number"
        value={serialNumber}
        onChange={(e) => setSerialNumber(e.target.value)}
      />
      <button onClick={verifyItem}>Verify Item</button>
      {verificationResult && (
        <div>
          <p>Manufacturer: {verificationResult[0]}</p>
          <p>Current Owner: {verificationResult[1]}</p>
          <p>Registered At: {new Date(Number(verificationResult[2]) * 1000).toLocaleString()}</p>
          <p>Is Authentic: {verificationResult[3] ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default LuxuryItemVerifier;
