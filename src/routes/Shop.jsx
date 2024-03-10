import { useEffect, useState } from 'react';
import ShopItem from '../components/ShopItem';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import Button from '../components/Button';
import { mdiChevronDoubleLeft, mdiFilter } from '@mdi/js';

export default function Shop() {
  const location = useLocation();
  const isShopMainPage = location.pathname === '/shop';
  const { updateCart, isMobile, isLaptop, shopItems, fetchError } =
    useOutletContext();
  const [selectedCategories, setSelectedCategories] = useState({});
  const [filtersVisible, setFiltersVisible] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategories({ [category]: true });
    }
  }, [location]);

  const uniqueCategories = Array.from(
    new Set(shopItems.map((item) => item.category)),
  );
  const toggleFilters = () => {
    setFiltersVisible((prev) => !prev);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) =>
        word[0] !== "'" && word.length > 1
          ? word.charAt(0).toUpperCase() + word.slice(1)
          : word,
      )
      .join(' ');
  };

  return (
    <div className="flex w-full flex-col p-4">
      <h2 className="mb-5 text-center text-5xl">Shop</h2>
      {fetchError && (
        <p className="min-h-screen text-center text-red-500">
          Failed to load products. Please try again later.
        </p>
      )}
      <div
        className={`${isShopMainPage ? 'fixed' : 'absolute'} top-20 mt-2 md:top-24`}
      >
        {isShopMainPage ? (
          <Button
            onClick={toggleFilters}
            className="filters-toggle-button"
            iconPath={mdiFilter}
            text={filtersVisible ? 'Hide Filters' : 'Show Filters'}
          ></Button>
        ) : (
          <Link to={'/shop'} className="">
            <Button text={'Back to shop'} iconPath={mdiChevronDoubleLeft} />
          </Link>
        )}

        {filtersVisible && (
          <>
            <div className="flex flex-col gap-2 bg-orange-400 p-2">
              {uniqueCategories.map((category) => (
                <label key={category} className="">
                  <input
                    className="mr-2 size-4 pt-1"
                    type="checkbox"
                    checked={selectedCategories[category]}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {toTitleCase(category)}
                </label>
              ))}
            </div>
            <Button
              onClick={() => setSelectedCategories({})}
              text={'Clear All'}
            ></Button>
          </>
        )}
      </div>

      {isShopMainPage && (
        <div className="grid auto-rows-fr grid-cols-2 gap-2 md:auto-rows-35rem md:grid-cols-4 lg:grid-cols-6">
          {shopItems
            .filter((item) => {
              const noCategoriesSelected = Object.values(
                selectedCategories,
              ).every((val) => !val);
              return noCategoriesSelected || selectedCategories[item.category];
            })
            .map((item) => {
              return (
                <ShopItem
                  key={item.id}
                  item={item}
                  isMobile={isMobile}
                  isLaptop={isLaptop}
                  updateCart={updateCart}
                />
              );
            })}
        </div>
      )}
      <Outlet context={{ shopItems, updateCart, isMobile }} />
    </div>
  );
}
