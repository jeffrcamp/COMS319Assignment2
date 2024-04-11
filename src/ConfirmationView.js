import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ConfirmationView() {
  const location = useLocation();
  const history = useNavigate();
  const { cart, formData } = location.state || { cart: [], formData: {} }; // Default to empty cart and formData if location state is not available

  // Function for navigating back and resetting the cart
  const handleGoBack = () => {
    // Reset cart logic 
    history('/'); // Navigate back to browse view
  };

  // Helper function to redact card number
  const redactCardNumber = (cardNumber) => {
    if (cardNumber) {
      return 'XXXX-XXXX-XXXX-' + cardNumber.slice(-4);
    } else {
      return 'Card number unavailable';
    }
  };

  return (
    <div className="container mt-5">
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title text-center mb-4">Order Confirmation</h2>
                        <div className="card-text">
                            <h3>Purchased Items:</h3>
                            {cart.map((item, index) => (
                                <div key={index} className="d-flex align-items-center mb-3">
                                    <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', marginRight: '20px' }} />
                                    <p className="mb-0">{item.name} - ${item.price} x {item.quantity}</p>
                                </div>
                            ))}
                            <p><strong>Total Purchase Amount:</strong> ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="card-text">
                            <h3>User Information:</h3>
                            <p>Name: {formData.fullName}</p>
                            <p>Email: {formData.email}</p>
                            <p>Address: {formData.address1}, {formData.city}, {formData.state} {formData.zip}</p>
                            <p>Credit Card: {redactCardNumber(formData.cardNumber)}</p>
                        </div>
                        <hr />
                        <div className="text-center">
                            <button className="btn btn-primary" onClick={handleGoBack}>Back to Shop</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

export default ConfirmationView;
