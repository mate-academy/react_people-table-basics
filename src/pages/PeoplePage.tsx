import { PeopleTable } from '../components/Loader/PeopleTable';

export const PeoplePage = () => (
  <>
    <h1 className="title">People Page</h1>
    <div className="block">
      <div className="box table-container">
        <PeopleTable />
      </div>
    </div>
  </>
);
