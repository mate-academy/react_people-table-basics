import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: paramsSlug = '' } = useParams();

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
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            mother,
            father,
          } = person;

          const preparedMotherName = motherName || '-';
          const preparedFatherName = fatherName || '-';

          const isPersonSelected = paramsSlug === slug;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': isPersonSelected,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {mother
                  ? <PersonLink person={mother} />
                  : preparedMotherName}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : preparedFatherName}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
