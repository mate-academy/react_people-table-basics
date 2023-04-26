import { useParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedSlug = '' } = useParams();

  return (

    !people.length ? (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    ) : (
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
            const {
              sex, born, died, motherName,
              fatherName, slug, mother, father, name,
            } = person;

            return (
              <tr data-cy="person">
                <td
                  key={name}
                  className={classNames(
                    { 'has-background-warning': slug === selectedSlug },
                  )}
                >
                  <PersonLink person={person} />
                </td>
                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {mother
                    ? <PersonLink person={mother} />
                    : (motherName || '-')}
                </td>
                <td>
                  {father
                    ? <PersonLink person={father} />
                    : (fatherName || '-')}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )
  );
};
