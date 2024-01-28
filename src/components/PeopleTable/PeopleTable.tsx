import { useCallback } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slugId } = useParams();

  const findByName = useCallback((name: string) => {
    const resultPerson = people.find(person => person.name === name);

    if (resultPerson) {
      return <PersonLink person={resultPerson} />;
    }

    return name;
  }, []);

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
        {people.map((person) => (
          <tr
            data-cy="person"
            className={classNames({
              'has-background-warning': slugId === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{person.motherName ? findByName(person.motherName) : '-'}</td>
            <td>{person.fatherName ? findByName(person.fatherName) : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
