import { FC, useEffect } from 'react';
import { ErrorType } from '../../types';

interface ErrorNotificationProps {
  errorMessage: ErrorType;
  onChangeError: (onError: ErrorType) => void;
}

export const ErrorNotification: FC<ErrorNotificationProps> = ({
  errorMessage,
  onChangeError,
}) => {
  useEffect(() => {
    setTimeout(() => onChangeError(ErrorType.None), 4000);
  }, [onChangeError]);

  return (
    <p data-cy="peopleLoadingError" className="has-text-danger">
      {errorMessage}
    </p>
  );
};
