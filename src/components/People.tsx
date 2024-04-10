import { Loader } from './Loader';
import { Link } from 'react-router-dom';

export const People = () => {
  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {false && <Loader />}

          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>

          <p data-cy="noPeopleMessage">There are no people on the server</p>

          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Sex</th>
                <th>Born</th>
                <th>Died</th>
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              <tr data-cy="person">
                <td>
                  <Link to="#/people/jan-van-brussel-1714">
                    Jan van Brussel
                  </Link>
                </td>

                <td>m</td>
                <td>1714</td>
                <td>1748</td>
                <td>Joanna van Rooten</td>
                <td>Jacobus van Brussel</td>
              </tr>

              <tr data-cy="person">
                <td>
                  <Link to="#/people/philibert-haverbeke-1907">
                    Philibert Haverbeke
                  </Link>
                </td>

                <td>m</td>
                <td>1907</td>
                <td>1997</td>

                <td>
                  <Link
                    className="has-text-danger"
                    to="#/people/emma-de-milliano-1876"
                  >
                    Emma de Milliano
                  </Link>
                </td>

                <td>
                  <Link to="#/people/emile-haverbeke-1877">
                    Emile Haverbeke
                  </Link>
                </td>
              </tr>

              <tr data-cy="person" className="has-background-warning">
                <td>
                  <Link to="#/people/jan-frans-van-brussel-1761">
                    Jan Frans van Brussel
                  </Link>
                </td>

                <td>m</td>
                <td>1761</td>
                <td>1833</td>
                <td>-</td>

                <td>
                  <Link to="#/people/jacobus-bernardus-van-brussel-1736">
                    Jacobus Bernardus van Brussel
                  </Link>
                </td>
              </tr>

              <tr data-cy="person">
                <td>
                  <Link
                    className="has-text-danger"
                    to="#/people/lievijne-jans-1542"
                  >
                    Lievijne Jans
                  </Link>
                </td>

                <td>f</td>
                <td>1542</td>
                <td>1582</td>
                <td>-</td>
                <td>-</td>
              </tr>

              <tr data-cy="person">
                <td>
                  <Link to="#/people/bernardus-de-causmaecker-1721">
                    Bernardus de Causmaecker
                  </Link>
                </td>

                <td>m</td>
                <td>1721</td>
                <td>1789</td>

                <td>
                  <Link
                    className="has-text-danger"
                    to="#/people/livina-haverbeke-1692"
                  >
                    Livina Haverbeke
                  </Link>
                </td>

                <td>
                  <Link to="#/people/lieven-de-causmaecker-1696">
                    Lieven de Causmaecker
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
