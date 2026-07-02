import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState('');

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const data = await getPeople();

        setPeople(data);
      } catch (error) {
        setHasError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (hasError) {
    content = (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  } else if (people.length === 0) {
    content = (
      <p data-cy="noPeopleMessage">There are no people on the server</p>
    );
  } else {
    content = <PeopleTable people={people} />;
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      {content}
    </>
  );
};
