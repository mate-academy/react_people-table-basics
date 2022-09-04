import { FC } from 'react';
import { PeopleTable } from './PeopleTable';

export const PeopleInfo: FC = () => {
  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable />
    </>
  );
};
