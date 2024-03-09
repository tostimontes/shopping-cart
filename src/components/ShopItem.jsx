import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { mdiCart } from '@mdi/js';
import { useState } from 'react';

const ShopItem = ({ item, isMobile }) => {
  const [itemQuantity, setItemQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setItemQuantity(Math.max(1, Math.min(event.target.value, 100)));
  };

  const incrementQuantity = () => {
    setItemQuantity((prevQuantity) => Math.min(prevQuantity + 1, 100));
  };

  const decrementQuantity = () => {
    setItemQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
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
            value={itemQuantity}
            onChange={handleQuantityChange}
            min={1}
            max={100}
          />
          <Button
            onClick={incrementQuantity}
            text="+"
            className="size-8 rounded-full"
          />
          <Button text={!isMobile && 'Add to cart'} iconPath={mdiCart} />
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
