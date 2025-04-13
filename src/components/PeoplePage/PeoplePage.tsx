import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer))
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const PersonWithPerents = people.map(person => {
    const mother = people.find(m => m.name === person.motherName);
    const father = people.find(f => f.name === person.fatherName);

    return {
      ...person,
      ...(mother && { mother }),
      ...(father && { father }),
    };
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isLoading ||
            (!PersonWithPerents.length && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ))}
          {!isLoading && !errorMessage && (
            <PeopleTable people={PersonWithPerents} />
          )}
        </div>
      </div>
    </div>
  );
};
