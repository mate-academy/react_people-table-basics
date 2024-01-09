import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

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
        {(!!people.length)
          && people.map(person => (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td aria-labelledby={`label-${person.slug}`}>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {
                  person.mother?.name
                  && (
                    <PersonLink person={person.mother} />
                  )
                }
                {(!person.motherName && !person.mother?.name) && '-'}
                {(person.motherName && !person.mother?.name)
                  && person.motherName}
              </td>
              <td>
                {
                  person.father?.name
                  && (
                    <PersonLink person={person.father} />
                  )
                }
                {(!person.fatherName && !person.father?.name) && '-'}
                {(person.fatherName && !person.father?.name)
                  && person.fatherName}
              </td>
            </tr>
          ))}

      </tbody>
    </table>
  );
};
