import { useEffect, useState } from 'react';
import { PeopleTable } from '../../components/PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../../components/Loader';
import { ErrBlock } from '../../components/ApiBadRequest/Apbadrequest';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const shouldShowNoPeople = people.length === 0 && !isError && !isLoading;
  const shouldShowPeopleTable = !isError && people.length > 0;

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {isError && <ErrBlock />}
      {shouldShowNoPeople
          && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

      {shouldShowPeopleTable && <PeopleTable people={people} />}
      {isLoading && <Loader />}
    </>
  );
};
