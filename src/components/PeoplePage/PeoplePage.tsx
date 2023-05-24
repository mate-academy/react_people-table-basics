import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { Person } from '../../types';

export const PeoplePage: React.FC = () => {
  const { slug = '' } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getPeopleLoad = async () => {
      try {
        const loadedPeople = await getPeople();

        setPeople(loadedPeople);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPeopleLoad();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <PeopleTable
              people={people}
              selectedSlug={slug}
              error={isError}
            />
          )}
        </div>
      </div>
    </>
  );
};
