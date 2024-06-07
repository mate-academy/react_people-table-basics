import { PeopleTable } from './PeopleTable';
import React from 'react';
import { Person } from '../types';
import { Loader } from './Loader';
import { useParams } from 'react-router-dom';

type Props = {
  people: Person[];
  loading: boolean;
  errorMessage: boolean;
};

export const PeoplePage: React.FC<Props> = ({
  people,
  loading,
  errorMessage,
}) => {
  const { slug } = useParams();
  const selectedPerson = slug ? people.find(p => p.slug === slug) : null;

  return (
    <>
      <h1 className="title">People Page</h1>
      {loading ? (
        <Loader />
      ) : (
        <PeopleTable
          people={people}
          selectedPerson={selectedPerson}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
};
