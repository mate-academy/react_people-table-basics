import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <>
      <h1>
        Page not found
        {' '}
        <Link to="/">Go home</Link>
      </h1>
    </>
  );
};
