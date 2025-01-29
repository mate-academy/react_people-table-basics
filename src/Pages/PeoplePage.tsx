import { useContext } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable ';
import { PeopleContext } from '../store/PeopleStore';

export const PeoplePage = () => {
  const context = useContext(PeopleContext);

  const { people, isPeopleLoading } = context;

  return (
    <>
      <div className="container">
        <h1 className="title">People Page</h1>
      </div>
      <div className="block">
        <div className="box table-container">
          {isPeopleLoading ? (
            <Loader />
          ) : (
            <>
              {people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable people={people} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
