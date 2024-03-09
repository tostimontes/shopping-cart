import { forwardRef } from 'react';

const Sidebar = forwardRef(({ open }, ref) => {
  // TODO: map over the fetched items to show whatever categories
  return (
    <>
      <aside
        ref={ref}
        className={`${open ? 'scale-100 opacity-100 z-10' : 'scale-95 opacity-0 -z-10'} fixed left-0 top-16 h-full w-3/4 origin-top-left bg-yellow-200 p-4 transition-opacity transition-transform duration-300 ease-out`}
      >
        <ul>Clothing +</ul>
        <li className=""></li>
        <ul>Accessories +</ul>
      </aside>
    </>
  );
});

export default Sidebar;
