import {useEffect, useState} from "react";
import {productService} from "../api/productsService.js";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import Pagination from "../components/Pagination";
import {useAuth} from "../context/AuthProvider.jsx";
import {useCart} from "../context/CartContext.jsx";
import {toast} from "react-toastify";

const ProductsPage = () => {
    const {user} = useAuth();
    const {addToCart, cart} = useCart();

    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        search: "", category: "", size: "", minPrice: "", maxPrice: "",
    });

    const [pagination, setPagination] = useState({
        page: 1, total: 0, totalPages: 1,
    });


    useEffect(() => {
        const fetchProducts = async () => {

            let res = await productService.getProducts({
                ...filters, page: pagination.page, limit: pagination.limit,
            });
            setPagination({
                page: res.data.page, total: res.data.total, totalPages: res.data.totalPages
            });

            setProducts(res.data.products);

        };

        fetchProducts();
    }, [filters, pagination.page]);

    const clickOnAdd = async (item) => {
        if (!item.id) toast.error("Item ID not found")
        if (!item.size) toast.error("Item size not found")
        const addCart = await addToCart({...item, quantity: 1});
        // if (cart.length >= updatedCart.length) toast.success(`${item.name} added to cart`)
    };
    return (<div className="max-w-7xl mx-auto px-4 py-6">
        <ProductFilters
            filters={filters}
            setFilters={setFilters}
            onChange={(filters) => setFilters(filters)}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {products.map((product) => (<ProductCard
                key={product._id}
                product={product}
                clickOnAdd={clickOnAdd}
            />))}
        </div>

        <Pagination
            pagination={pagination}
            setPagination={setPagination}
        />
    </div>);
};

export default ProductsPage;
