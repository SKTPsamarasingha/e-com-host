import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const categories = ["Men", "Women", "Kids"];
const sizes = ["XS", "S", "M", "L", "XL"];

const ProductFilters = ({ onChange }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [filters, setFilters] = useState({
        search: searchParams.get("search") || "",
        category: searchParams.get("category") || "",
        size: searchParams.get("size") || "",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        page: Number(searchParams.get("page")) || 1,
        limit: Number(searchParams.get("limit")) || 10,
    });

    useEffect(() => {
        const params = Object.fromEntries(
            Object.entries(filters).filter(([_, v]) => v !== "" && v !== null)
        );
        setSearchParams(params);
        onChange(filters);
    }, [filters]);

    const update = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            page: 1, // reset page on filter change
        }));
    };

    return (
        <div className="bg-white p-4 rounded-md shadow space-y-4">

            {/* Search */}
            <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => update("search", e.target.value)}
                className="w-full border px-3 py-2 rounded"
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {/* Category */}
                <select
                    value={filters.category}
                    onChange={(e) => update("category", e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">All Categories</option>
                    {categories.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>

                {/* Size */}
                <select
                    value={filters.size}
                    onChange={(e) => update("size", e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">All Sizes</option>
                    {sizes.map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>

                {/* Min Price */}
                <input
                    type="number"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={(e) => update("minPrice", e.target.value)}
                    className="border px-3 py-2 rounded"
                />

                {/* Max Price */}
                <input
                    type="number"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={(e) => update("maxPrice", e.target.value)}
                    className="border px-3 py-2 rounded"
                />
            </div>
        </div>
    );
};

export default ProductFilters;
