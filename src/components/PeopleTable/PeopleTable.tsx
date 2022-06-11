import React from 'react';
import 'bulma';
import { PersonRow } from './PersonRow/PersonRow';
import { TableHeadFoot } from '../../TableHeadFoot/TableHeadFoot';

export const PeopleTable: React.FC = () => {
  return (
    <>
      <h2 className="subtitle has-text-centered">People page</h2>
      <table className="table is-bordered table is-fullwidth">
        <thead>
          <TableHeadFoot />
        </thead>
        <tbody>
          <PersonRow />
        </tbody>
        <tfoot>
          <TableHeadFoot />
        </tfoot>
      </table>
    </>
  );
};
