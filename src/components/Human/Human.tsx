import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person;
  people: Person[];
  personSlug?: string;
};

export const Human: React.FC<Props> = ({ person, people, personSlug }) => {
  const { sex, born, died, fatherName, motherName, slug } = person;

  const personMother = people.find(human => human.name === motherName);
  const personFather = people.find(human => human.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {personMother ? (
          <PersonLink person={personMother} />
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {personFather ? (
          <PersonLink person={personFather} />
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
