type Props = {
  error: string;
};

export const ErrorNotification: React.FC<Props> = ({ error }) => {
  return (
    <p data-cy="peopleLoadingError" className="has-text-danger">
      {error}
    </p>
  );
};
