import { useEffect, useState } from 'react';
import ShopItem from '../components/ShopItem';
import { Outlet, useLocation, useOutletContext } from 'react-router-dom';

// TODO: use a react router loader for the prefetch

export default function Shop() {

  const location = useLocation();
  const isShopMainPage = location.pathname === '/shop';
  const { updateCart, isMobile, shopItems, fetchError } = useOutletContext();


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
          {shopItems.map((item) => {
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
      <Outlet context={{ shopItems, updateCart }} />
    </div>
  );
}
