import { Loader } from './Loader/Loader';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { personSlug } = useParams<{ personSlug: string }>();

  const activePerson = people.find(person => person.slug === personSlug);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then((data: Person[]) => {
        setPeople(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {loading ? (
              <Loader />
            ) : error ? (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            ) : people.length === 0 ? (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ) : (
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
                  {(people as Person[]).map((person: Person) => {
                    const mother =
                      people.find(p => p.name === person.motherName) || null;
                    const father =
                      people.find(p => p.name === person.fatherName) || null;

                    return (
                      <tr
                        key={person.slug}
                        data-cy="person"
                        className={
                          activePerson === person
                            ? 'has-background-warning'
                            : ''
                        }
                      >
                        <td>
                          <PersonLink person={person} />
                        </td>
                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          {mother ? (
                            <PersonLink person={mother} />
                          ) : (
                            person.motherName || '-'
                          )}
                        </td>
                        <td>
                          {father ? (
                            <PersonLink person={father} />
                          ) : (
                            person.fatherName || '-'
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            {/*<tr data-cy="person">
                  <td>
                    <a href="#/people/jan-van-brussel-1714">Jan van Brussel</a>
                  </td>

                  <td>m</td>
                  <td>1714</td>
                  <td>1748</td>
                  <td>Joanna van Rooten</td>
                  <td>Jacobus van Brussel</td>
                </tr>

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
                    <a href="#/people/emile-haverbeke-1877">Emile Haverbeke</a>
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
                </tr>*/}
          </div>
        </div>
      </div>
    </main>
  );
};
