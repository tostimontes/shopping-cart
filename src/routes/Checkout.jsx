/* eslint-disable react/jsx-key */
import { useOutletContext, useParams, Link } from 'react-router-dom';
import Button from '../components/Button';
import { mdiCart, mdiTrashCanOutline } from '@mdi/js';
import { useState } from 'react';
import useItemQuantity from '../hooks/useItemQuantity';

export default function Checkout() {
  // const { itemId } = useParams();
  const { cartItems, updateCart, isMobile } = useOutletContext();
  const [itemQuantities, setItemQuantities] = useState(() =>
    cartItems.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {}),
  );
  const [updatedItems, setUpdatedItems] = useState({}); // New state to track updates

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

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-2 p-4">
      <h2 className="text-center text-4xl">Cart</h2>
      {cartItems.length > 0 && (
        <p>
          {`Total: ${cartItems
            .reduce((total, currentItem) => {
              return total + currentItem.price * currentItem.quantity;
            }, 0)
            .toFixed(2)}€`}
        </p>
      )}

      {cartItems.length > 0 ? (
        <>
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
                        handleQuantityChange(item.id, Number(e.target.value))
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
            Continue shopping
          </Link>
        </>
      ) : (
        <>
          <p>Your cart is empty!</p>
          <Link to={'/shop'}>Shop now!</Link>
        </>
      )}
    </div>
  );
}