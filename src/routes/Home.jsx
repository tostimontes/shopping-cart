import Icon from '@mdi/react';
import Button from '../components/Button';
import { mdiShopping } from '@mdi/js';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center gap-8 p-16">
      <h2 className="text-center text-3xl">
        Welcome to the all-in-one yet probably what you want is out-of-stock
        universal store!
      </h2>
      <Link
        to={'/shop'}
        className="flex w-fit scale-100 items-center gap-2 rounded-md bg-orange-500 p-3 text-2xl text-yellow-100 transition-all duration-200 hover:bg-orange-600 focus:outline-none active:scale-95 "
      >
        <Icon path={mdiShopping} size={1} />
        <span>Shop now!</span>
      </Link>
    </div>
  );
}
