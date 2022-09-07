import { Link, useParams } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person,
  onMotherFind: (motherName: string | undefined) => string | undefined,
  onFatherFind: (fatherName:string | undefined) => string | undefined,
};

export const PersonLink: React.FC<Props> = ({
  person,
  onMotherFind,
  onFatherFind,
}) => {
  const { slug } = useParams();
  const motherAsPerson = onMotherFind(person.motherName || undefined);
  const fatherAsPerson = onFatherFind(person.fatherName || undefined);
  let personMother;
  let personFather;

  if (!person.motherName) {
    personMother = <td>-</td>;
  } else {
    personMother = motherAsPerson
      ? (
        <td>
          <Link
            to={`/people/${motherAsPerson}`}
            className="has-text-danger"
          >
            {person.motherName}
          </Link>
        </td>
      ) : <td>{person.motherName}</td>;
  }

  if (!person.fatherName) {
    personFather = <td>-</td>;
  } else {
    personFather = fatherAsPerson
      ? (
        <td>
          <Link to={`/people/${fatherAsPerson}`}>
            {person.fatherName}
          </Link>
        </td>
      ) : <td>{person.fatherName}</td>;
  }

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={
        person.slug === slug
          ? 'has-background-warning'
          : ''
      }
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={
            person.sex === 'f'
              ? 'has-text-danger'
              : ''
          }
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      {personMother}

      {personFather}
    </tr>
  );
};
