import { FC, useEffect } from 'react';
import { ErrorType } from '../../types';

interface ErrorProps {
  onError: ErrorType;
  onChangeError: (onError: ErrorType) => void;
}

export const ErrorNotification: FC<ErrorProps> = ({
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
