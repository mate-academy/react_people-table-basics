import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

interface PersonLinkType {
  person: Person;
  people: Person[];
}

export const PersonLink: React.FC<PersonLinkType> = ({ person, people }) => {
  const { slug } = useParams();

  const selectedPerson = people.find(pers => pers.slug === slug);
  const selectedFather = people.find(pers => pers.name === person.fatherName);
  const selectedMother = people.find(pers => pers.name === person.motherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPerson === person,
      })}
    >
      <td>
        <Link to={`/people/${person.slug}`}>
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {selectedMother
          ? (
            <Link
              className="has-text-danger"
              to={`/people/${selectedMother.slug}`}
            >
              {selectedMother.name}
            </Link>
          ) : person.motherName || '-' }
      </td>
      <td>
        {selectedFather
          ? (
            <Link
              to={`/people/${selectedFather.slug}`}
            >
              {selectedFather.name}
            </Link>
          ) : person.fatherName || '-'}
      </td>
    </tr>
  );
};
