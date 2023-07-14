import { FC } from 'react';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage: FC = () => {
  return (
    <>
      <h1 className="title">People Page</h1>

      <PeopleTable />
    </>
  );
};
