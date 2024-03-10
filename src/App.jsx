import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import { Outlet } from 'react-router-dom';
import fakeResponse from './fakeResponse';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || [],
  );

  const [itemQuantities, setItemQuantities] = useState(
    cartItems.reduce(
      (acc, item) => ({ ...acc, [item.id]: item.quantity }),
      {},
    ) || {},
  );

  const [shopItems, setShopItems] = useState([]);
  const [fetchError, setFetchError] = useState(false);

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await (
          await fetch('https://fakestoreapi.com/products/')
        ).json();

        setShopItems(data);
        setFetchError(false); // Reset error state on successful fetch
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setFetchError(true);
        setShopItems(fakeResponse);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('itemQuantities', JSON.stringify(itemQuantities));
  }, [itemQuantities]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setItemQuantities(
      cartItems.reduce(
        (acc, item) => ({ ...acc, [item.id]: item.quantity }),
        {},
      ),
    );
  }, [cartItems]);

  const updateItemQuantity = (itemId, newQuantity) => {
    setItemQuantities((prev) => ({ ...prev, [itemId]: newQuantity }));
  };

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

  const handleSearch = (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    const results = shopItems.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()),
    );
    setSearchResults(results);
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
        itemQuantities={itemQuantities}
        handleItemQuantityUpdate={updateItemQuantity}
        shopItems={shopItems}
        handleSearch={handleSearch}
        searchResults={searchResults}
      />
      <main className="h-full w-full flex-col gap-8 bg-yellow-100">
        <Outlet
          context={{
            updateCart,
            cartItems,
            isMobile,
            itemQuantities,
            updateItemQuantity,
            shopItems,
            fetchError,
          }}
        />
      </main>
      <Contact />
    </div>
  );
}

export default App;
