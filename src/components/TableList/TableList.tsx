import { FC } from 'react';
import { TableItem } from '../TableItem';

type TTableListProps = {

};

export const TableList: FC<TTableListProps> = () => {
  return (
    <tbody>
      <TableItem />
    </tbody>
  );
};
