import { mdiAccount, mdiCart, mdiClose, mdiMagnify, mdiMenu } from '@mdi/js';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';

export default function Navbar() {
  // TODO: set a state that changes the sidebar icon when its open
  // TODO: the search icon should open a fuzzy search bar with highlighting
  //   TODO: cart icon should open cart on same page until go to checkout
  return (
    <>
      <nav className="sticky top-0 flex w-full items-center justify-around bg-orange-700 p-4 text-yellow-100">
        <Icon path={mdiMenu} size={1} />
        <Icon path={mdiClose} size={1} className="hidden" />
        <Icon path={mdiMagnify} size={1} />
        <input
          type="text"
          className="hidden rounded-xl px-2 py-1 text-gray-950"
        />
        <Link to={'/home'}>
          <h1 className="text-4xl text-yellow-300 ">AliBrava</h1>
        </Link>
        <Icon path={mdiAccount} size={1} />
        <Icon path={mdiCart} size={1} />
      </nav>
    </>
  );
}
