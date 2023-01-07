import React from 'react';
import { UpdatePerson } from '../../types/UpdatePerson';
import { PersonLink } from '../PersonLink';

type Props = {
  people: UpdatePerson[],
  personSlug: string,
};

export const PeopleTable: React.FC<Props> = React.memo(
  ({
    people,
    personSlug,
  }) => (
    <>
      {people.map(person => (
        <PersonLink
          key={person.slug}
          person={person}
          personSlug={personSlug}
        />
      ))}
    </>
  ),
);
