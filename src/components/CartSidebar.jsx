/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
import { forwardRef, useState } from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import useItemQuantity from '../hooks/useItemQuantity';
import { mdiTrashCanOutline } from '@mdi/js';

// TODO: buttons should update state in App
// TODO: calculate totals here, in checkout etc
// TODO: decrementing to less than 1 removes item

const CartSidebar = forwardRef(
  ({ open, cartItems, handleUpdateCart, isMobile, toggleCart }, ref) => {
    const [itemQuantities, setItemQuantities] = useState(() =>
      cartItems.reduce(
        (acc, item) => ({ ...acc, [item.id]: item.quantity }),
        {},
      ),
    );
    const [updatedItems, setUpdatedItems] = useState({}); // New state to track updates

    const handleSaveChanges = (itemId) => {
      handleUpdateCart(
        {
          ...cartItems.find((item) => item.id === itemId),
          quantity: itemQuantities[itemId],
        },
        itemQuantities[itemId],
        false,
      );
      setUpdatedItems((prev) => ({ ...prev, [itemId]: false }));
    };

    const handleQuantityChange = (itemId, newQuantity) => {
      setItemQuantities((prev) => ({ ...prev, [itemId]: newQuantity }));
      setUpdatedItems((prev) => ({ ...prev, [itemId]: true }));
    };

    const incrementQuantity = (itemId) => {
      const currentQuantity = itemQuantities[itemId];
      const newQuantity = currentQuantity < 100 ? currentQuantity + 1 : 100;
      handleQuantityChange(itemId, newQuantity);
    };

    const decrementQuantity = (itemId) => {
      const currentQuantity = itemQuantities[itemId];
      const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
      handleQuantityChange(itemId, newQuantity);
    };

    const handleToggleCart = () => {
      toggleCart();
    };

    return (
      <>
        <aside
          ref={ref}
          className={`${open ? 'z-10 scale-100 opacity-100' : '-z-10 scale-95 opacity-0'} fixed right-0 top-16 h-full w-3/4 origin-top-right bg-yellow-200 p-4 transition-opacity transition-transform duration-300 ease-out`}
        >
          {cartItems.length > 0 ? (
            <div className="flex flex-col items-center gap-2">
              {cartItems.map((item) => {
                return (
                  <div className="flex bg-yellow-50">
                    <Link to={`/shop/${item.id}`} className="h-3/5">
                      <img
                        className="w-16 object-contain"
                        src={item.image}
                        alt={item.title}
                      />
                    </Link>
                    <div className="flex h-full flex-col">
                      <Link
                        to={`/shop/${item.id}`}
                        className="flex h-4/5 flex-col gap-2"
                      >
                        <p className="italic">{item.price}€</p>
                        <h3 className="overflow-scroll text-lg font-bold">
                          {item.title}
                        </h3>
                        <p className="hidden overflow-scroll lg:block">
                          {item.description}
                        </p>
                      </Link>
                      <div className="flex h-1/5 items-center gap-2 place-self-end">
                        {updatedItems[item.id] && (
                          <Button
                            onClick={() => handleSaveChanges(item.id)}
                            text="Save Changes"
                          />
                        )}
                        <Button
                          onClick={() => decrementQuantity(item.id)}
                          text="-"
                          className="size-8 rounded-full"
                        />
                        <input
                          type="number"
                          className="flex size-8 items-center border border-gray-900 p-2"
                          value={itemQuantities[item.id]}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              Number(e.target.value),
                            )
                          }
                          min={1}
                          max={100}
                        />
                        <Button
                          onClick={() => incrementQuantity(item.id)}
                          text="+"
                          className="size-8 rounded-full"
                        />
                        <Button
                          text={!isMobile && 'Remove'}
                          iconPath={mdiTrashCanOutline}
                          onClick={() => handleUpdateCart(item, 0, false)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
              <p>
                {`Total: ${cartItems
                  .reduce((total, currentItem) => {
                    return total + currentItem.price * currentItem.quantity;
                  }, 0)
                  .toFixed(2)}€`}
              </p>
              <Link onClick={handleToggleCart} to={'/shop'} className="">
                Continue shopping
              </Link>
              <Link onClick={handleToggleCart} to={'/checkout'}>
                Checkout
              </Link>
            </div>
          ) : (
            <>
              <p>Your cart is empty!</p>
              <Link onClick={handleToggleCart} to={'/shop'}>
                Shop now!
              </Link>
            </>
          )}
        </aside>
      </>
    );
  },
);

export default CartSidebar;
