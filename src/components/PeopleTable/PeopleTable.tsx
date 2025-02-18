import { FC } from 'react';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';
import { COLUMN_TITLES } from '../../constants/COLUMN_TITLES';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMN_TITLES.map(columnTitle => (
            <th key={columnTitle}>{columnTitle}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            sex,
            born,
            died,
            motherName,
            fatherName,
            slug: personsSlug,
          } = person;

          const personsMother = people.find(
            mother => mother.name === motherName,
          );
          const personsFather = people.find(
            father => father.name === fatherName,
          );

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': personsSlug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {personsMother ? (
                  <PersonLink person={personsMother} />
                ) : (
                  <p>{motherName || '-'}</p>
                )}
              </td>
              <td>
                {personsFather ? (
                  <PersonLink person={personsFather} />
                ) : (
                  <p>{fatherName || '-'}</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
