import cn from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person | string;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <>
      {typeof person === 'string'
        ? person
        : (
          <a
            className={cn({
              'has-text-danger': person.sex === 'f',
            })}
            href={`#/people/${person.slug}`}
          >
            {person.name}
          </a>
        )}
    </>

  );
};
