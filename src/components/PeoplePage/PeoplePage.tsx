import { Person } from '../../types';
import { Loader } from '../Loader';
import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchPeople = async () => {
    try {
      setIsLoading(true);
      const peopleFetched = await getPeople();

      setPeople(peopleFetched);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('Something went wrong');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);
  if (isLoading) {
    return (
      <div className="container">
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  if (!people || people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>

          <PeopleTable people={people} />
        </div>
      </div>
    </div>
  );
};
