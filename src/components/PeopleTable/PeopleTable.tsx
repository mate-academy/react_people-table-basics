import { FC } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types/Person';
import { PeoplePersonHeader } from '../../types/PeopleTableHeader';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const { personSlug = '' } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(PeoplePersonHeader).map(([key, value]) => (
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
          const isPersonSelected = personSlug === slug;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={cn({ 'has-background-warning': isPersonSelected })}
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
                  : motherName || '-'}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : fatherName || '-'}
              </td>
            </tr>

          );
        })}
      </tbody>
    </table>
  );
};
