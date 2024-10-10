import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';
import { useContext } from 'react';
import { PeopleContex } from '../../peopleContext';

type Props = {
  person: Person;
};

const getPersonByName = (
  name: string | null,
  people: Person[],
): Person | undefined => {
  return people.find(person => person.name === name);
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  const { slug: userId, sex, born, died, fatherName, motherName } = person;
  const { slug: selectedUserId } = useParams();

  const people = useContext(PeopleContex);
  const mother = getPersonByName(motherName, people);
  const father = getPersonByName(fatherName, people);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': userId === selectedUserId,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>

      <td>{born}</td>

      <td>{died}</td>

      <td>{mother ? <PersonLink person={mother} /> : motherName || '-'}</td>

      <td>{father ? <PersonLink person={father} /> : fatherName || '-'}</td>
    </tr>
  );
};
