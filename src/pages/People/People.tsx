import { FC } from 'react';
import { Table } from '../../components/Table';

type TPeopleProps = {};

export const People: FC<TPeopleProps> = () => {
  return (
    <>
      <h1 className="title">People Page</h1>

      <Table />
    </>
  );
};
