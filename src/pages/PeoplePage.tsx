import { FC, useContext } from 'react';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { peopleContext } from '../components/Context/ContextProvider';
import { Loader } from '../components/Loader';

export const PeoplePage: FC = () => {
  const { people, isLoading, hasError } = useContext(peopleContext);

  const showVisiblePeople = !isLoading
  && !hasError
  && people.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {showVisiblePeople
                ? <PeopleTable people={people} />
                : null}

              {hasError
                && <p data-cy="peopleLoadingError">Something went wrong</p>}

              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
