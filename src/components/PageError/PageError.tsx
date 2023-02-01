import { FC, memo } from 'react';

export const PageError: FC = memo(
  () => {
    return (
      <h1 className="title">Page not found</h1>
    );
  },
);
