import { PeopleLists } from './PeopleLists';

export const PeoplePage = () => {
  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <PeopleLists />
      </div>
    </>
  );
};

export default PeoplePage;
