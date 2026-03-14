import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider.jsx";
import { cartService } from "../api/cartService.js";
import { toast } from "react-toastify";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();
  const [loadingItem, setLoadingItem] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const syncCart = async () => {
      const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (!user) {
        setCart(guestCart);
        return;
      } else {
        try {
          let finalItems;
          if (guestCart.length > 0) {
            const cartData = guestCart.map((item) => {
              return {
                product: item.product._id,
                size: item.size,
                quantity: item.quantity,
              };
            });
            const result = await cartService.addCart({ items: cartData });
            if (result.success) localStorage.removeItem("cart");
          }
          const res = await cartService.getCart();
          finalItems = res.data.items;

          if (isMounted) setCart(finalItems);
        } catch (error) {
          if (error.statusCode === 404 && error.type === "NotFoundError") {
            setCart([]);
          }
        }
      }
    };

    syncCart();
    return () => {
      isMounted = false;
    };
  }, [user]);

  const addToCart = async (item) => {
    if (!user) return addGuestCart(item);
    try {
      const cartData = {
        items: [
          { product: item.id, size: item.size ?? "M", quantity: item.quantity },
        ],
      };
      const res = await cartService.addCart(cartData);
      setCart(res.data.items);
      return cart;
    } catch (error) {
      console.warn(error);
      toast.error(error.message);
    }
  };
  const addGuestCart = (item) => {
    const exist = cart.find(
      (i) => i.product._id === item.id && i.size === item.size,
    );

    let updatedCart;

    if (exist) {
      updatedCart = cart.map((i) =>
        i.product._id === item.id && i.size === item.size
          ? { ...i, quantity: i.quantity + (item.quantity || 1) }
          : i,
      );
    } else {
      const newItem = {
        _id: item._id || null,
        product: {
          _id: item.id,
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl,
          category: item.category,
        },
        size: item.size,
        quantity: item.quantity || 1,
      };
      updatedCart = [...cart, newItem];
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    return updatedCart;
  };

  const removeItem = async (itemID) => {
    if (!user) {
      const updatedCart = cart.filter((i) => i.product._id !== itemID);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return;
    }
    try {
      const res = await cartService.deleteCartItem(itemID);
      console.log(res);
      setCart((prev) => prev.filter((i) => i._id !== itemID));
      if (res.success) toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
      console.warn(error);
    }
  };

  const updateItem = async (itemID, newQuantity) => {
    if (loadingItem === itemID) return;
    let updatedCart;
    if (!user) {
      updatedCart = cart.map((i) =>
        i.product._id === itemID ? { ...i, quantity: newQuantity } : i,
      );

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return;
    }

    try {
      setLoadingItem(itemID);
      await cartService.updateCart(itemID, { quantity: newQuantity });
      setCart((prev) =>
        prev.map((i) =>
          i._id === itemID ? { ...i, quantity: newQuantity } : i,
        ),
      );
    } catch (error) {
      toast.error(error.message);
      console.warn(error);
    } finally {
      setLoadingItem(null);
    }
  };
  const clearCart = async () => {
    try {
      if (!user) {
        localStorage.removeItem("cart");
        return;
      }
      await cartService.clearCart();
    } catch (error) {
      toast.error(error.message);
      console.warn(error);
    } finally {
      setCart([]);
    }
  };

  const increment = async (itemID, quantity) => {
    await updateItem(itemID, quantity + 1);
  };

  const decrement = async (itemID, quantity) => {
    if (quantity === 1) return;
    await updateItem(itemID, quantity - 1);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increment,
        decrement,
        removeItem,
        clearCart,
        loadingItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
