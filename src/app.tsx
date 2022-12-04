import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createStandaloneToast } from '@chakra-ui/react';
import { ErrorBoundary } from './components/error-boundary';
import { Layout } from './components/layout';
import { Grades } from './views/grades';
import { Home } from './views/home';
import { homeroomLoader, Homerooms } from './views/homerooms';
import { Students } from './views/students';

const { toast, ToastContainer } = createStandaloneToast();
const routes = [
  {
    path: '/',
    element: (
      <>
        <Layout />
        <ToastContainer />
      </>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '',
        element: <Home />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'homerooms',
        element: <Homerooms />,
        errorElement: <ErrorBoundary />,
        loader: async () => homeroomLoader(toast),
      },
      {
        path: 'students',
        element: <Students />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'grades',
        element: <Grades />,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export const App = () => {
  return <RouterProvider router={router} />;
};
