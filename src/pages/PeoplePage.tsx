import { FC } from 'react';
import { PeopleList } from '../components/PeopleList';

export const PeoplePage: FC = () => {
  return (
    <>
      <h1 className="title">People Page</h1>

      <PeopleList />
    </>
  );
};
