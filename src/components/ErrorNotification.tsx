export const ErrorNotification = () => {
  return (
    <div className="block">
      <div className="box table-container">
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>

        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      </div>
    </div>
  );
};
