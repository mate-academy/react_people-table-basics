import './App.scss';
import { useRoutes } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Header } from './components/Header/Header';

const App: React.FC = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/people',
      element: <PeoplePage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  return (
    <div>
      <Header />
      {routes}
    </div>
  );
};

export default App;
