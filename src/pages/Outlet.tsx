import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';

const Layout = () => {
  return (
    <>
      <Navbar />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
