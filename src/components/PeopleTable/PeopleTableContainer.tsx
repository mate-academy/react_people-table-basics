import { Loader } from '../Loader';
import { PeopleTable, PeopleTableProps } from './PeopleTable';

interface Props extends PeopleTableProps {
  isLoading: boolean;
  error: string | null;
}

export const PeopleTableContainer: React.FC<Props> = ({
  error,
  isLoading,
  people,
}) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {error}
      </p>
    );
  }

  if (!people.length) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return <PeopleTable people={people} />;
};
