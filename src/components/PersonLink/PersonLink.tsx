import React from 'react';
import cn from 'classnames'
import { Person } from '../../types';
import { Link } from 'react-router-dom';

type Props = {
  person?:Person
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  if(!person) {
    return  <span>-</span>
  }

  const { name, slug, sex} = person

  return (
    <Link to={`/people/${slug}`} className={cn({'has-text-danger': sex === 'f'})}>
      {name}
    </Link>
  )
};
