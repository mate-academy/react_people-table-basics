import { FC } from 'react';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { ModifiedPerson } from '../../../types';

type Props = {
  personLink: string;
  people: ModifiedPerson[] | null;
};

export const PeopleTable: FC<Props> = ({
  personLink,
  people,
}) => {
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
        {people && people.map(person => {
          const {
            name,
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            mother,
            father,
          } = person;
          const isWomen = sex === 'f';
          const isSelected = personLink === slug;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': isSelected,
              })}
            >
              <td
                className={classNames(
                  { 'has-text-danger': isWomen },
                )}
              >
                <PersonLink
                  to={`/people/${slug}`}
                  text={name}
                  className={isWomen ? 'has-text-danger' : ''}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              {mother
                ? (
                  <td>
                    <PersonLink
                      to={`/people/${mother.slug}`}
                      text={mother.name}
                      className="has-text-danger"
                    />
                  </td>

                )
                : (
                  <td>
                    {motherName || '-'}
                  </td>
                )}

              {father
                ? (
                  <td>
                    <PersonLink
                      to={`/people/${father.slug}`}
                      text={father.name}
                      className=""
                    />
                  </td>
                )
                : (
                  <td>
                    {fatherName || '-'}
                  </td>
                )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
