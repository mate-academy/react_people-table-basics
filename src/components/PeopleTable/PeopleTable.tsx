import { Loader } from '../Loader';
import { usePeople } from '../../hooks/usePeople';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

export const PeopleTable = () => {
  const { people, isLoading, error } = usePeople();
  const location = useLocation();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="container">
        <div className="block">
          <div className="box table-container">
            {people.length === 0 && !isLoading && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {isLoading ? (
              <Loader />
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
                  {people.map(person => {
                    const mother =
                      people.find(p => p.name === person.motherName) || null;
                    const father =
                      people.find(p => p.name === person.fatherName) || null;

                    return (
                      <tr
                        key={person.slug}
                        data-cy="person"
                        className={classNames({
                          'has-background-warning':
                            location.pathname === `/people/${person.slug}`,
                        })}
                      >
                        <td>
                          <PersonLink person={person} />
                        </td>
                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          {person.motherName ? (
                            mother ? (
                              <PersonLink person={mother} />
                            ) : (
                              <span>{person.motherName}</span>
                            )
                          ) : (
                            <span>-</span>
                          )}
                        </td>
                        <td>
                          {person.fatherName ? (
                            father ? (
                              <PersonLink person={father} />
                            ) : (
                              <span>{person.fatherName}</span>
                            )
                          ) : (
                            <span>-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

{
  /* <tbody>
                  {people.map(person => {
                    return (
                      <PersonLink
                        key={person.slug}
                        person={person}
                        people={people}
                      />
                    );
                  })}
                </tbody> */
}
