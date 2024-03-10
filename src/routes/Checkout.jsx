/* eslint-disable react/jsx-key */
import { useOutletContext, useParams, Link } from 'react-router-dom';
import Button from '../components/Button';
import { mdiCart, mdiCash, mdiShopping, mdiTrashCanOutline } from '@mdi/js';
import { useState } from 'react';
import useItemQuantity from '../hooks/useItemQuantity';

export default function Checkout() {
  // const { itemId } = useParams();
  const {
    cartItems,
    updateCart,
    isMobile,
    itemQuantities,
    updateItemQuantity,
  } = useOutletContext();

  const [updatedItems, setUpdatedItems] = useState({});

  const handleSaveChanges = (itemId) => {
    updateCart(
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
    updateItemQuantity(itemId, newQuantity);
    setUpdatedItems((prev) => ({ ...prev, [itemId]: true }));
  };

  const decrementQuantity = (itemId) => {
    const newQuantity =
      itemQuantities[itemId] > 1 ? itemQuantities[itemId] - 1 : 1;
    updateItemQuantity(itemId, newQuantity);
    setUpdatedItems((prev) => ({ ...prev, [itemId]: true }));
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-2 p-4">
      <h2 className="text-center text-5xl">Cart</h2>
      {cartItems.length > 0 && (
        <div className="flex gap-2">
          <p className="text-2xl">Total:</p>
          <p className="text-2xl font-bold">
            {` ${cartItems
              .reduce((total, currentItem) => {
                return total + currentItem.price * currentItem.quantity;
              }, 0)
              .toFixed(2)}€`}
          </p>
        </div>
      )}

      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => {
            return (
              <div className="flex w-full items-center gap-2 rounded-lg bg-yellow-50 p-2">
                <Link to={`/shop/${item.id}`} className="w-1/5">
                  <img
                    className="object-contain"
                    src={item.image}
                    alt={item.title}
                  />
                </Link>
                <div className="flex h-full w-4/5 flex-col">
                  <Link
                    to={`/shop/${item.id}`}
                    className="flex h-4/5 flex-col gap-2"
                  >
                    <h3 className="overflow-scroll text-lg font-bold">
                      {item.title}
                    </h3>
                    <p className="place-self-end text-2xl italic">
                      {item.price}€
                    </p>
                    <p className="hidden overflow-scroll lg:block">
                      {item.description}
                    </p>
                  </Link>
                  <div className="flex h-1/5 items-center justify-end gap-2 ">
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
                      className="flex w-12 items-center justify-center border border-gray-900 p-2 text-center"
                      value={itemQuantities[item.id]}
                      onChange={(e) =>
                        updateItemQuantity(
                          item.id,
                          Math.max(1, Math.min(Number(e.target.value), 100)),
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
                      onClick={() => updateCart(item, 0, false)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <Link to={'/shop'} className="">
            <Button text={'Continue shopping'} />
          </Link>
          <div onClick={() => alert(`You ain't got no money for this`)}>
            <Button
              text={'Pay now'}
              iconPath={mdiCash}
              size={2}
              className="gap-2 bg-orange-600 p-3 text-4xl"
            />
          </div>
        </>
      ) : (
        <>
          <p>Your cart is empty!</p>
          <Link to={'/shop'}>
            <Button
              text={'Shop now!'}
              iconPath={mdiShopping}
              className="flex items-center gap-2"
            />
          </Link>
        </>
      )}
    </div>
  );
}
