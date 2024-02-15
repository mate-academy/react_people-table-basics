import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          <PeopleTable />
        </div>
      </div>
    </>
  );
};
