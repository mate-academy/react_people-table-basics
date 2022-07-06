import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import './PeoplePage.scss';

export const PeoplePage: React.FC = () => {
  return (
    <div className="table-item">
      <h1 className="title is-2 main-title">People page</h1>
      <PeopleTable />
    </div>
  );
};
