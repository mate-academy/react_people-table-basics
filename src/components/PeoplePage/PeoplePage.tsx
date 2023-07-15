import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getDetailsOfParents } from '../../helpers';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { slug = '' } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(person => {
        setPeople(person);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visiblePeoples = getDetailsOfParents(people);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {!isLoading && !error && (
        <PeopleTable
          people={visiblePeoples}
          selectedPersonSlug={slug}
        />
      )}

      {!isLoading && error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>
      )}
    </>
  );
};
