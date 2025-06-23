import { Loader } from '../../components/Loader';
import { usePeopleList } from '../../hooks/usePeopleList';
import { PeopleTable } from '../../components/PeopleTable';
import { ErrorMessage } from '../../types/ErrorMessage';

export const PeoplePage = () => {
  const { peopleList, errorMessage, isLoading } = usePeopleList();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage === ErrorMessage.LoadingFailed && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {errorMessage === ErrorMessage.NoPeopleOnServer && (
            <p data-cy="noPeopleMessage">{errorMessage}</p>
          )}

          {peopleList.length > 0 && <PeopleTable peopleList={peopleList} />}
        </div>
      </div>
    </>
  );
};
