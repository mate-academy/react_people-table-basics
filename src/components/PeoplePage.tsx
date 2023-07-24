import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { slug = '' } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((data) => {
        setPeople(data);
      })
      .catch(setIsError)
      .finally(() => setIsLoading(false));
  }, []);

  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (people?.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {isLoading ? (
            <>
              <Loader />
            </>
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
                {people?.map((person) => (
                  <tr
                    key={person.name}
                    data-cy="person"
                    className={classNames({
                      'has-background-warning': slug === person.slug,
                    })}
                  >
                    <td>
                      <NavLink
                        to={`../${person.slug}`}
                        className={classNames({
                          'has-text-danger': person.sex === 'f',
                        })}
                      >
                        {person.name}
                      </NavLink>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>{person.fatherName ? person.fatherName : '-'}</td>
                    <td>{person.motherName ? person.motherName : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
