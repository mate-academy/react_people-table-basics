import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
  selectedPerson: string | null;
  setSelectedPerson: (slug: string | null) => void;
  isError?: boolean;
};

export const People: React.FC<Props> = ({
  people,
  selectedPerson,
  setSelectedPerson,
}) => {
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      setSelectedPerson(slug);
    }
  }, [slug, setSelectedPerson]);

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">No people available.</p>;
  }

  return (
    <div>
      <h1 className="title">People Page</h1>
      <PeopleTable
        people={people}
        selectedPerson={selectedPerson}
        setSelectedPerson={setSelectedPerson}
      />
    </div>
  );
};
