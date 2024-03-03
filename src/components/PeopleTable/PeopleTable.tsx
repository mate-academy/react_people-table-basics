import { Person } from '../../types';
import { PeopleTableBody } from '../PeopleTableBody';
import { PeopleTableHeader } from '../PeopleTableHeader';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <PeopleTableHeader />

    <PeopleTableBody people={people} />
  </table>
);
