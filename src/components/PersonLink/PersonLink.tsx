import classNames from 'classnames';
import { Person } from '../../types';

interface Props {
  personName: string | null;
  peoples: Person[];
}

export const PersonLink: React.FC<Props> = ({ personName, peoples }) => {
  const personData = peoples.find(people => people.name === personName);

  if (!personData || !personName) {
    return <span>{personName || '-'}</span>;
  }

  return (
    <a
      className={classNames({ 'has-text-danger': personData.sex === 'f' })}
      href={`#/people/${personData.slug}`}
    >
      {personName}
    </a>
  );
};
