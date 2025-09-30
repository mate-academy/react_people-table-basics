import { useEffect, useState } from 'react';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();

  const selectedSlug = slug ? slug : '';

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    const fetchPeople = async () => {
      try {
        const result = await getPeople();

        setPeople(result);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);

        // eslint-disable-next-line no-console
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <PeopleTable
          people={people}
          isLoading={isLoading}
          selectedSlug={selectedSlug}
          isError={isError}
        />
      </div>
    </>
  );
};
