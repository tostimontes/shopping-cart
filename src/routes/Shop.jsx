import { useEffect, useState } from 'react';
import ShopItem from '../components/ShopItem';
import fakeResponse from '../fakeResponse';
import { Outlet, useLocation, useOutletContext } from 'react-router-dom';

// TODO: use a react router loader for the prefetch

export default function Shop() {
  const [items, setItems] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const location = useLocation();
  const isShopMainPage = location.pathname === '/shop';
  const { updateCart, isMobile } = useOutletContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await (
          await fetch('https://fakestoreapi.com/products/')
        ).json();

        setItems(data);
        setFetchError(false); // Reset error state on successful fetch
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setFetchError(true);
        setItems(fakeResponse);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex w-full flex-col p-4">
      <h2 className="mb-5 text-center text-5xl">Shop</h2>
      {fetchError && (
        <p className="min-h-screen text-center text-red-500">
          Failed to load products. Please try again later.
        </p>
      )}
      {isShopMainPage && (
        <div className="md:auto-rows-35rem grid auto-rows-fr grid-cols-2 gap-2 md:grid-cols-4">
          {items.map((item) => {
            return (
              <ShopItem
                key={item.id}
                item={item}
                isMobile={isMobile}
                updateCart={updateCart}
              />
            );
          })}
        </div>
      )}
      <Outlet context={{ items, updateCart }} />
    </div>
  );
}
