import { FC } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { PersonLink } from './PersonLink';
import { Person } from '../types';

type TProps = {
  people: Person[];
};

export const PeopleTable: FC<TProps> = ({ people }) => {
  const { slug } = useParams();

  const findPersonByName = (name: string) => people.find(p => p.name === name);

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
          <tr
            key={person.name}
            data-cy="person"
            className={cn({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                findPersonByName(person.motherName) ? (
                  <PersonLink
                    person={findPersonByName(person.motherName) as Person}
                  />
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                findPersonByName(person.fatherName) ? (
                  <PersonLink
                    person={findPersonByName(person.fatherName) as Person}
                  />
                ) : (
                  person.fatherName
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
