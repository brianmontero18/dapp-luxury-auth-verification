import { useState, FC, FormEvent } from 'react';
import { useLuxuryItemAuth } from '../hooks/useLuxuryItemAuth';

const LuxuryItemVerifier: FC = () => {
  const { verificationResult, registerMessage, verifyItem, registerItem } = useLuxuryItemAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerifySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const serialNumber = formData.get('serialNumber') as string;

    if (serialNumber) {
      setIsSubmitting(true);
      await verifyItem(serialNumber);
      setIsSubmitting(false);
    } else {
      alert('Please enter a serial number to verify.');
    }
  };

  const handleRegisterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const serialNumber = formData.get('serialNumber') as string;
    const manufacturer = formData.get('manufacturer') as string;

    if (serialNumber && manufacturer) {
      setIsSubmitting(true);
      await registerItem(serialNumber, manufacturer);
      setIsSubmitting(false);
    } else {
      alert('Please enter both a serial number and a manufacturer to register.');
    }
  };

  return (
    <div>
      <h2>Verify Luxury Item</h2>
      <form onSubmit={handleVerifySubmit}>
        <input type="text" name="serialNumber" placeholder="Enter serial number" />
        <button type="submit" disabled={isSubmitting}>
          Verify Item
        </button>
      </form>
      {verificationResult && (
        <div>
          <p>Manufacturer: {verificationResult[0]}</p>
          <p>Current Owner: {verificationResult[1]}</p>
          <p>Registered At: {new Date(Number(verificationResult[2]) * 1000).toLocaleString()}</p>
          <p>Is Authentic: {verificationResult[3] ? 'Yes' : 'No'}</p>
        </div>
      )}

      <h2>Register New Luxury Item</h2>
      <form onSubmit={handleRegisterSubmit}>
        <input type="text" name="serialNumber" placeholder="Enter serial number" />
        <input type="text" name="manufacturer" placeholder="Enter manufacturer" />
        <button type="submit" disabled={isSubmitting}>
          Register Item
        </button>
      </form>
      {registerMessage && <p>{registerMessage}</p>}
    </div>
  );
};

export default LuxuryItemVerifier;
