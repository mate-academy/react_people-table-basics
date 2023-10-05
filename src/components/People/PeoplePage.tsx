import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable';

type PeoplePageProps = {
  showLoader: boolean
  showError: boolean
  people: Person[] | null
};

export const PeoplePage = (
  { showLoader, showError, people }: PeoplePageProps,
) => {
  const { slug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {showLoader && <Loader />}

          {showError && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {people && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people && people.length > 0 && (
            <PeopleTable people={people} clickedPersonSlug={slug} />
          )}
        </div>
      </div>
    </>
  );
};
