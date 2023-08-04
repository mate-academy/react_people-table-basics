import { Link } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';

import { Person } from '../../types';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

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
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': (
                selectedPerson?.slug === person.slug
              ),
            })}
          >
            <td>
              <Link
                onClick={() => setSelectedPerson(person)}
                to={`/${person.slug}`}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{person.motherName}</td>
            <td>{person.fatherName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
