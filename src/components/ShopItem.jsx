import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { mdiCart } from '@mdi/js';
import useItemQuantity from '../hooks/useItemQuantity';

const ShopItem = ({ item, isMobile, isLaptop, updateCart }) => {
  const {
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
      <Link to={`/shop/${item.id}`} className="h-2/5">
        <img
          className="h-full object-contain lg:max-h-60 lg:w-full"
          src={item.image}
          alt={item.title}
        />
      </Link>
      <div className="flex h-3/5 flex-col">
        <Link to={`/shop/${item.id}`} className="flex h-4/5 flex-col gap-2">
          <p className="italic">{item.price}€</p>
          <h3 className="text-lg font-bold">{item.title}</h3>
          <p className="hidden overflow-y-auto lg:block lg:text-sm">
            {item.description}
          </p>
        </Link>
        <div className="flex h-1/5 items-center gap-2 place-self-end">
          <Button
            onClick={decrementQuantity}
            text="-"
            className="size-8 rounded-full "
          />
          <input
            type="number"
            className="flex w-10 items-center border border-gray-900 p-2 text-center"
            value={inputValue}
            onChange={handleQuantityChange}
            onBlur={handleBlur}
            min={1}
            max={100}
          />
          <Button
            onClick={incrementQuantity}
            text="+"
            className="size-8 rounded-full "
          />
          <Button
            iconPath={mdiCart}
            onClick={() => handleUpdateCart(item, parseInt(inputValue))}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
