import React, { useContext, useEffect } from 'react';
import { Loader } from './Loader';
import { PeopleContext } from '../contexts/PeopleContext';
import { useParams, Link } from 'react-router-dom';
import classNames from 'classnames';

export const PeoplePage: React.FC = () => {
  const { people, error, selectedPerson, setSelectedPerson } =
    useContext(PeopleContext);

  const { peopleId } = useParams();

  useEffect(() => {
    if (peopleId) {
      setSelectedPerson(peopleId);
    }
  }, [peopleId, setSelectedPerson]);

  return (
    <div className="block">
      <div className="box table-container">
        {!people && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

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
            {people.map(person => (
              <tr
                data-cy="person"
                key={person.name}
                onClick={() => {
                  if (person.name === selectedPerson) {
                    setSelectedPerson(null);
                  } else {
                    setSelectedPerson(person.name);
                  }
                }}
                className={classNames({
                  'has-background-warning': person.name === selectedPerson,
                })}
              >
                <td>
                  <Link to={`/people/${person.name}-${person.born}`}>
                    {person.name}
                  </Link>
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                <td>
                  <td>
                    {person.motherName ? (
                      people.find(p => p.name === person.motherName) ? (
                        <Link
                          to={`/people/${person.motherName}-${people.find(p => p.name === person.motherName)!.born}`}
                          className="has-text-danger"
                        >
                          {person.motherName}
                        </Link>
                      ) : (
                        person.motherName
                      )
                    ) : (
                      '-'
                    )}
                  </td>
                </td>

                <td>
                  {person.fatherName ? (
                    people.find(p => p.name === person.fatherName) ? (
                      <Link
                        to={`/people/${person.fatherName}-${people.find(p => p.name === person.fatherName)!.born}`}
                      >
                        {person.fatherName}
                      </Link>
                    ) : (
                      person.fatherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
