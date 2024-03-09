import { useState } from 'react';

const useItemQuantity = (initialQuantity = 1) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleQuantityChange = (event) => {
    setQuantity(Math.max(1, Math.min(Number(event.target.value), 100)));
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 100));
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  return {
    quantity,
    handleQuantityChange,
    incrementQuantity,
    decrementQuantity,
  };
};

export default useItemQuantity;
