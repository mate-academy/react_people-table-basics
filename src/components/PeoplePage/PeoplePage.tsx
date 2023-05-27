import { PeopleList } from '../PeopleList';

export const PeoplePage = () => (
  <>
    <h1 className="title">People Page</h1>

    <div className="box table-container">
      <div className="block">
        <PeopleList />
      </div>
    </div>
  </>
);
