import { useEffect, useMemo, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../peopleTable/PeopleTable';
import { preparePeopleData } from '../utils/taskUtils';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const peopleWithParents = useMemo(() => {
    return preparePeopleData(people);
  }, [people]);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable
        people={peopleWithParents}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  );
};
