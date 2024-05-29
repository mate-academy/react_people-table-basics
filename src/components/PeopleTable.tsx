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
        {people.map(person => {
          const mother = person.motherName
            ? findPersonByName(person.motherName)
            : null;
          const father = person.fatherName
            ? findPersonByName(person.fatherName)
            : null;
          const hasMotherName = person.motherName || '-';
          const hasFatherName = person.fatherName || '-';

          return (
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
              <td>{mother ? <PersonLink person={mother} /> : hasMotherName}</td>
              <td>{father ? <PersonLink person={father} /> : hasFatherName}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
