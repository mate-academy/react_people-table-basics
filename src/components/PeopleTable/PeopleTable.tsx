import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem';
import { TabColumnTitles } from '../../types/TabColumnTitles';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const personSlug = slug || '';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.keys(TabColumnTitles).map(key => (
            <th key={key}>
              {key}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonItem
            key={person.slug}
            selectedSlug={personSlug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
