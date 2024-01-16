import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

type Props = {
  person: Person,
  people: Person[],
  slug: string | undefined
};

// eslint-disable-next-line max-len
export const PersonItem: React.FC<Props> = ({ person, people, slug }) => {
  const selectedPerson = people.find(p => p.slug === slug);

  const getParent = (personParent: string) => {
    const parent = people.find(p => p.name === personParent);

    return parent ? <PersonLink person={parent} /> : personParent;
  };

  const renderMother = (human: Person) => {
    return human.motherName ? getParent(human.motherName) : '-';
  };

  const renderFather = (human: Person) => {
    return human.fatherName ? getParent(human.fatherName) : '-';
  };

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({
        // eslint-disable-next-line max-len
        'has-background-warning': selectedPerson?.slug === person.slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {renderMother(person)}
      </td>

      <td>
        {renderFather(person)}
      </td>
    </tr>
  );
};
