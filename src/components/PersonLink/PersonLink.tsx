import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const findPersonByName = (name: string) => people.find(p => p.name === name);

  const mother = person.motherName ? findPersonByName(person.motherName) : null;
  const father = person.fatherName ? findPersonByName(person.fatherName) : null;

  return (
    <>
      <td>
        <Link
          to={`#/people/${person.slug}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <Link to={`#/people/${mother.slug}`} className="has-text-danger">
            {mother.name}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`#/people/${father.slug}`} className="has-text-danger">
            {father.name}
          </Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </>
  );
};
