import { FC } from 'react';

type TTableItemProps = {

};

export const TableItem: FC<TTableItemProps> = () => {
  return (
    <tr data-cy="person" className="has-background-warning">
      <td>
        <a href="#/people/jan-frans-van-brussel-1761">
          Jan Frans van Brussel
        </a>
      </td>

      <td>m</td>
      <td>1761</td>
      <td>1833</td>
      <td>-</td>

      <td>
        <a href="#/people/jacobus-bernardus-van-brussel-1736">
          Jacobus Bernardus van Brussel
        </a>
      </td>
    </tr>
  );
};
