import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  people: Person[]; // потрібен повний список для пошуку
  personName: string | null;
};

export const PersonLink: React.FC<Props> = ({ personName, people }) => {
  const foundPerson = people.find(p => p.name === personName);

  if (!personName) {
    return '-'; // порожнє ім'я
  }

  if (!foundPerson) {
    return personName; // немає людини — просто текст
  }

  // Є людина — рендеримо посилання
  return (
    <a
      className={classNames({ 'has-text-danger': foundPerson.sex === 'f' })}
      href={`#/people/${foundPerson.slug}`}
    >
      {personName}
    </a>
  );
};
