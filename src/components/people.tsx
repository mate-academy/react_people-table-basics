import { useContext, useEffect } from 'react';
import { getPeople } from '../api';
import { MyContext } from './state';
import classNames from 'classnames';
import { Loader } from './Loader';
import { Error } from './error';
import { Link } from 'react-router-dom';

export const People = () => {
  const {
    person,
    setPerson,
    error,
    setError,
    setIsLoading,
    isLoading,
    setSelectedPerson,
    selectedPerson,
  } = useContext(MyContext);

  const getPeopleClass = (name: string) =>
    classNames({ 'has-background-warning': selectedPerson === name });

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(fetchedPeople => {
        setPerson(fetchedPeople);
      })
      .catch(err => {
        setError('Unable to load people: ');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : person.length === 0 ? (
        <div className="box table-container">
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        </div>
      ) : (
        <div className="box table-container">
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
              {person.map(pers => {
                const { name, sex, born, died, fatherName, motherName, slug } =
                  pers;

                return (
                  <tr
                    data-cy="person"
                    key={name}
                    className={getPeopleClass(name)}
                    onClick={() => setSelectedPerson(name)}
                  >
                    <td>
                      <Link
                        to={`#/people/${slug}`}
                        className={classNames({
                          'has-text-danger': sex === 'f',
                        })}
                      >
                        {name}
                      </Link>
                    </td>

                    <td>{sex}</td>
                    <td>{born}</td>
                    <td>{died}</td>
                    <td>{motherName ? motherName : '-'}</td>
                    <td>{fatherName ? fatherName : '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
