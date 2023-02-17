import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  persons: Person[];
  selectedPerson: string | undefined;
};

export const PeopleTable: FC<Props> = ({ persons, selectedPerson }) => {
  const getParents = (name: string | null) => {
    return persons.find((person) => person.name === name) || null;
  };

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
        <>
          {persons.map((person) => {
            const {
              sex, born, died, motherName, fatherName, slug,
            } = person;
            const mom = getParents(motherName);
            const dad = getParents(fatherName);

            return (
              <tr
                key={slug}
                data-cy="person"
                className={classNames({
                  'has-background-warning': slug === selectedPerson,
                })}
              >
                <PersonLink person={person} />
                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                {mom ? (
                  <PersonLink person={mom} />
                ) : (
                  <td>{motherName || '-'}</td>
                )}
                {dad ? (
                  <PersonLink person={dad} />
                ) : (
                  <td>{fatherName || '-'}</td>
                )}
              </tr>
            );
          })}
        </>
      </tbody>
    </table>
  );
};
