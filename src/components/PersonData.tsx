import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import PersonLink from './PersonLink';

interface PersonDataProps {
  person: Person;
  people: Person[];
}

const PersonData: React.FC<PersonDataProps> = ({ person, people }) => {
  const { slug } = useParams();

  const findMother = (peopleFromServer: Person[], child: Person) => {
    return peopleFromServer.find((mom) => mom.name === child.motherName);
  };

  const mother = findMother(people, person);

  const findFather = (peopleFromServer: Person[], child: Person) => {
    return peopleFromServer.find((dad) => dad.name === child.fatherName);
  };

  const father = findFather(people, person);

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? <PersonLink person={mother} /> : person.motherName || '-'}
      </td>
      <td>
        {father ? <PersonLink person={father} /> : person.fatherName || '-'}
      </td>
    </tr>
  );
};

export default PersonData;
