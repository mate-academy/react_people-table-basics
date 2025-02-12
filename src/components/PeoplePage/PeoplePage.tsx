import { Loader } from '../Loader/Loader';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const loadPeopleList = () => {
    getPeople()
      .then(setPeopleList)
      .catch(() => setErrorMessage('Something went wrong'))
      .then(() => {
        setIsLoading(false);
      });
  };

  useEffect(loadPeopleList, []);

  const getParentSlug = (parentName: string) => {
    const parent = peopleList.find(person => person.name === parentName);

    if (parent) {
      return parent.slug;
    }

    return;
  };

  return (
    <div className="container">
      <br /> <br />
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}
          {!peopleList.length && !errorMessage && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {isLoading ? (
            <Loader />
          ) : (
            <>
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
                  {peopleList.map(person => (
                    <PersonLink
                      person={person}
                      getParentSlug={getParentSlug}
                      key={person.slug}
                    />
                  ))}
                  {/*
                  <tr data-cy="person">
                    <td>
                      <a href="#/people/philibert-haverbeke-1907">
                        Philibert Haverbeke
                      </a>
                    </td>

                    <td>m</td>
                    <td>1907</td>
                    <td>1997</td>

                    <td>
                      <a
                        className="has-text-danger"
                        href="#/people/emma-de-milliano-1876"
                      >
                        Emma de Milliano
                      </a>
                    </td>

                    <td>
                      <a href="#/people/emile-haverbeke-1877">
                        Emile Haverbeke
                      </a>
                    </td>
                  </tr>

                  <tr data-cy="person" className="has-background-warning">
                    <td>
                      <a href="#/people/jan-frans-van-brussel-1761">
                        Jan Frans van Brussel
                      </a>
                    </td>

                    <td>m</td>
                    <td>1761</td>
                    <td>1833</td>
                    <td>-</td>

                    <td>
                      <a href="#/people/jacobus-bernardus-van-brussel-1736">
                        Jacobus Bernardus van Brussel
                      </a>
                    </td>
                  </tr>

                  <tr data-cy="person">
                    <td>
                      <a
                        className="has-text-danger"
                        href="#/people/lievijne-jans-1542"
                      >
                        Lievijne Jans
                      </a>
                    </td>

                    <td>f</td>
                    <td>1542</td>
                    <td>1582</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>

                  <tr data-cy="person">
                    <td>
                      <a href="#/people/bernardus-de-causmaecker-1721">
                        Bernardus de Causmaecker
                      </a>
                    </td>

                    <td>m</td>
                    <td>1721</td>
                    <td>1789</td>

                    <td>
                      <a
                        className="has-text-danger"
                        href="#/people/livina-haverbeke-1692"
                      >
                        Livina Haverbeke
                      </a>
                    </td>

                    <td>
                      <a href="#/people/lieven-de-causmaecker-1696">
                        Lieven de Causmaecker
                      </a>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
