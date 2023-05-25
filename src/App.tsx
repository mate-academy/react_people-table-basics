import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { Navbar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">
    <Navbar />

     <Routes>
       <Route
         path="/"
         element={<HomePage />}
       />

       <Route path="people">
         <Route index element={<PeoplePage />} />
         <Route path=":slug" element={<PeoplePage />} />
       </Route>

       <Route
         path="*"
         element={<PageNotFound />}
       />

       <Route
         path="/home"
         element={<Navigate to="/" replace />}
       />
     </Routes>
   </div>
 );