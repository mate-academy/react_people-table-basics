import { FC, useEffect } from 'react';
import { ErrorType } from '../../types';

interface ErrorNotificationProps {
  onError: ErrorType;
  onChangeError: (onError: ErrorType) => void;
}

export const ErrorNotification: FC<ErrorNotificationProps> = ({
  onError,
  onChangeError,
}) => {
  useEffect(() => {
    setTimeout(() => onChangeError(ErrorType.None), 4000);
  }, [onError]);

  return (
    <p data-cy="peopleLoadingError" className="has-text-danger">
      {onError}
    </p>
  );
};
