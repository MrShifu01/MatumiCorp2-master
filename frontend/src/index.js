import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TransactionsPage from './pages/TransactionsPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import { Provider } from 'react-redux';
import store from './redux/store';
import AdminPage from './pages/AdminPage';
import EditTransactionPage from './pages/EditTransactionPage';
import { QueryClient, QueryClientProvider } from "react-query";
import {  ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path:'/transactions',
    element: <TransactionsPage />,
  },
  {
    path: '/transactions/search/:keyword',
    element: <TransactionsPage />,
  },
  {
    path: '/admin/transactions', 
    element: <AdminPage />,
  },
  {
    path: '/admin/transactions/edit/:id',
    element: <EditTransactionPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Provider>
);
