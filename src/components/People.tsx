import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

type Human = {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
};

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Human[]>([]);
  const [loading, setLoaging] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { name } = useParams();

  useEffect(() => {
    setLoaging(true);
    setErrorMessage(false);
    setTimeout(() => {
      fetch('https://mate-academy.github.io/react_people-table/api/people.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('');
          }
          return response.json();
        })
        .then(data => setPeopleList(data))
        .catch(() => setErrorMessage(true))
        .finally(() => setLoaging(false));
    }, 500);
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}
          {errorMessage && (
            <p data-cy="peopleLoadingError">Something went wrong</p>
          )}

          {!loading && !errorMessage && peopleList.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !errorMessage && peopleList.length > 0 && (
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
                {peopleList.map(person => {
                  const mother = peopleList.find(
                    p => person.motherName === p.name,
                  );
                  const father = peopleList.find(
                    p => person.fatherName === p.name,
                  );
                  return (
                    <>
                      <tr
                        data-cy="person"
                        className={classNames('', {
                          'has-background-warning': name === person.slug,
                        })}
                      >
                        <td>
                          <NavLink
                            to={`../${person.slug}`}
                            className={
                              person.sex === 'f' ? 'has-text-danger' : ''
                            }
                          >
                            {person.name}
                          </NavLink>
                        </td>

                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          {mother ? (
                            <NavLink
                              to={`../${mother.slug}`}
                              className="has-text-danger"
                            >
                              {person.motherName}
                            </NavLink>
                          ) : (
                            person.motherName || '-'
                          )}
                        </td>

                        <td>
                          {father ? (
                            <NavLink to={`../${father.slug}`}>
                              {person.fatherName}
                            </NavLink>
                          ) : (
                            person.fatherName || '-'
                          )}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
