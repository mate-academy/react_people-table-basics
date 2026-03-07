import React from 'react';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  // const selectedPerson = personSlug
  //   ? (people.find(man => man.slug === personSlug) ?? null)
  //   : null;

  // console.log(personSlug);
  // console.log(selectedPerson);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
            people={people}
            personSlug={personSlug}
            // selectedPerson={selectedPerson}
          />
        ))}
      </tbody>
    </table>
  );
};
