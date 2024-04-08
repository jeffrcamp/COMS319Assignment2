import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CartView({ cart = [], setCart = () => {} }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cardNumber: '',
    address1: '',
    city: '',
    state: '',
    zip: '',
  });

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    console.log(formData);
    setFormData({
      fullName: '',
      email: '',
      cardNumber: '',
      address1: '',
      city: '',
      state: '',
      zip: '',
    });
    //navigate('/confirmation');
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">Your Cart</h2>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="mb-2 flex justify-between items-center">
              <span>{item.name} - ${item.price} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <p className="text-xl font-semibold mt-5">Total: ${totalPrice.toFixed(2)}</p>
      <div className="mt-8 mb-5">
        <h3 className="text-xl font-bold">Payment Information</h3>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              className="border p-2 rounded"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              required
            />
            <input
              className="border p-2 rounded"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
            <input
              className="border p-2 rounded"
              name="cardNumber"
              type="text"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="Card Number"
              pattern="\d{16}"
              title="Card number must be 16 digits"
              required
            />
            <input
              className="border p-2 rounded"
              name="address1"
              value={formData.address1}
              onChange={handleInputChange}
              placeholder="Address"
              required
            />
            <input
              className="border p-2 rounded"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              required
            />
            <select
              className="border p-2 rounded"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a State</option>
              {/* Populate with your state options */}
            </select>
            <input
              className="border p-2 rounded"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              placeholder="Zip"
              pattern="\d{5}"
              title="ZIP code must be 5 digits"
              required
            />
          </div>
          <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit Order
          </button>
        </form>
      </div>
      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate(-1)}>
        Return
      </button>
    </div>
  );
}

export default CartView;
