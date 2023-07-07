import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { FC } from 'react';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { TableHeadNames } from '../enums/TableHeadNames';

interface Props {
  people: Person[];
}

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
            <td key={key}>{value}</td>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = userSlug === person.slug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother
                  ? <PersonLink person={person.mother} />
                  : person.motherName || '-'}
              </td>
              <td>
                {person.father
                  ? <PersonLink person={person.father} />
                  : person.fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
