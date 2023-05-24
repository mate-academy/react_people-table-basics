import { FC } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { PeopleTableRowData } from '../PeopleTableRowData';
import { Person } from '../../types';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

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
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': personSlug === person.slug,
            })}
          >
            <PeopleTableRowData person={person} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
