import classNames from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug = '' } = useParams();

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
            name,
            sex,
            born,
            died,
            slug,
            motherName,
            fatherName,
            mother,
            father,
          } = person;

          const isSelected = personSlug === slug;
          const editedMotherName = motherName || '-';
          const editedFatherName = fatherName || '-';

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonLink
                  slug={slug}
                  name={name}
                  sex={sex}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? (
                    <PersonLink
                      slug={mother.slug}
                      name={editedMotherName}
                      sex={mother.sex}
                    />
                  )
                  : editedMotherName}
              </td>
              <td>
                {father
                  ? <PersonLink slug={father.slug} name={editedFatherName} />
                  : editedFatherName}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
