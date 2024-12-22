//ALERT VS DÜZENLENECEK.
import React, { useState } from 'react';

function PaymentForm() {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Formdaki verileri backend'e gönder
    const paymentData = {
      amount,
      paymentMethod,
    };

    try {
      setIsProcessing(true);
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();
      if (data.success) {
        alert('Payment successful!');
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      alert('Error processing payment.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <h2>Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <label>
          Payment Method:
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </label>
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;
