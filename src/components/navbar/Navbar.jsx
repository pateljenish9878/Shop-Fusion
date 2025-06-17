import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const user = auth.currentUser;

    const handleLogout = async () => {
        await signOut(auth);
        toast.info("Logged out successfully!");
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">ShopFusion</Link>
            </div>

            <ul className={menuOpen ? "nav-links active" : "nav-links"}>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/orders">Orders</Link></li>

                {/* Cart */}
                <li className="cart-icon">
                    <Link to="/cart">
                        <FaShoppingCart />
                        {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
                    </Link>
                </li>

                <li 
                    className="user-menu" 
                    onMouseEnter={() => setDropdownOpen(true)} 
                    onMouseLeave={() => setDropdownOpen(false)}
                >
                    {user ? (
                        <div className="dropdown">
                            <button className="dropbtn">
                                <FaUserCircle /> {user.displayName || "Account"}
                            </button>
                            {dropdownOpen && (
                                <div className="dropdown-content">
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login"><FaUserCircle /> Login</Link>
                    )}
                </li>
            </ul>

            <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </div>
        </nav>
    );
};

export default Navbar;
