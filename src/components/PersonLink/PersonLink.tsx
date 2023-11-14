import { Dispatch, FC, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person | undefined;
  setSelectedPersonId: Dispatch<SetStateAction<string>>;
};

export const PersonLink: FC<Props> = ({ person, setSelectedPersonId }) => {
  return (
    <Link
      to={`/people/${person?.slug}`}
      onClick={() => setSelectedPersonId(person?.slug ?? '')}
      className={
        cn(person?.sex === 'f'
          ? 'has-text-danger'
          : 'has-text-info')
      }
    >
      {person?.name}
    </Link>
  );
};
