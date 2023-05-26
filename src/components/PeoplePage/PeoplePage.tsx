import { PeopleLoader } from '../PeopleLoader';

export const PeoplePage = () => {
  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          <PeopleLoader />
        </div>
      </div>
    </>
  );
};
