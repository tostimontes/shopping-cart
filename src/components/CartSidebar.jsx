/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
import { forwardRef, useState } from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import useItemQuantity from '../hooks/useItemQuantity';
import { mdiCartCheck, mdiTrashCanOutline } from '@mdi/js';

const CartSidebar = forwardRef(
  (
    {
      open,
      cartItems,
      handleUpdateCart,
      isMobile,
      toggleCart,
      itemQuantities,
      handleItemQuantityUpdate,
    },
    ref,
  ) => {
    const [updatedItems, setUpdatedItems] = useState({});

    const trimText = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    };

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

    const incrementQuantity = (itemId) => {
      const newQuantity =
        itemQuantities[itemId] < 100 ? itemQuantities[itemId] + 1 : 100;
      handleItemQuantityUpdate(itemId, newQuantity);
      setUpdatedItems((prev) => ({ ...prev, [itemId]: true }));
    };

    const decrementQuantity = (itemId) => {
      const newQuantity =
        itemQuantities[itemId] > 1 ? itemQuantities[itemId] - 1 : 1;
      handleItemQuantityUpdate(itemId, newQuantity);
      setUpdatedItems((prev) => ({ ...prev, [itemId]: true }));
    };

    const handleToggleCart = () => {
      toggleCart();
    };

    return (
      <>
        <aside
          ref={ref}
          className={`${open ? 'z-10 scale-100 opacity-100' : '-z-10 scale-95 opacity-0'} max-h-80vh fixed right-0 top-16 h-full w-3/4 origin-top-right overflow-scroll bg-yellow-200 p-4 shadow-xl transition-opacity transition-transform duration-300 ease-out`}
        >
          {cartItems.length > 0 ? (
            <div className="flex h-full flex-col items-center pb-40">
              <div className=" flex flex-col items-center gap-2 overflow-y-auto">
                {cartItems.map((item) => {
                  return (
                    <div className="flex h-44 w-full items-center gap-2 rounded-md bg-yellow-50 p-1">
                      <Link to={`/shop/${item.id}`} className="w-1/5">
                        <img
                          className="h-full w-full object-contain"
                          src={item.image}
                          alt={item.title}
                        />
                      </Link>
                      <div className="flex h-full w-4/5 flex-col py-1">
                        <div className="h-4/10 overflow-y-auto p-1">
                          <Link to={`/shop/${item.id}`}>
                            <p className="whitespace-normal text-lg font-bold">
                              {trimText(item.title, 35)}
                            </p>
                          </Link>
                        </div>
                        <div className="h-3/10 flex-col justify-between place-self-end pr-2">
                          <p className="text-xl italic">{item.price}€</p>
                          <p className="hidden lg:block">{item.description}</p>
                        </div>
                        <div className="h-3/10 flex items-center justify-end gap-2 p-1">
                          {updatedItems[item.id] && (
                            <Button
                              onClick={() => handleSaveChanges(item.id)}
                              text={isMobile ? 'Save' : 'Save Changes'}
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
                              handleItemQuantityUpdate(
                                item.id,
                                Math.max(
                                  1,
                                  Math.min(Number(e.target.value), 100),
                                ),
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
              </div>
              <div
                className="absolute bottom-4
               mx-4 flex w-5/6 flex-col items-center gap-2 rounded-xl bg-yellow-100 p-2 shadow"
              >
                <p className="text-2xl font-bold">
                  {`Total: ${cartItems
                    .reduce((total, currentItem) => {
                      return total + currentItem.price * currentItem.quantity;
                    }, 0)
                    .toFixed(2)}€`}
                </p>
                <Link onClick={handleToggleCart} to={'/shop'} className="">
                  <Button text={'Continue shopping'} />
                </Link>
                <Link onClick={handleToggleCart} to={'/checkout'}>
                  <Button
                    text={'Checkout'.toUpperCase()}
                    iconPath={mdiCartCheck}
                    className="bg-orange-600 text-2xl font-bold"
                  />
                </Link>
              </div>
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
