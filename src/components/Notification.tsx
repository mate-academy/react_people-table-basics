import classNames from 'classnames';
import React from 'react';
import { Error } from '../types/Error';

type Props = {
  error: Error,
};

export const Notification: React.FC<Props> = ({ error }) => {
  const { message, type, isDanger } = error;

  return (
    <p
      data-cy={type}
      className={classNames({
        'has-text-danger': isDanger,
      })}
    >
      {message}
    </p>
  );
};
