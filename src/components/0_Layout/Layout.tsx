import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../1_Header/Header';

export const Layout: React.FC = () => {
  return (
    <>
      <h1>Layout</h1>
      <Header />

      <Outlet />

      <footer className="nav" />
      <p className="title">My picture</p>
    </>
  );
};
