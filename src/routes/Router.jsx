import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import ErrorPage from './ErrorPage';
import Shop from './Shop';
import Home from './Home';
import Cart from './Cart';
import ItemDetail from './ItemDetail';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: 'shop',
          element: <Shop />,
          children: [
            {
              path: ':itemId',
              element: <ItemDetail />,
            },
          ],
        },
        {
          path: 'cart',
          element: <Cart />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
