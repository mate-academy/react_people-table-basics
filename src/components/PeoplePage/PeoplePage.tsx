import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getDetailsOfParents } from '../../helpers';

export const PeoplePage: FC = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { slug = 'carolus-haverbeke-1832' } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(person => {
        setPeoples(person);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError('Something went wrong');
      });
  }, []);

  const visiblePeoples = getDetailsOfParents(peoples);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading
        ? (
          <Loader />
        ) : (
          <>
            {error
              ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              ) : (
                <PeopleTable
                  peoples={visiblePeoples}
                  selectedPersonSlug={slug}
                />
              )}
          </>
        )}
    </>
  );
};
