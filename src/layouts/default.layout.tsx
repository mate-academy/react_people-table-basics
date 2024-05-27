import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const DefaultLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default DefaultLayout;
