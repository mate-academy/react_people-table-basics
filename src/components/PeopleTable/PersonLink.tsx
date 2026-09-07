import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { forwardRef } from 'react';

type Props = Pick<Person, 'slug' | 'name' | 'sex'>;

export const PersonLink = forwardRef<HTMLAnchorElement, Props>(
  ({ slug, name, sex }, ref) => {
    return (
      <Link
        ref={ref}
        to={`/people/${slug}`}
        className={cn(sex === 'f' && 'has-text-danger')}
      >
        {name}
      </Link>
    );
  },
);

PersonLink.displayName = 'PersonLink';
