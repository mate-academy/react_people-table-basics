import { useEffect, useState } from 'react';

import { PeopleTable } from '../../components/PeopleTable';
import { Loader } from '../../components/Loader';

import { getPeople } from '../../api';

import { Person } from '../../types';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingPeople, setLoadingPeople] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getAllPeople = async () => {
    setLoadingPeople(true);

    try {
      const peopleData = await getPeople();

      setPeople(peopleData);
    } catch {
      setError('Something went wrong');
    } finally {
      setLoadingPeople(false);
    }
  };

  useEffect(() => {
    getAllPeople();
  }, []);

  const preparedPeople = people.map(person => {
    const mother =
      person.motherName &&
      people.find(p => p.name === person.motherName && p.born < person.born);

    const father =
      person.fatherName &&
      people.find(p => p.name === person.fatherName && p.born < person.born);

    return {
      ...person,
      ...(mother && { mother }),
      ...(father && { father }),
    };
  });

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {loadingPeople && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
        )}

        {loadingPeople ||
          (!preparedPeople.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ))}

        {!loadingPeople && !error && <PeopleTable people={preparedPeople} />}
      </div>
    </div>
  );
};
