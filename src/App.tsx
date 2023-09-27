import './App.scss';
import { Outlet } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';

export const App = () => (
  <div data-cy="app">
    <NavigationBar />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

// <div className="block">
//   <div className="box table-container">
//     <Loader />
//
//     <p data-cy="peopleLoadingError" className="has-text-danger">
//       Something went wrong
//     </p>
//
//
//     <PeopleList />
//   </div>
// </div>
