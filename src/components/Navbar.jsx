import { mdiAccount, mdiCart, mdiClose, mdiMagnify, mdiMenu } from '@mdi/js';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import Sidebar from './Sidebar';
import { useEffect, useRef, useState } from 'react';
import CartSidebar from './CartSidebar';

export default function Navbar({
  cartItems,
  handleUpdateCart,
  isMobile,
  handleItemQuantityUpdate,
  itemQuantities
}) {
  // TODO: the search icon should open a fuzzy search bar with highlighting
  //   TODO: cart icon should open cart on same page until go to checkout
  // ! TODO: sidebar like cart and carte checkout route

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const sidebar = useRef();
  const sidebarButton = useRef();
  const cart = useRef();
  const cartButton = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= lastScrollY) {
        // Scrolling up or at the top of the page
        setShowNavbar(true);
      } else {
        // Scrolling down
        setShowNavbar(false);
      }

      setLastScrollY(currentScrollY);
    };

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOrTouchOutside = (event) => {
      if (
        sidebar.current &&
        !sidebar.current.contains(event.target) &&
        !sidebarButton.current.contains(event.target) &&
        cart.current &&
        !cart.current.contains(event.target) &&
        !cartButton.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOrTouchOutside);
    document.addEventListener('touchstart', handleClickOrTouchOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOrTouchOutside);
      document.removeEventListener('touchstart', handleClickOrTouchOutside);
    };
  }, []);

  const totalItemsInCart = cartItems.reduce((totalItems, curr) => {
    return (totalItems += curr.quantity);
  }, 0);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <nav
        className={`${showNavbar ? 'top-0' : '-top-16'} transition-top sticky z-20 flex h-16 w-full items-center justify-around bg-orange-700 p-4 text-yellow-100 duration-300 ease-in-out`}
      >
        <button type="button" onClick={toggleSidebar} ref={sidebarButton}>
          <Icon path={isSidebarOpen ? mdiClose : mdiMenu} size={1} />
        </button>
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
        <button
          type="button"
          onClick={toggleCart}
          ref={cartButton}
          className="relative"
        >
          <Icon path={mdiCart} size={1} />
          {totalItemsInCart > 0 && (
            <div className="absolute -right-3 -top-3 flex size-4 items-center justify-center rounded-full bg-yellow-300 p-3  text-black">
              {totalItemsInCart}
            </div>
          )}
        </button>
      </nav>
      <Sidebar open={isSidebarOpen} ref={sidebar} />
      <CartSidebar
        open={isCartOpen}
        ref={cart}
        cartItems={cartItems}
        handleUpdateCart={handleUpdateCart}
        itemQuantities={itemQuantities}
        handleItemQuantityUpdate={handleItemQuantityUpdate}
        isMobile={isMobile}
        toggleCart={toggleCart}
      />
    </>
  );
}
