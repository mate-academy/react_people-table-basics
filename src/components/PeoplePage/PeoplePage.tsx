import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { slug } = useParams();

  useEffect(() => {
    setError('');
    getPeople()
      .then(setPeople)
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const preparedPeople = useMemo(() => (
    people.map(person => {
      const mother = people.find(findPerson => (
        findPerson.name === person.motherName
      ));

      const father = people.find(findPerson => (
        findPerson.name === person.fatherName
      ));

      return { ...person, mother, father };
    })
  ), [people]);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!!error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !error && preparedPeople.length !== 0 && (
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
                {preparedPeople.map(person => (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={cn({
                      'has-background-warning': person.slug === slug,
                    })}
                  >
                    <PersonLink person={person} />
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    {person.mother
                      ? (
                        <PersonLink person={person.mother} />
                      ) : (
                        <td>
                          {person.motherName || '-'}
                        </td>
                      )}

                    {person.father
                      ? (
                        <PersonLink person={person.father} />
                      ) : (
                        <td>
                          {person.fatherName || '-'}
                        </td>
                      )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!isLoading && !error && !preparedPeople.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
