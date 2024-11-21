import React from 'react';
import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  peoples: Person[];
};

const PersonLink: React.FC<{
  name: string | null | undefined;
  person?: Person;
}> = ({ name, person }) => {
  return person ? (
    <Link
      to={`/people/${person.slug}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {name}
    </Link>
  ) : (
    name || '-'
  );
};

export const PeopleTable: React.FC<Props> = ({ peoples }) => {
  const { slug } = useParams();
  const selectedName = slug;

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
        {peoples.map(person => {
          const mother = peoples.find(p => p.name === person.motherName);
          const father = peoples.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.name}
              className={cn({
                'has-background-warning': selectedName === person.slug,
              })}
            >
              <td>
                <PersonLink name={person.name} person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink name={person.motherName} person={mother} />
              </td>
              <td>
                <PersonLink name={person.fatherName} person={father} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
