import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = forwardRef(({ open, shopItems, toggleSidebar }, ref) => {
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

  const categories = new Set();
  shopItems.forEach((item) => {
    categories.add(item.category.toLowerCase());
  });

  return (
    <>
      <aside
        ref={ref}
        className={`${open ? 'z-10 scale-100 opacity-100' : '-z-10 scale-95 opacity-0'} md:w-4/10 fixed left-0 top-16 h-full w-3/4 origin-top-left bg-yellow-200 p-4 transition-opacity transition-transform duration-300 ease-out md:top-20`}
      >
        <ul className="flex flex-col gap-6">
          {[...categories].map((category) => {
            return (
              <Link
                to={`/shop?category=${category}`}
                key={category}
                onClick={toggleSidebar}
                className="rounded-xl text-2xl hover:bg-gray-50"
              >
                <li>&gt; {toTitleCase(category)}</li>
              </Link>
            );
          })}
        </ul>
      </aside>
    </>
  );
});

export default Sidebar;
