import { useSelector, useDispatch } from "react-redux";
import { clearOrders } from "../../redux/orderReducer";
import { toast } from "react-toastify";
import "./Orders.css";
import Navbar from "../navbar/Navbar";

const Orders = () => {
  const orders = useSelector((state) => state.orders || []);
  const dispatch = useDispatch();

  return (
    <>
    <Navbar/>
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <>
          <ul>
            {orders.map((order) => (
              <li key={order.id} className="order-item">
                <h3>Order ID: {order.id}</h3>
                <p>Placed on: {order.date}</p>
                <ul className="order-items">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      <img src={item.image} alt={item.title} />
                      <span>{item.title} - <span className="item-price">${item.price}</span></span>
                    </li>
                  ))}
                </ul>
                <p className="order-total">Total: ${order.totalPrice.toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <button className="clear-orders-btn" onClick={() => {
            dispatch(clearOrders());
            toast.success("All orders cleared!");
          }}>
            Clear Orders
          </button>
        </>
      )}
    </div>
    </>
  );
};

export default Orders;
