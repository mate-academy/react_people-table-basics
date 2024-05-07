import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import PeopleTable from '../PeopleTable/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsloading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsloading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!isLoading && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      <div className="block">
        <div className="box table-container">
          {isLoading ? <Loader /> : <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
