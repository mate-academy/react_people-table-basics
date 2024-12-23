import { useEffect, useState } from 'react';
import { PeopleTable } from '../../components/PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { ErrorMessages } from '../../constants/ErrorMessages';
import { Loader } from '../../components/Loader';
import { PeopleError } from '../../components/PeopleError';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorMessages | null>(null);
  const isPeopleListEmpty = people.length === 0;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(ErrorMessages.LoadPeople))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <PeopleError errorMessage={error} />;
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      {isPeopleListEmpty ? (
        <p data-cy="noPeopleMessage">{ErrorMessages.NoPeople}</p>
      ) : (
        <PeopleTable people={people} />
      )}
    </>
  );
};
