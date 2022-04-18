import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import 'bulma/css/bulma.css';
import { Header } from './components';
import './App.scss';

const App = memo(() => {
  return (
    <div className="App">

      <Header />

      <Outlet />
    </div>
  );
});

export default App;
