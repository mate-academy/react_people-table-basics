import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { PeopleContext } from '../../context/PeopleContext';

import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const peopleContext = useContext(PeopleContext);
  const { people, isLoading, hasError } = peopleContext;
  let { personId } = useParams();

  if (!personId) {
    personId = '';
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!hasError &&
            !isLoading &&
            (people.length === 0 ? (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ) : (
              <PeopleTable people={people} activePersonSlug={personId} />
            ))}
        </div>
      </div>
    </>
  );
};
