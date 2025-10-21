import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
  selectedPersonSlug?: string | null;
  onSelect?: (slug: string) => void;
};

export const PeopleList: React.FC<Props> = ({
  people,
  selectedPersonSlug = null,
  onSelect,
}) => {
  const { personSlug } = useParams<{ personSlug: string }>();
  const currentSelectedSlug = personSlug ?? selectedPersonSlug;

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
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName) || null;
          const father = people.find(p => p.name === person.fatherName) || null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === currentSelectedSlug,
              })}
              onClick={() => onSelect?.(person.slug)}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink
                  person={mother}
                  fallbackName={person.motherName || null}
                />
              </td>
              <td>
                <PersonLink
                  person={father}
                  fallbackName={person.fatherName || null}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
