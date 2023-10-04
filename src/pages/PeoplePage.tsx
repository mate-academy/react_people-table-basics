import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage:React.FC = () => {
  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <PeopleTable />
    </div>
  );
};
