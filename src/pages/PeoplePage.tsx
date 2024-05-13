import { useFetchPeople } from '../hooks/useFetchPeople';
import { TablePeople } from '../components/TablePeople';

export const PeoplePage = () => {
  const { dataPeople, isLoading, errorMessage } = useFetchPeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {/* <Loader /> */}

          {/* <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>

          <p data-cy="noPeopleMessage">There are no people on the server</p> */}
          <TablePeople
            people={dataPeople}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </>
  );
};
