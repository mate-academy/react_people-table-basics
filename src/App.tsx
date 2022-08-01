import { memo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bulma/css/bulma.css';
import {
  Header,
  HomePage,
  PeoplePage,
  NotFoundPage,
} from './components';
import './App.scss';

const App = memo(() => {
  return (
    <div className="App">

      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="/home" element={<Navigate replace to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
});

export default App;
