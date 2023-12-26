import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { Table } from '../Table/Table';
import { PeopleLoadingError } from '../PeopleLoadingError/PeopleLoadingError';
import { NoPeopleMessage } from '../NoPeopleMessage/NoPeopleMessage';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then((result) => setPeople(result))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading
            ? <Loader />
            : (isError && <PeopleLoadingError />) || (people.length > 0
              ? <Table people={people} />
              : <NoPeopleMessage />)}
        </div>
      </div>
    </>
  );
};
