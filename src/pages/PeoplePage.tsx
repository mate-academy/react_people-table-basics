import React from 'react';
import { Person } from '../types/Person';
import { PeopleTable } from '../components/PeopleTable';

type Props = {
  people: Person[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
};

export const PeoplePage: React.FC<Props> = ({
  people,
  selectedSlug,
  onSelect,
}) => {
  if (people.length === 0) {
    return (
      <p data-cy="noPeopleMessage" className="has-text-grey">
        No people found
      </p>
    );
  }

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <PeopleTable
        people={people}
        selectedSlug={selectedSlug}
        onSelect={onSelect}
      />
    </div>
  );
};
