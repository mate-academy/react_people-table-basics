import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { personSlug } = useParams();

  const handleLoadPeople = async () => {
    try {
      const apiPeople = await getPeople();

      setPeople(apiPeople);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    handleLoadPeople();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {people.length === 0 ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
            <PeopleTable people={people} selectedPersonSlug={personSlug} />
          )}
        </div>
      </div>
    </>
  );
};
