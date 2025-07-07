import { Outlet } from 'react-router-dom';
import { Loader } from '../Loader/Loader';

interface Props {
  isLoadingPeople: boolean;
  fetchPeopleError: boolean;
}

export const PeoplePage: React.FC<Props> = ({
  isLoadingPeople,
  fetchPeopleError,
}) => {
  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoadingPeople && <Loader />}
          {fetchPeopleError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {!isLoadingPeople && !fetchPeopleError && <Outlet />}
        </div>
      </div>
    </>
  );
};
