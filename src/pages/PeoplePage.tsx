import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { slug = '' } = useParams();

  async function fetchPeople() {
    setIsError(false);
    try {
      setIsLoading(true);
      const peopleData = await getPeople();

      setPeople(peopleData);
      setIsLoading(false);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPeople();
  }, []);

  const dataFromServer = (people.length > 0)
    ? <PeopleTable people={people} selectedSlug={slug} />
    : (
      <div className="block">
        <div className="box table-container">
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        </div>
      </div>
    );

  return (
    <>
      <h1 className="title">People Page</h1>
      {(isLoading)
        ? <Loader />
        : dataFromServer}
      {isError && (
        <div className="block">
          <div className="box table-container">
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          </div>
        </div>
      )}
    </>
  );
};
