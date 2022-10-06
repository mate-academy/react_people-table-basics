import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../../api';
import { Person } from '../../../types';
import { PeopleTable } from '../../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { personSlug = '' } = useParams();

  useEffect(() => {
    const getPeopleAsync = async () => {
      try {
        setIsLoading(true);
        const data = await getPeople();

        setPeople(data);
      } catch (_) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPeopleAsync();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <PeopleTable
        people={people}
        isLoading={isLoading}
        isError={isError}
        personSlug={personSlug}
      />
    </>
  );
};
