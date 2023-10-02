import { FC } from 'react';
import { TableList } from '../TableList';

type TTableProps = {

};

export const Table: FC<TTableProps> = () => {
  return (
    <div className="block">
      <div className="box table-container">

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

          <TableList />
        </table>
      </div>
    </div>
  );
};
