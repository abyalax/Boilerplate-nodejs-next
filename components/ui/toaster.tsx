'use client';

import { ToastContainer } from 'react-toastify';

export const Toaster = () => {
  return <ToastContainer autoClose={5000} position="top-center" draggable={true} />;
};
