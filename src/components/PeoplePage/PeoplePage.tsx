import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';
import { Loader } from '../Loader';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasErr, setHasErr] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { slug = '' } = useParams();

  const loadPeople = async () => {
    try {
      const data = await getPeople();

      setPeople(data);
    } catch (error) {
      setHasErr(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {hasErr && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
        {isLoading && <Loader />}
        {!isLoading && (
          people.length
            ? <PeopleTable people={people} selectedSlug={slug} />
            : (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )
        )}
      </div>
    </div>
  );
};
