import cn from 'classnames';
import { Person } from '../../types';

interface Props {
  personName: string | null;
  people: Person[];
}

export const PersonLink: React.FC<Props> = ({ personName, people }) => {
  const personInf = people.find(person => person.name === personName);

  if (!personInf || !personName) {
    return <span>{personName || '-'}</span>;
  }

  return (
    <a
      className={cn({ 'has-text-danger': personInf.sex === 'f' })}
      href={`#/people/${personInf.slug}`}
    >
      {personName}
    </a>
  );
};
