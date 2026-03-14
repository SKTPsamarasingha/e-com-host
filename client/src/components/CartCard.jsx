const CartCard = ({item, onInc, onDec, onRemove, loadingItem}) => {
    const itemID = item._id ? item._id : item?.product._id;


    return (
        <div className="flex gap-4 border rounded-lg p-4 bg-white shadow-sm">
            <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded"
            />

            <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.product.name}</h3>
                <p className="text-sm text-gray-500">
                    Category: {item.product.category}
                </p>
                <p className="text-sm text-gray-500">Size: {item.size}</p>
                <p className="font-medium mt-1">${item.product.price}</p>

                <div className="flex items-center gap-3 mt-3">
                    <button
                        onClick={() => onDec(itemID, item.quantity)}
                        className="px-3 py-1 border rounded hover:bg-gray-100"
                    >
                        −
                    </button>

                    <span className="font-semibold">{item.quantity}</span>

                    <button
                        onClick={() => onInc(itemID, item.quantity)}
                        disabled={loadingItem === itemID}
                        className="px-3 py-1 border rounded hover:bg-gray-100"
                    >
                        +
                    </button>

                    <button
                        onClick={() => onRemove(itemID)}
                        disabled={loadingItem === itemID}
                        className="ml-auto text-red-600 hover:underline"
                    >
                        Remove
                    </button>
                </div>
            </div>

            <div className="font-semibold">
                ${item.product.price * item.quantity}
            </div>
        </div>
    );
};

export default CartCard;
