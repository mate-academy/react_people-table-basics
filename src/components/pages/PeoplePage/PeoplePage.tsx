import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../../Loader';
import { PeopleTable } from '../../PeopleTable/PeopleTable';
import { getPeople } from '../../../api';
import { Person } from '../../../types';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const { selectedSlug } = useParams();

  useEffect(() => {
    const loadPeople = async () => {
      try {
        const data = await getPeople();

        setPeople(data);
      } catch {
        setErrorMessage(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  const noPeople = useMemo(() => people.length === 0, [people]);
  const hasPeople = useMemo(() => people.length > 0, [people]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {!isLoading && !errorMessage && noPeople && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {hasPeople && (
            <PeopleTable people={people} selectedSlug={selectedSlug} />
          )}
        </div>
      </div>
    </>
  );
};
