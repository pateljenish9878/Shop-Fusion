import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/productlist/ProductList";
import ProductDetail from "./components/productdetail/ProductDetail";
import Cart from "./components/cart/Cart";
import Login from "./components/auth/Login";
import Signup from "./components/auth/SignUp";
import Orders from "./components/orders/Orders";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/orders" element={<Orders />} />
            </Routes>
        </Router>
    );
}

export default App;