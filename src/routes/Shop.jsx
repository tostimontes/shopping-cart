import { useEffect, useState } from 'react';
import ShopItem from '../components/ShopItem';
import { Outlet, useLocation, useOutletContext } from 'react-router-dom';

// TODO: use a react router loader for the prefetch

export default function Shop() {
  const [items, setItems] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const location = useLocation();
  const isShopMainPage = location.pathname === '/shop';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await (
        await fetch('https://fakestoreapi.com/products/')
      ).json();

      setItems(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex w-full flex-col p-4">
      <h2 className="mb-5 text-center text-5xl">Shop</h2>
      {isShopMainPage && (
        <div className="md:auto-rows-35rem grid auto-rows-fr grid-cols-2 gap-2 md:grid-cols-4">
          {items.map((item) => {
            return <ShopItem key={item.id} item={item} isMobile={isMobile} />;
          })}
        </div>
      )}
      <Outlet context={{ items }} />
    </div>
  );
}
