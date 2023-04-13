import { PeoplePageContent } from './PeoplePageContent';

export const PeoplePageWrapper: React.FC = () => (
  <>
    <h1 className="title">People Page</h1>
    <div className="block">
      <div className="box table-container"><PeoplePageContent /></div>
    </div>
  </>
);
