import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const DefaultLayout = () => (
  <>
    <Navbar />
    <div className="section">
      <div className="container">
        <Outlet />
      </div>
    </div>
  </>
);

export default DefaultLayout;
