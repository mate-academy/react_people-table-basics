import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  selectedParent?: Person,
  setSelectedSlug: (arg: string) => void,
  parentName: string | null,
};

export const PersonLink: FC<Props> = ({
  selectedParent, setSelectedSlug, parentName,
}) => {
  return (
    <Link
      to={`/people/${selectedParent?.slug || ''}`}
      className={classNames(
        { 'has-text-danger': selectedParent?.sex === 'f' },
      )}
      onClick={() => {
        return selectedParent?.slug
          ? setSelectedSlug(selectedParent.slug)
          : setSelectedSlug('');
      }}
    >
      {parentName || '-'}
    </Link>
  );
};
