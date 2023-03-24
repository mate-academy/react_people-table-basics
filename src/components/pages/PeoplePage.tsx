import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { RenderTable } from '../RenderTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const { slug = '' } = useParams();

  const getPeopleFromServer = async () => {
    try {
      const fetchedPeople = await getPeople();

      setPeople(fetchedPeople);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          <RenderTable
            slug={slug}
            people={people}
            hasError={hasError}
            isFetching={isFetching}
          />
        </div>
      </div>
    </>
  );
};
