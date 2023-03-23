import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';

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

  const renderTable = () => {
    if (isFetching) {
      return <Loader />;
    }

    if (hasError) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      );
    }

    if (!people.length) {
      return (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      );
    }

    return (
      <PeopleTable
        people={people}
        slug={slug}
      />
    );
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {renderTable()}
        </div>
      </div>
    </>
  );
};
