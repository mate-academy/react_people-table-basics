import { FC } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  isLoading: boolean;
};

export const PeopleTable: FC<Props> = ({
  people,
  isLoading,
}) => {
  const { personSlug = '' } = useParams();

  if (isLoading) {
    return null;
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
        {people.map(person => {
          const mother = people.find(personsMother => (
            personsMother.name === person.motherName
          ));

          const father = people.find(personsFather => (
            personsFather.name === person.fatherName
          ));

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': person.slug === personSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother
                  ? <PersonLink person={mother} />
                  : person.motherName || '-'}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : person.fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
