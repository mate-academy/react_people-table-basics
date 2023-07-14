import { FC } from 'react';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';

type Props = {
  parent: Person | null | undefined;
  name: string | null;
};

export const ParentInfo: FC<Props> = ({ parent, name }) => {
  return (
    <>
      {parent ? (
        <PersonLink
          to={`/people/${parent.slug}`}
          name={parent.name || '-'}
          sex={parent.sex}
        />
      ) : (
        <p>{name || '-'}</p>
      )}
    </>
  );
};
