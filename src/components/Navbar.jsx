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
  isLaptop,
  handleItemQuantityUpdate,
  itemQuantities,
  shopItems,
  handleSearch,
  searchResults,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const sidebar = useRef();
  const sidebarButton = useRef();
  const cart = useRef();
  const cartButton = useRef();
  const searchInput = useRef();

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

  useEffect(() => {
    if (isSearchOpen) {
      searchInput.current.focus();
    }
  }, [isSearchOpen]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
  };

  const totalItemsInCart = cartItems.reduce((totalItems, curr) => {
    return (totalItems += curr.quantity);
  }, 0);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      setIsSearchOpen(false);
      setIsCartOpen(false);
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    if (!isCartOpen) {
      setIsSearchOpen(false);
      setIsSidebarOpen(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setIsSidebarOpen(false);
      setIsCartOpen(false);
    }
  };

  const highlightMatch = (text, query) => {
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (part.toLowerCase() === query.toLowerCase()) {
        return <mark key={index}>{part}</mark>;
      } else {
        return part;
      }
    });
  };

  return (
    <>
      <nav
        className={`${showNavbar ? 'top-0' : '-top-16 md:-top-20'} transition-top sticky z-20 flex h-16  w-full items-center justify-around bg-orange-700 p-4 text-yellow-100 duration-300 ease-in-out md:h-20 lg:mx-auto lg:justify-center lg:gap-36 xl:gap-48`}
      >
        <button type="button" onClick={toggleSidebar} ref={sidebarButton}>
          <Icon
            path={isSidebarOpen ? mdiClose : mdiMenu}
            className="size-8 md:size-10"
          />
        </button>
        <Icon
          path={isSearchOpen ? mdiClose : mdiMagnify}
          onClick={toggleSearch}
          className="size-8 md:size-10"
        />
        <input
          ref={searchInput}
          type="text"
          placeholder="Search"
          className={`${isSearchOpen ? 'block' : 'hidden'} flex rounded-full px-4 py-2 text-gray-900 focus:outline-none md:w-3/6`}
          value={searchQuery}
          onChange={handleInputChange}
        />
        {isSearchOpen && searchQuery !== '' && (
          <ul className="search-results absolute top-16  flex max-h-96 w-3/5 flex-col gap-2 overflow-y-auto bg-yellow-50 p-2 text-black shadow-xl md:top-20">
            {searchResults.length > 0 ? (
              searchResults.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/shop/${item.id}`}
                    className="flex items-center gap-2 rounded-lg bg-gray-50 p-2 hover:bg-gray-100"
                    onClick={toggleSearch}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-1/6 object-contain"
                    />
                    <h3 className="w-5/6">
                      {highlightMatch(item.title, searchQuery)}
                    </h3>
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-xl md:text-2xl">No results found</li>
            )}
          </ul>
        )}
        <Link to={'/home'} className={`${isSearchOpen ? 'hidden' : 'block'}`}>
          <h1 className="text-4xl text-yellow-300 md:text-5xl ">AliBrava</h1>
        </Link>
        <Icon path={mdiAccount} className="size-8 md:size-10" />
        <button
          type="button"
          onClick={toggleCart}
          ref={cartButton}
          className="relative"
        >
          <Icon path={mdiCart} className="size-8 md:size-10" />
          {totalItemsInCart > 0 && (
            <div className="absolute -right-3 -top-3 flex size-4 items-center justify-center rounded-full bg-yellow-300 p-3  text-black">
              {totalItemsInCart}
            </div>
          )}
        </button>
      </nav>
      <Sidebar
        open={isSidebarOpen}
        ref={sidebar}
        shopItems={shopItems}
        toggleSidebar={toggleSidebar}
      />
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
