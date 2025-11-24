import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/Loader/PeopleList';
import { Person } from '../types';
import { ErrorTypes } from '../types/Error';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorTypes | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const getAllPeople = async () => {
      try {
        const peopleArr = await getPeople();

        if (peopleArr.length === 0) {
          setError(ErrorTypes.NoPeople);

          return;
        }

        setPeople(peopleArr);
      } catch {
        setError(ErrorTypes.SomethingWrong);
      } finally {
        setLoading(false);
      }
    };

    getAllPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error === ErrorTypes.SomethingWrong && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {error === ErrorTypes.NoPeople && (
            <p data-cy="noPeopleMessage">{error}</p>
          )}

          {!loading && error === null && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
