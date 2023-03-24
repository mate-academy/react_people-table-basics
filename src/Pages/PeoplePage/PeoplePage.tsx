import { FunctionComponent } from 'react';
import { PeopleList } from '../../components/PeopleList';

export const PeoplePage: FunctionComponent = () => (
  <>
    <h1 className="title">People Page</h1>
    <PeopleList />
  </>
);
