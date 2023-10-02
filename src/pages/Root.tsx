import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/Navigation/Navigation';

function RootLayout() {
  return (
    <>
      <div data-cy="app">
        <MainNavigation />
        <main className="section">
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}

export default RootLayout;
