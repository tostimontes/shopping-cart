import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { mdiCart } from '@mdi/js';
import { useState } from 'react';
import useItemQuantity from '../hooks/useItemQuantity';

const ShopItem = ({ item, isMobile, updateCart }) => {
  const {
    quantity,
    handleBlur,
    inputValue,
    handleQuantityChange,
    incrementQuantity,
    decrementQuantity,
  } = useItemQuantity();

  const handleUpdateCart = (item, quantity) => {
    updateCart(item, quantity, true);
  };

  return (
    <div className="flex w-full flex-col justify-between bg-white p-2">
      <Link to={`/shop/${item.id}`} className="h-3/5">
        <img
          className="h-full object-contain"
          src={item.image}
          alt={item.title}
        />
      </Link>
      <div className="flex h-2/5 flex-col">
        <Link to={`/shop/${item.id}`} className="flex h-4/5 flex-col gap-2">
          <p className="italic">{item.price}€</p>
          <h3 className="overflow-scroll text-lg font-bold">{item.title}</h3>
          <p className="hidden overflow-scroll lg:block">{item.description}</p>
        </Link>
        <div className="flex h-1/5 items-center gap-2 place-self-end">
          <Button
            onClick={decrementQuantity}
            text="-"
            className="size-8 rounded-full"
          />
          <input
            type="number"
            className="flex size-8 items-center border border-gray-900 p-2"
            value={inputValue}
            onChange={handleQuantityChange}
            onBlur={handleBlur}
            min={1}
            max={100}
          />
          <Button
            onClick={incrementQuantity}
            text="+"
            className="size-8 rounded-full"
          />
          <Button
            text={!isMobile && 'Add to cart'}
            iconPath={mdiCart}
            onClick={() => handleUpdateCart(item, parseInt(inputValue))}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
