import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import Products from './Products.json';
import './CartView.css';

function CartView() {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cardNumber: '',
    address1: '',
    city: '',
    state: '',
    zip: '',
  });

  let totalPrice = 0;

  for (const productIdToFilter of Object.keys(cartItems)) {
    const filteredProducts = Products.filter(product => product.id == productIdToFilter);

    const filteredProduct = filteredProducts[0];
  
    const productPrice = filteredProduct ? filteredProduct.price : null;

    const productQuantityInCart = cartItems[productIdToFilter] || 0;

    totalPrice += productPrice * productQuantityInCart;
  }
  
  
    
  const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'DC', label: 'District Of Columbia' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
    { value: 'AS', label: 'American Samoa' },
    { value: 'GU', label: 'Guam' },
    { value: 'MP', label: 'Northern Mariana Islands' },
    { value: 'PR', label: 'Puerto Rico' },
    { value: 'VI', label: 'Virgin Islands' },
  ];
  

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

    // Validate email first
    if (!validateEmail(formData.email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Here we prepare to navigate to the confirmation page and pass the formData
    navigate('/confirmation', { state: { ...formData } });

    // Optionally reset form data here or on the confirmation page
    setFormData({
        fullName: '',
        email: '',
        cardNumber: '',
        address1: '',
        city: '',
        state: '',
        zip: '',
    });
};


  const calculateItemTotal = (price, quantity) => (price * quantity).toFixed(2);


  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">Your Cart</h2>
      {Object.keys(cartItems).length > 0 ? (
        <ul>
          {Products.filter(product => cartItems[product.id]).map(filteredProduct => (
            <li key={filteredProduct.id} className="mb-2 flex justify-between items-center">
              <img src = {filteredProduct.image} alt = "" width = "100" height = "100"/>
              <span className="flex-1">{filteredProduct.name} - ${filteredProduct.price} x {cartItems[filteredProduct.id]} </span>
              <span className="dots-leader">...</span>
              <span className="price text-right">${calculateItemTotal(filteredProduct.price, cartItems[filteredProduct.id])}</span>
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
              {stateOptions.map((state) => (
                <option key={state.value} value={state.value}>{state.label}</option>
              ))}
            </select>
            <input
              className="border p-2 rounded"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              placeholder="Zip"
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
