import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { getPeoplesWithParents } from '../helpers/getPreparedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const { slug = '' } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getPeople();
      const preparedData = getPeoplesWithParents(data);

      setPeople(preparedData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`something went wrong:${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading
        ? <Loader />
        : <PeopleTable people={people} selectedPerson={slug} />}
    </>
  );
};
