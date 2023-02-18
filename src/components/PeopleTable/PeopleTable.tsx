import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
  selectedPerson: string | undefined;
};

export const PeopleTable: FC<Props> = ({ people, selectedPerson }) => {
  const getParents = (name: string | null) => {
    return people.find((person) => person.name === name) || null;
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
          {people.map((person) => {
            const { sex, born, died, motherName, fatherName, slug } = person;
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
