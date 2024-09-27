import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navigation } from './components/Navigation/Navigation';

export const App = () => (
  <>
  <Navigation />
  <Outlet />
</>
);







