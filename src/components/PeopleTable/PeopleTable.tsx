import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonInfo } from '../PersonInfo';
import { Loader } from '../Loader';

export const PeopleTable:React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const { slug = '' } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(result => {
        setPeople(result);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const searchParent = (personName:string | null) => {
    return people.find(per => per.name === personName);
  };

  const isEmpty = people.length;

  return (
    <>
      <h1 className="title">People Page</h1>
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
            {isError && (
              <p
                data-cy="peopleLoadingError"
                className="has-text-danger"
              >
                Something went wrong
              </p>
            )}
            {!isEmpty && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}
            {people.map(person => {
              const mother = searchParent(person.motherName);
              const father = searchParent(person.fatherName);

              return (
                <PersonInfo
                  person={person}
                  selected={slug}
                  key={person.slug}
                  mother={mother}
                  father={father}
                />
              );
            })}
          </tbody>
        </table>
      )}

    </>
  );
};
