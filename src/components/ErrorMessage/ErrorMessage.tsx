import React, { memo } from 'react';
import cn from 'classnames';

type Props = {
  message: string;
  close: () => void;
};

export const ErrorNotification: React.FC<Props> = memo((props) => {
  const { message, close } = props;

  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !message },
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={close}
      />
      {message}
    </div>
  );
});

export const ErrorMessage: React.FC = memo(() => {
  return (
    <p data-cy="peopleLoadingError" className="has-text-danger">
      Something went wrong
    </p>
  );
});
