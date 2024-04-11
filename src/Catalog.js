import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import Products from './Products.json';

function Catalog() {
  const {cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const addToCartAndUpdateQuantity = (productId) => {
    addToCart(productId); // Add item to cart
  };

  const removeFromCartAndUpdateQuantity = (productId) => {
    removeFromCart(productId); // Remove item from cart
  };

  // Filter products based on search query
  const filteredProducts = Products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Energy Drinks Catalog</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
        <link href="album.css" rel="stylesheet" />
      </head>
      <body>
        {/* Main Content */}
        <div className="container">
          <br />
          <h1>Welcome to the Energy Drinks Showroom</h1>
          <p>Explore our exclusive collection of energy drinks.</p>
          <br />
          {/* Search bar */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by product name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {/* Placeholder for Energy Drink Information */}
          <div className="row">
            {/* Mapping through each product to display */}
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-md-4">
                <div className="card mb-4 shadow-sm">
                  <img src={product.image} alt={product.name} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <h6>{product.flavor}</h6>
                    <p className="card-text">{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        {/* Plus button to add a product to the cart */}
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => addToCartAndUpdateQuantity(product.id)}>+</button>
                        {/* Quantity field showing the number of products in the cart */}
                        <input type="text" className="form-control" value={cartItems[product.id] || 0} readOnly />
                        {/* Minus button to remove a product from the cart */}
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => removeFromCartAndUpdateQuantity(product.id)}>-</button>
                      </div>
                      <small className="text-muted">${product.price}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating checkout button */}
        <div className="fixed-bottom text-right pr-3 pb-3">
          <Link to="/cart" className="btn btn-primary">Checkout</Link>
        </div>

        <div className="container">
          <div className="footer">
            <p>© 2024 Energy Drinks Aggregate Inc</p>
            <p>Contact us at support@example.com. Learn more about us <a href="about.html">here</a>.</p>
          </div>
        </div>

        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        <script src="./index.js"></script>
      </body>
    </>
  );
}

export default Catalog;
