import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const { slug = '' } = useParams();

  const peopleFromServer = async () => {
    try {
      const peoples = await getPeople();

      setPeople(peoples);
    } catch {
      setHasError(true);
    } finally {
      setHasError(false);
    }
  };

  useEffect(() => {
    peopleFromServer();
  }, []);

  if (hasError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  return (
    <div className="block">
      <div className="box table-container">

        {people.length <= 0 ? (
          <Loader />
        ) : (
          <PeopleTable people={people} selectedSlug={slug} />
        )}
      </div>
    </div>
  );
};
