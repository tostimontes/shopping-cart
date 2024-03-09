import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import ErrorPage from './ErrorPage';
import Shop from './Shop';
import Home from './Home';
import ItemDetail from './ItemDetail';
import Checkout from './Checkout';

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
          path: 'checkout',
          element: <Checkout />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
