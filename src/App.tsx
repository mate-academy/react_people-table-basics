import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

// done. Create the `HomePage` available at `/` with just a title `Home Page`
// done. Create the `PeoplePage` available at `/people` with a title `People Page`
// done. Use [Navigate](https://reactrouter.com/docs/en/v6/components/navigate) component to redirect from `/home` to `/`;
//     - add `replace` attribute not to save `/home` URL in the [browser history](https://reactrouter.com/docs/en/v6/getting-started/concepts#history-and-locations) and avoid navigation loop when you press browser `Go back` button.
// done. Implement `NotFoundPage` with a title `Page not found` that is shown for all the other URLs;
// done. Add the `Navbar` with 2 links `Home` and `People`. Active one should have the `has-background-grey-lighter` class;
// done. Use `HashRouter` to be able to share a link to any page on Github pages;

// done. Fetch `people` from [the API](https://mate-academy.github.io/react_people-table/api/people.json) when `PeoplePage` is opened;
// done. Pass `people` to `PeopleTable` component and render as a table (see the given markup);

// 1. Make each name in the table a link a to `/people/:slug` (including mother and father)
//     - create the `<PersonLink person={person} />` and use it for all existing people;
//     - add the `has-text-danger` class for women names;
//     - if there is no person with a given name among the people just keep the name as a text (not a link);
//     - if the motherName or fatherName is empty put `-` to the table

// 1. Highlight the row of the selected person with the `has-background-warning` class;

import './App.scss';
import { PageNavLink } from './components/PageNavLink';
import { PeopleTable } from './components/PeopleTable';

export const App = () => {
  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <PageNavLink
              to="/"
              text="Home"
            />

            <PageNavLink
              to="/people"
              text="People"
            />
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route index element={<h1 className="title">Home Page</h1>} />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />

            <Route path="/people">
              <Route index element={<PeopleTable />} />
              <Route path=":slug" element={<PeopleTable />} />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
