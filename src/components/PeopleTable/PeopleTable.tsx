import { Person } from '../../types';
import classNames from 'classnames';
import React from 'react';
import { PersonLink } from '../../PersonLink/PersonLink';
import { useParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams<{ personSlug: string }>();

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
        {people &&
          people.map((person: Person) => (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': person.slug === personSlug,
              })}
            >
              <td>
                <PersonLink name={person.name} person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink person={person.mother} name={person.motherName} />
              </td>
              <td>
                <PersonLink person={person.father} name={person.fatherName} />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
