import classNames from 'classnames';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../../types';
import { PersonInfo } from '../Person/PersonInfo';

type Props = {
  people: Person[],
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug = '' } = useParams();

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
          const isSelected = slug === person.slug;

          return (
            <tr
              data-cy="person"
              key={person.name}
              className={classNames({
                'has-background-warning': isSelected,
              })}
            >
              <PersonInfo {...person} />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
