import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { augmentPeople } from '../../utils';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { slug: selectedSlug } = useParams<{ slug: string }>();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(fetchedPeople => {
        // Augment people with slug and parent links
        const augmentedPeople = augmentPeople(fetchedPeople as Person[]);

        setPeople(augmentedPeople);
      })
      .catch(() => {
        setHasError(true);
        setPeople([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const hasNoPeople = people.length === 0 && !isLoading && !hasError;
  const shouldShowTable = people.length > 0 && !hasError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {hasNoPeople && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {shouldShowTable && (
            <PeopleTable people={people} selectedSlug={selectedSlug} />
          )}
        </div>
      </div>
    </>
  );
};
