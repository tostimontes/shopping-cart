import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './routes/Home';
import Contact from './components/Contact';
import Shop from './routes/Shop';
import { Link, Outlet } from 'react-router-dom';

// TODO: edit and remove quantity

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || [],
  );

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateCart = (newItem, quantity, isAdding = true) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id,
      );
      if (existingItemIndex !== -1) {
        // Update existing item quantity
        const updatedItems = [...prevItems];
        if (isAdding) {
          updatedItems[existingItemIndex].quantity += quantity;
        } else {
          updatedItems[existingItemIndex].quantity = quantity;
        }
        return updatedItems.filter((item) => item.quantity > 0);
      } else if (isAdding) {
        // Add new item
        return [...prevItems, { ...newItem, quantity: quantity }];
      }
      return prevItems;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar
        cartItems={cartItems}
        handleUpdateCart={updateCart}
        isMobile={isMobile}
      />
      <main className="h-full w-full flex-col gap-8 bg-yellow-100">
        <Outlet context={{ updateCart, cartItems, isMobile }} />
      </main>
      <Contact />
    </div>
  );
}

export default App;
