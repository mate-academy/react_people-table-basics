import { Person } from '../../types';

type Props = {
  person: Person[]
  isLoading: boolean
  error: string
};

export const MessageMenu: React.FC<Props> = ({ person, isLoading, error }) => {
  return !person.length && !isLoading ? (
    <div className="block">
      <div className="box table-container">
        { error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
        )}
        { !person.length && !isLoading && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}
      </div>
    </div>
  ) : null;
};

export default MessageMenu;
