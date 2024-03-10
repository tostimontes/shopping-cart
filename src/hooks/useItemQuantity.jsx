import { useState } from 'react';

const useItemQuantity = (initialQuantity = 1) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [inputValue, setInputValue] = useState(initialQuantity.toString());

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value === '') return;
    setQuantity(Math.max(1, Math.min(Number(value), 100)));
  };

  const handleBlur = () => {
    if (inputValue === '') {
      setInputValue(quantity.toString());
    } else {
      setQuantity(Math.max(1, Math.min(Number(inputValue), 100)));
    }
  };

  const incrementQuantity = () => {
    const newQuantity = Math.min(quantity + 1, 100);
    setQuantity(newQuantity);
    setInputValue(newQuantity.toString());
  };

  const decrementQuantity = () => {
    const newQuantity = Math.max(quantity - 1, 1);
    setQuantity(newQuantity);
    setInputValue(newQuantity.toString());
  };

  return {
    quantity,
    inputValue,
    handleQuantityChange,
    handleBlur,
    incrementQuantity,
    decrementQuantity,
  };
};

export default useItemQuantity;
