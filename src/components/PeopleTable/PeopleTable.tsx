import classNames from 'classnames';
import { Person } from '../../types';
import { PeopleList } from '../PeopleList';

type Props = {
  people: Person[]
};

export const PeopleTable = ({ people }: Props) => {
  return (
    <table
      data-cy="peopleTable"
      className={classNames('table',
        'is-striped',
        'is-hoverable',
        'is-narrow',
        'is-fullwidth')}
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
      <PeopleList people={people} />
    </table>
  );
};
