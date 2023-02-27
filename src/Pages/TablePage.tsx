import { Loader } from '../components/Loader';
import { TablePeople } from '../components/TablePeople/TablePeople';
import { Person } from '../types';

type Props = {
  isLoading: boolean;
  isError: boolean;
  filteredPeopleList: Person[];
};

export const TablePage: React.FC<Props> = ({
  isLoading, filteredPeopleList, isError,
}) => (
  <>
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isError && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}
          {isLoading
            ? <Loader />
            : <TablePeople peopleList={filteredPeopleList} />}
        </div>
      </div>
    </div>
  </>
);
