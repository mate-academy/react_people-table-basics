import { useEffect, useState } from 'react';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { handlePersonMatch } from '../../functions/handlePersonMatch';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPeople();
        const peopleCommonInfo = data.map(person => {
          const personMother = handlePersonMatch(data, person.motherName);
          const personFather = handlePersonMatch(data, person.fatherName);

          return { ...person, personMother, personFather };
        });

        setPeople(peopleCommonInfo);
      } catch (err) {
        setError(`Error in API response - ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable error={error} isLoading={isLoading} people={people} />
    </>
  );
};
