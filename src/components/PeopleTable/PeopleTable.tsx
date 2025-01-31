import { FC } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

interface Props {
  peoples: Person[];
}

export const PeopleTable: FC<Props> = ({ peoples }) => {
  const { slug } = useParams<{ slug?: string }>();

  if (peoples.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

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
          const mother =
            peoples.find(
              currentPerson => currentPerson.name === person.motherName,
            ) || null;

          const father =
            peoples.find(
              currentPerson => currentPerson.name === person.fatherName,
            ) || null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames('', {
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
                  <PersonLink person={mother} parentName={person.motherName} />
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  <PersonLink person={father} parentName={person.fatherName} />
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
