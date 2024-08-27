import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { NotFound } from './components/NotFound/NotFound';
import { Home } from './components/Home/Home';
import { People } from './components/People/People';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Navigate to=".." />} />
          <Route path="/people" element={<People />} />
          <Route path="/people/:personName" element={<People />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
