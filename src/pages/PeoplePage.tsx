import { PeopleTable } from '../components/People/PeopleTable';

export const PeoplePage = () => {
  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <PeopleTable />
      </div>
    </div>
  );
};
