export const SomethingWentWrong: React.FC = () => {
  return (
    <>
      <h1 className="title">People Page</h1>
      <p data-cy="peopleLoadingError" className="box">
        Something went wrong
      </p>
    </>
  );
};
