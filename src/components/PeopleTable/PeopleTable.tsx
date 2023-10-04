import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { sortField } from '../../utils/constants';
import { PersonContent } from '../PersonContent/PersonContent';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {sortField.map(sort => (
              <th key={sort}>{sort}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <PersonContent
              person={person}
              key={person.slug}
              personSlug={personSlug}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
