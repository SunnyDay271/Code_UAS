import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart dari localStorage saat aplikasi mulai
  useEffect(() => {
    console.log('Loading cart from localStorage...');
    const savedCart = localStorage.getItem('gameTradeCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log('Cart loaded:', parsedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('gameTradeCart');  // Hapus data corrupt
        setCart([]);
      }
    } else {
      console.log('No cart found in localStorage');
    }
  }, []);

  // Save cart ke localStorage setiap kali cart berubah
  useEffect(() => {
    console.log('Saving cart to localStorage:', cart);
    localStorage.setItem('gameTradeCart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    console.log('Adding item to cart:', item);
    const existing = cart.find(cartItem => cartItem.item.id === item.id);
    if (existing) {
      setCart(cart.map(cartItem =>
        cartItem.item.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { item, quantity: 1 }]);
    }
  }

  function removeFromCart(itemId) {
    console.log('Removing item from cart:', itemId);
    setCart(cart.filter(cartItem => cartItem.item.id !== itemId));
  }

  function clearCart() {
    console.log('Clearing cart');
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}