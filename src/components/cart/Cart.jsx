import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { removeFromCart, clearCart } from "../../redux/cartReducer";
import { placeOrder } from "../../redux/orderReducer";
import { toast } from "react-toastify";
import "./Cart.css";
import Navbar from "../navbar/Navbar";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(cartItems.reduce((total, item) => total + item.price, 0));
  }, [cartItems]);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    dispatch(placeOrder({ items: cartItems, totalPrice }));
    dispatch(clearCart());
    toast.success("Order placed successfully!");
  };

  return (
    <>
    <Navbar/>
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Shop Now</Link></p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>${item.price}</p>
                  <button onClick={() => dispatch(removeFromCart(item.id))}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
    </>
  );
};

export default Cart;
