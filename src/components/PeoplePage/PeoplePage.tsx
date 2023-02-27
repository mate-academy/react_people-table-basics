import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { preparedPeople } from '../../utils/helpers';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = React.memo(() => {
  const { slug = '' } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);

      try {
        const peopleFromServer = await getPeople();
        const peopleWithParents = preparedPeople(peopleFromServer);

        setPeople(peopleWithParents);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading
            ? <Loader />
            : (
              <PeopleTable
                people={people}
                personSlug={slug}
                hasError={hasError}
              />
            )}
        </div>
      </div>
    </>
  );
});
