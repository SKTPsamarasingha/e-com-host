import CartCard from "../components/CartCard";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const { cart, increment, decrement, removeItem, clearCart, loadingItem } =
    useCart();
  const total = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const navigate = useNavigate();

  const onCheckOut = async () => {
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty 🛒</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className={"flex justify-between items-center"}>
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        <button
          onClick={clearCart}
          className="px-6 py-3 bg-black text-white rounded hover:bg-red"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-4">
        {cart.map((item, index) => (
          <CartCard
            key={item._id || index}
            item={item}
            onInc={increment}
            onDec={decrement}
            onRemove={removeItem}
            loadingItem={loadingItem}
          />
        ))}
      </div>

      <div className="mt-8 border-t pt-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Total: ${total}</h2>

        <button
          onClick={onCheckOut}
          className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
