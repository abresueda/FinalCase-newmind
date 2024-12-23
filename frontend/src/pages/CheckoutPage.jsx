import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";
import Notification from "../components/Notification/Notification";

function PaymentForm() {
  const { id } = useParams();
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [isProcessing, setIsProcessing] = useState(false);
  const { cartItems } = useContext(CartContext);

  // Ürünlerin toplam fiyatını hesaplayan useEffect
  useEffect(() => {
    if (cartItems.length > 0) {
      const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      setAmount(totalAmount);
    }
  }, [cartItems]); // CartItems değiştiğinde toplam tutarı güncelle

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Formdaki verileri backend'e gönder
    const paymentData = {
      orderId: id,
      amount: amount,
      paymentMethod,
    };

    try {
      setIsProcessing(true);
      const response = await fetch(
        "http://localhost:3000/api/payment/process-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      const data = await response.json();

      console.log("Response from backend:", data);

      if (data.success === true) {
        // WebSocket üzerinden ödeme başarı mesajı gönder
        const socket = new WebSocket("ws://localhost:3000");
        socket.onopen = () => {
          socket.send(JSON.stringify({ event: "paymentSuccess" }));
        };

        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: "Your payment was processed successfully.",
        });

        
      } else {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: data.message || "Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error processing payment.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container my-5">
      <Notification /> {/* WebSocketten bildirim göndermek için. */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-lg">
            <h2 className="text-center mb-4">Payment Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  readOnly
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="form-control"
                  placeholder="Enter amount"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="paymentMethod" className="form-label">
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                  className="form-select"
                >
                  <option value="creditCard">Credit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Pay Now"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
