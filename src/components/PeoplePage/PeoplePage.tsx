import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      setFetchError(false);
      try {
        const response = await getPeople();

        setPeople(response);
      } catch (error) {
        setFetchError(true);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1>People page</h1>
      {!fetchError
        ? <PeopleTable people={people} />
        : <p>An error occured wile loading people from server! </p>}
    </>
  );
};
