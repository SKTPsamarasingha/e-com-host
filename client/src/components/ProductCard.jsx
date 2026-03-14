import {useState} from "react";

const ProductCard = ({product, clickOnAdd}) => {
    const [selectedSize, setSelectedSize] = useState(
        product.sizes?.[0] || ""
    );

    return (
        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white">

            {/* Image */}
            <div className="h-64 w-full overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-[25rem] w-[20rem] object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">

                {/* Category */}
                <span className="text-xs uppercase tracking-wide text-gray-500">
                    {product.category}
                </span>

                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                </p>

                {/* Price */}
                <div className="text-lg font-bold text-gray-900">
                    ${product.price}
                </div>

                {/* Sizes */}
                {product.sizes?.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                        {product.sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-3 py-1 text-sm border rounded 
                                    ${selectedSize === size
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-gray-700 hover:border-black"
                                }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                )}

                {/* Add to Cart */}
                <button
                    onClick={() =>
                        clickOnAdd({
                            id: product._id,
                            name: product.name,
                            price: product.price,
                            imageUrl: product.imageUrl,
                            category: product.category,
                            size: selectedSize,
                        })
                    }
                    disabled={!selectedSize}
                    className="w-full mt-3 py-2 rounded-md bg-black text-white font-medium hover:bg-gray-800 disabled:opacity-50"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
