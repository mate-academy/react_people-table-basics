import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';
import { NoPeopleMessage } from '../NoPeopleMessage';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const personSlug = slug || '';

  return (
    <table
      data-cy="peopleTable"
      className="
        table
        is-striped
        is-hoverable
        is-narrow
        is-fullwidth
    "
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
        {
          people?.length !== 0 ? (
            people.map(person => (
              <tr
                key={person.slug}
                data-cy="person"
                className={cn({
                  'has-background-warning': personSlug === person.slug,
                })}
              >
                <td>
                  <PersonLink
                    person={person}
                  />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {
                    person.mother ? (
                      <PersonLink person={person.mother} />
                    ) : (
                      person.motherName || '-'
                    )
                  }
                </td>
                <td>
                  {
                    person.father ? (
                      <PersonLink person={person.father} />
                    ) : (
                      person.fatherName || '-'
                    )
                  }
                </td>
              </tr>
            ))
          ) : (
            <NoPeopleMessage />
          )
        }
      </tbody>
    </table>
  );
};
