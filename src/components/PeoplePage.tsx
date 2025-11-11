import { useEffect, useState } from 'react';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const isNoPeople = people.length < 1;

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <PeopleTable
        isLoading={isLoading}
        isError={isError}
        isNoPeople={isNoPeople}
        people={people}
        slug={slug}
      />
    </div>
  );
};
