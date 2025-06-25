import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getPeople()
      .then(fetchedPeople => {
        setPeople(fetchedPeople);
        setIsLoading(false);
      })
      .catch(() => {
        setErrorMessage('There was an error loading the people.');
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return (
      <p className="has-text-danger" data-cy="peopleLoadingError">
        {errorMessage}
      </p>
    );
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return <PeopleTable people={people} />;
};
