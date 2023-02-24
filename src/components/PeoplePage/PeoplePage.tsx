import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { slug = '' } = useParams();

  useEffect(() => {
    const getPeopleLoad = async () => {
      try {
        const allPeople = await getPeople();

        setPeople(allPeople);
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
      <h1 className="title">People page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading
            ? (
              <Loader />
            ) : (
              <PeopleTable
                people={people}
                selectedSlug={slug}
                isError={isError}
              />
            )}
        </div>
      </div>
    </>
  );
};
