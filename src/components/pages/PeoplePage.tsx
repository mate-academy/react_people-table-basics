import { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { personId } = useParams();

  const preparedPeopleData = peopleData.map(person => ({
    ...person,
    mother: peopleData.find(mother => mother.name === person.motherName),
    father: peopleData.find(father => father.name === person.fatherName),
  }));

  useEffect(() => {
    getPeople()
      .then(people => {
        setPeopleData(people);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  const dataExists = !isLoading && !hasError && peopleData.length > 0;

  const showNoPeopleMessage = !dataExists && !preparedPeopleData.length;

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {showNoPeopleMessage && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            {!isLoading && (
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
            )}
            {dataExists && (
              <tbody>
                {preparedPeopleData.map(person => (
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={classNames({
                      'has-background-warning': person.slug === personId,
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
                        person.mother ? (
                          <PersonLink person={person.mother} />
                        ) : (
                          <span>{person.motherName}</span>
                        )
                      ) : (
                        '-'
                      )}
                    </td>

                    <td>
                      {person.fatherName ? (
                        person.father ? (
                          <PersonLink person={person.father} />
                        ) : (
                          <span>{person.fatherName}</span>
                        )
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};
