import PeopleContent from '../PeopleContent/PeopleContent';

const PeoplePage = () => {
  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        <div className="block">
          <PeopleContent />
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
