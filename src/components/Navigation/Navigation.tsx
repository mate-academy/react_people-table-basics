import React from 'react';
import { Outlet } from 'react-router-dom';
import { HeadOfTable } from '../HeadOfTable/HeadOfTable';

export const Navigation: React.FC = () => {
  return (
    <>
      <HeadOfTable />
      <Outlet />
    </>
  );
};
