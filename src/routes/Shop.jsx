import { useEffect, useState } from 'react';
import Button from '../components/Button';
import { mdiCart } from '@mdi/js';

// TODO: use a react router loader for the prefetch

export default function Shop() {
  const [items, setItems] = useState([]);

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
      <div className="grid  auto-rows-fr grid-cols-2  gap-2 md:grid-cols-4">
        {items.map((item) => {
          return (
            <div
              key={item.id}
              id={item.id}
              className="flex w-full flex-col justify-between bg-white p-2"
            >
              <img
                className="h-3/5 object-contain"
                src={item.image}
                alt={item.title}
              />
              <div className="flex h-2/5 flex-col justify-between">
                <div className="flex">
                  <h3>{item.title}</h3>
                  <p>{item.price}€</p>
                </div>
                <div className="flex place-self-end">
                  <Button text="-" />
                  <input
                    type="number"
                    className="size-8 border border-gray-900"
                  />
                  <Button text="+" />
                </div>
                <Button text="Add to cart" iconPath={mdiCart} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
