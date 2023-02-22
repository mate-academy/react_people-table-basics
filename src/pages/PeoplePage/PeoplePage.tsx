import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { slug = '' } = useParams();

  useEffect(() => {
    const getPeopleOnLoad = async () => {
      try {
        const allPeople = await getPeople();

        setPeople(allPeople);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPeopleOnLoad();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading
            ? (
              <Loader />
            )
            : (
              <PeopleTable
                people={people}
                selectedSlug={slug}
                hasError={hasError}
              />
            )}
        </div>
      </div>
    </>
  );
};
