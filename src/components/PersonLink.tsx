import classNames from "classnames";
import { FC } from "react";
import { Link} from "react-router-dom";
import { Person } from "../types";

interface Props {
  person: Person;
}

export const PersonLink: FC<Props> = (props) => {
  const { person } = props;
  const isWoman = person.sex === 'f';

  return (
    <Link
      to={person.slug}
      className={classNames({
        'has-text-danger': isWoman,
      })}
    >
      {person.name}
    </Link>
  )
}
