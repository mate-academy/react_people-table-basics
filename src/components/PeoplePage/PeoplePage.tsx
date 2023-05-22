import { useEffect, useState } from 'react';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPeople()
      .then(data => {
        const peopleCommonInfo = data.map(person => {
          const personMother = data.find(mother => {
            return mother.name === person.motherName;
          });

          const personFather = data.find(father => {
            return father.name === person.fatherName;
          });

          return { ...person, personMother, personFather };
        });

        setPeople(peopleCommonInfo);
      })
      .catch((err) => setError(`Error in API response - ${err}`))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable error={error} isLoading={isLoading} people={people} />
    </>
  );
};
