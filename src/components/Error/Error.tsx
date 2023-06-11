interface Props {
  error: string;
}

export const Error: React.FC<Props> = ({ error }) => {
  return (
    <div className="block">
      <div className="box table-container">

        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>

        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>

      </div>
    </div>
  );
};
