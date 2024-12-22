interface ErrorComponentProps {
  isLoadingError: boolean;
  hasNoPeople: boolean;
}

export function ErrorComponent({
  hasNoPeople = false,
  isLoadingError = false,
}: ErrorComponentProps) {
  return (
    <>
      {hasNoPeople && (
        <p data-cy="noPeopleMessage" className="has-text-danger">
          There are no people on the server
        </p>
      )}
      {isLoadingError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
    </>
  );
}
