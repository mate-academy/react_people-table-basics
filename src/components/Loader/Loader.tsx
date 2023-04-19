import { useEffect, useState } from 'react';
import './Loader.scss';

export const Loader = () => {
  const [isStatus, setStatus] = useState(true);

  useEffect(() => {
    setTimeout(() => setStatus(false), 5000);
  }, []);

  return (
    <>
      {isStatus ? (
        <div className="Loader" data-cy="loader">
          <div className="Loader__content" />
        </div>
      ) : (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
    </>
  );
};
