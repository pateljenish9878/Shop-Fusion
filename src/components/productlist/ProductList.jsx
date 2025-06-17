import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebaseConfig"; // Firebase Authentication
import Navbar from "../navbar/Navbar";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sortType, setSortType] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000); // Default max price

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let updatedProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category ? product.category === category : true) &&
        product.price <= maxPrice
    );

    if (sortType === "price-low-high") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === "price-high-low") {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (sortType === "a-z") {
      updatedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === "z-a") {
      updatedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredProducts(updatedProducts);
  }, [searchTerm, category, sortType, maxPrice, products]);

  const handleAddToCart = (product) => {
    if (!user) {
      toast.warn("Please login to add items to cart!");
    } else {
      dispatch(addToCart(product));
      toast.success(`${product.title} added to cart!`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="product">
        <div className="product-page">
          {/* Sidebar Filters */}
          <aside className="sidebar">
            <h3>Filters</h3>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
            <h4>Category</h4>
            <button onClick={() => setCategory("")}>All</button>
            <button onClick={() => setCategory("men's clothing")}>
              Men's Clothing
            </button>
            <button onClick={() => setCategory("women's clothing")}>
              Women's Clothing
            </button>
            <button onClick={() => setCategory("jewelery")}>Jewelry</button>
            <button onClick={() => setCategory("electronics")}>
              Electronics
            </button>

            <h4>Sort By</h4>
            <select onChange={(e) => setSortType(e.target.value)}>
              <option value="">None</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>

            <h4>Max Price: ${maxPrice}</h4>
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </aside>

          {/* Product List */}
          <div className="product-container">
            {loading ? (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-image-container">
                      <img src={product.image} alt={product.title} />
                    </div>
                    <h3>{product.title}</h3>
                    <p className="category">Category: {product.category}</p>
                    <p>${product.price.toFixed(2)}</p>
                    <div className="buttons">
                      <Link
                        to={`/product/${product.id}`}
                        className="view-details"
                      >
                        View Details
                      </Link>
                      <button
                        className="add-to-cart"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
