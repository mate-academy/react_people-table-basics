import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = people.map(person => {
    const mother =
      person.motherName &&
      people.find(p => p.name === person.motherName && p.born < person.born);

    const father =
      person.fatherName &&
      people.find(p => p.name === person.fatherName && p.born < person.born);

    return Object.assign(
      {},
      person,
      mother && { mother },
      father && { father },
    );
  });

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
        )}

        {isLoading ||
          (!preparedPeople.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ))}

        {!isLoading && !error && <PeopleTable people={preparedPeople} />}
      </div>
    </div>
  );
};
