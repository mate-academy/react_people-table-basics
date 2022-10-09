import { Link } from "react-router-dom";
import classNames from "classnames";
import { Person } from "../types/Person";

type Props = {
  person: Person | undefined;
  name?: string | null;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  return (
    <>
      {person ? (
        <Link
          className={classNames({ "has-text-danger": person.sex === "f" })}
          to={`../${person.slug}`}
        >
          {person.name}
        </Link>
      ) : (
        name || "-"
      )}
    </>
  );
};
