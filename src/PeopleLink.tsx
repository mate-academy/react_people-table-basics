import { Link, useParams } from "react-router-dom";
import { Person } from "./types";
import cn from "classnames";

type Props = {
  person: Person;
}

export const PersonLink: React.FC <Props> = ({ person }) => {
  const { slug } = useParams();
  const {name, sex, born, died, fatherName, motherName } = person;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <Link
          to={person.slug}
          className={cn({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {person.mother ? (
          <Link
            to={`/people/${person.mother.slug}`}
            className="has-text-danger"
          >
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {person.father ? (
          <Link
            to={`/people/${person.father.slug}`}
          >
            {fatherName}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
}
