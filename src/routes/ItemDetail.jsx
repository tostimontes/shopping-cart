// ItemDetail.jsx
import { useState } from 'react';
import { useParams, useOutletContext, Link } from 'react-router-dom';
import Button from '../components/Button';
import { mdiCart } from '@mdi/js';
import useItemQuantity from '../hooks/useItemQuantity';

const ItemDetail = () => {
  const { shopItems, updateCart } = useOutletContext();
  const { itemId } = useParams();
  const {
    quantity,
    handleBlur,
    inputValue,
    handleQuantityChange,
    incrementQuantity,
    decrementQuantity,
  } = useItemQuantity();
  const handleAddToCart = (item, quantity) => {
    updateCart(item, quantity);
  };

  const item = shopItems.find((item) => item.id === parseInt(itemId));
  // ... Render item details ...
  if (item) {
    return (
      <div className="flex w-full flex-col justify-between bg-white p-2">
        <img
          className="h-full object-contain"
          src={item.image}
          alt={item.title}
        />

        <div className="flex h-2/5 flex-col text-2xl">
          <Link to={`/shop/${item.id}`} className="flex h-4/5 flex-col gap-2">
            <p className="italic">{item.price}€</p>
            <h3 className="overflow-scroll font-bold">{item.title}</h3>
            <p className="py-4 text-xl">{item.description}</p>
          </Link>
          <div className="flex h-1/5 items-center gap-2 place-self-end text-3xl">
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
              text="Add to cart"
              onClick={() => handleAddToCart(item, parseInt(inputValue))}
              iconPath={mdiCart}
            />
          </div>
        </div>
      </div>
    );
  }
  return <p>No item found</p>;
};
export default ItemDetail;
