import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import { auth } from "../../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import "./ProductDetail.css";
import Navbar from "../navbar/Navbar";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleAddToCart = () => {
        if (!user) {
            toast.warn("Please login to add items to cart!");
        } else {
            dispatch(addToCart(product));
            toast.success(`${product.title} added to cart!`);
        }
    };

    if (loading) {
        return (
            <div className="product-detail-container">
                <div className="loader"></div>
            </div>
        );
    }

    if (!product) {
        return <p className="error-message">Product not found.</p>;
    }

    return (
        <>
        <Navbar/>
        <div className="product-detail">
            <div className="product-image">
                <img src={product.image} alt={product.title} />
            </div>
            <div className="product-info">
                <h2>{product.title}</h2>
                <p className="category">Category: <span>{product.category}</span></p>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>

                <button
                    onClick={handleAddToCart}
                    className="add-to-cart-btn"
                >
                    Add to Cart
                </button>
            </div>
        </div>
        </>
    );
};

export default ProductDetail;
