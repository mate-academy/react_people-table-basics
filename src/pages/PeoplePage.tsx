import { useFetchPeople } from '../hooks/useFetchPeople';
import { TablePeople } from '../components/TablePeople';

export const PeoplePage = () => {
  const { dataPeople, isLoading, errorMessage } = useFetchPeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
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
