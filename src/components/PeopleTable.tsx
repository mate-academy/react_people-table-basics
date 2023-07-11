import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { FC } from 'react';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { TableHeadNames } from '../enums/TableHeadNames';

interface Props {
  people: Person[];
}

const EMPTY_TABLE_CELL = '-';

export const PeopleTable:FC<Props> = ({ people }) => {
  const { userSlug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(TableHeadNames).map(([key, value]) => (
            <th key={key}>{value}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            slug,
            sex,
            born,
            died,
            mother,
            motherName,
            father,
            fatherName,
          } = person;
          const isSelected = userSlug === slug;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={cn({ 'has-background-warning': isSelected })}
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
                  : motherName || EMPTY_TABLE_CELL}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : fatherName || EMPTY_TABLE_CELL}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
