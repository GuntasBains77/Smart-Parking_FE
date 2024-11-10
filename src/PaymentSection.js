import React, { useState } from 'react';

const PaymentSection = () => {
  const [bankUserId, setBankUserId] = useState('');
  const [bankUserPin, setBankUserPin] = useState('');
  const [uid, setUid] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Assuming uid is already set in the state
    const apiUrl = `http://192.168.1.17:8080/payment/${uid}`;
  
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Transaction response:', data);
        alert(data.message);
        window.close();
      })
      .catch((error) => console.error('Error fetching payment information:', error));
  };
  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="text-center mb-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/2560px-HDFC_Bank_Logo.svg.png"
          alt="HDFC Bank Logo"
          className="h-8 mx-auto"
        />
      </div>
      <h1 className="text-center text-lg font-semibold text-gray-800 mb-6">Welcome to HDFC Bank NetBanking</h1>

      <main>
        <section className="mb-8">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Login to NetBanking</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="bankUserId" className="text-sm font-medium text-gray-600">
              Fastag ID
            </label>
            <input
              type="text"
              id="bankUserId"
              name="bankUserId"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />

            <label htmlFor="bankUserPin" className="text-sm font-medium text-gray-600">
             Charges
            </label>
            <input
              type="password"
              id="bankUserPin"
              name="bankUserPin"
              value={bankUserPin}
              onChange={(e) => setBankUserPin(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />

            <label htmlFor="bankUserPin" className="text-sm font-medium text-gray-600">
             Password
            </label>
            <input
              type="password"
              id="bankUserPin"
              name="bankUserPin"
              value={bankUserPin}
              onChange={(e) => setBankUserPin(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />

            <div className="flex items-center justify-between mt-2">
              <img
                src="https://e7.pngegg.com/pngimages/811/245/png-clipart-norton-antivirus-antivirus-software-symantec-norton-security-others-text-logo-thumbnail.png"
                alt="Norton Secured"
                className="h-3"
              />
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot Customer ID
              </a>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
            >
              CONTINUE
            </button>

            <p className="text-xs text-gray-600 mt-2">
              Your security is of utmost importance.{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Know More...
              </a>
            </p>
          </form>
        </section>

        <section className="mb-8 p-4 bg-gray-200 rounded-lg">
          <p className="font-medium text-gray-700">Dear Customer,</p>
          <p className="text-sm text-gray-700 mt-2">
            Welcome to the new login page of HDFC Bank NetBanking. Its lighter look and feel is designed to give you
            the best possible user experience. Please continue to login using your customer ID and password.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-medium text-gray-700">First Time User?</h2>
          <p className="text-sm">
            <a href="#" className="text-blue-600 hover:underline">
              Register Now
            </a>{' '}
            for a host of convenient features.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-gray-700">We have added a host of new features!</h2>
          <p className="text-sm mt-2 text-gray-700">Don't have an HDFC Bank Savings Account? You can now do so much more:</p>
          <ul className="mt-4 space-y-2 text-blue-600">
            <li><a href="#" className="hover:underline">Credit Card only? Login here</a></li>
            <li><a href="#" className="hover:underline">Prepaid Card only? Login here</a></li>
            <li><a href="#" className="hover:underline">HDFC Ltd. Home Loans? Login here</a></li>
            <li><a href="#" className="hover:underline">HDFC Ltd. Deposits? Login here</a></li>
            <li><a href="#" className="hover:underline">Retail Loan only? Login here</a></li>
          </ul>
          <p className="text-sm mt-4 text-gray-700"><a href="#" className="text-blue-600 hover:underline">Anywhere access through Desktop or mobile</a></p>
          <p className="text-sm text-gray-700"><a href="#" className="text-blue-600 hover:underline">Enhanced security measures</a></p>
        </section>
      </main>

      <footer className="mt-8 text-center text-sm text-gray-600">
        &copy; HDFC Bank Ltd.
      </footer>
    </div>
  );
};

export default PaymentSection;
