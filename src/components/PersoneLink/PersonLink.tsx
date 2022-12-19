import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  slug: string,
  sex: string,
  name: string,
}

export const PersonLink: React.FC<Props> = ({ slug, sex, name }) => (
  <Link
    to={`/people/${slug}`}
    className={sex === 'f' ? 'has-text-danger' : ''}
  >
    {name}
  </Link>
);
