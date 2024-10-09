import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Faq from './pages/Faq';
import BadRoute from './pages/BadRoute';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <BadRoute />,
    children: [
      {
        index: true,
        element: <Root />
      },
      {
        path: "faq",
        element: <Faq />,
      }
    ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<RouterProvider router={router} />);