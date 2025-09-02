import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { useParams } from 'react-router-dom';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);

  useEffect(() => {
    const loadPeoples = async () => {
      try {
        setIsLoading(true);
        const peopleList = await getPeople();

        setPeoples(peopleList);
      } catch (e) {
        setError(true);
        setPeoples([]);
      } finally {
        setIsLoading(false);
        setFirstLoad(true);
      }
    };

    loadPeoples();
  }, []);

  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoading && <Loader />}

        {!isLoading && error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!isLoading && !error && firstLoad && peoples.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isLoading && !error && peoples.length > 0 && (
          <PeopleTable peoples={peoples} selectedSlug={slug} />
        )}
      </div>
    </div>
  );
};
