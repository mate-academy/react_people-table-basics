import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeoplesTable';

export const PeoplesPage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug = '' } = useParams();

  const fetchPeople = async () => {
    setIsLoaded(true);
    try {
      const peopleFromServer = await getPeople();

      setIsLoaded(false);

      setPeople(peopleFromServer);
    } catch {
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);
  const IsPeopleFromServer = !isLoaded && people.length === 0;

  return (
    <div className="block">
      {isLoaded && <Loader /> }

      {isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {people.length > 0
      && (
        <PeopleTable
          people={people}
          selectedSlug={slug}
        />
      )}

      {IsPeopleFromServer
      && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

    </div>
  );
};
