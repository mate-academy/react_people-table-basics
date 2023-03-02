import classNames from 'classnames';
import React from 'react';
import { Person } from '../../types';
import { PersonNavLink } from '../PersonNavLink/PersonNavLink';

type Props = {
  people: Person[],
  selectedSlug: string
};
export const PeopleTable:React.FC<Props> = React.memo(
  ({ people, selectedSlug }) => {
    const noPeopleOnServer = people.length <= 0;

    if (noPeopleOnServer) {
      return (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      );
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
            const mother = people
              .find(mothe => mothe.name === person.motherName);
            const father = people
              .find(fathe => fathe.name === person.fatherName);
            const isSelectedPerson = selectedSlug === person.slug;
            const motherLink = person.motherName || '-';
            const fatherLink = person.fatherName || '-';

            return (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames(
                  {
                    'has-background-warning': isSelectedPerson,
                  },
                )}
              >
                <td>
                  <PersonNavLink person={person} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {mother
                    ? <PersonNavLink person={mother} />
                    : motherLink}

                </td>
                <td>
                  {father
                    ? <PersonNavLink person={father} />
                    : fatherLink}

                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  },
);
