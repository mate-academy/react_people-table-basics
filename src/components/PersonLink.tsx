import { NavLink } from "react-router-dom";
import { Person } from "../types";

interface Props {
  person?: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  if (!person) {
    return <span>-</span>;
  }

  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={`has-text-weight-bold ${person.sex === 'f' ? 'has-text-danger' : ''}`}
    >
      {person.name}
    </NavLink>
  );
};
