import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{ color: 'Blue', fontSize: '20px', marginTop: '20px' }}
    >
      PAGE NOT FOUND RETURN
      {' '}
      <Button variant="primary" size="lg" active>
        <Link
          style={{ textDecoration: 'none', color: 'Red' }}
          to="/"
        >
          HOME
        </Link>
      </Button>
    </div>
  );
};
