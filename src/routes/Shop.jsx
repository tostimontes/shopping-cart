import { useEffect, useState } from 'react';
import ShopItem from '../components/ShopItem';
import { Outlet, useLocation, useOutletContext } from 'react-router-dom';
import Button from '../components/Button';
import { mdiFilter } from '@mdi/js';

// TODO: use a react router loader for the prefetch

export default function Shop() {
  const location = useLocation();
  const isShopMainPage = location.pathname === '/shop';
  const { updateCart, isMobile, shopItems, fetchError } = useOutletContext();
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

  // ... rest of the component ...

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
      <div className="fixed top-20 mt-2">
        <Button
          onClick={toggleFilters}
          className="filters-toggle-button"
          iconPath={mdiFilter}
          text={filtersVisible ? 'Hide Filters' : 'Show Filters'}
        ></Button>

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
        <div className="grid auto-rows-fr grid-cols-2 gap-2 md:auto-rows-35rem md:grid-cols-4">
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
                  updateCart={updateCart}
                />
              );
            })}
        </div>
      )}
      <Outlet context={{ shopItems, updateCart }} />
    </div>
  );
}
