import { Loader } from '../components/Loader';
import { usePeopleHooks } from '../services/PeoplePageHooks';
import { PeopleTable } from '../components/People/PeopleTable';

export const PeoplePage = () => {
  const { loading, people, peopleMap, error } = usePeopleHooks();
  const toRender = () => {
    if (loading) {
      return <Loader />;
    }

    if (error) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      );
    }

    if (people.length === 0) {
      return <p data-cy="noPeopleMessage">There are no people on the server</p>;
    }

    return <PeopleTable people={people} peopleMap={peopleMap} />;
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">{toRender()}</div>
      </div>
    </>
  );
};
