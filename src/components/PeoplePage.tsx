import { useParams } from 'react-router-dom';
import { TablePeople } from './TablePeople';
import { Person } from '../types';
import { Loader } from './Loader';

type Props = {
  people: Person[],
  isLoading: boolean,
  isError: boolean,
};

export const PeoplePage: React. FC<Props> = ({
  isLoading, isError, people,
}) => {
  const { slug = '' } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && (<Loader />)}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!!people.length && (
            <TablePeople
              people={people}
              slug={slug}
            />
          )}
        </div>
      </div>
    </>
  );
};
