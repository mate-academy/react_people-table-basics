import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { Person } from "../../types";
import { FC } from "react";

type Props = {
  person: Person,
};

export const PersonNavLink: FC<Props> = ({ person }) => {
  const isWoman = person.sex === 'f';

  return (
    <NavLink
      to={`../${person.slug}`}
      className={() => (classNames({"has-text-danger" : isWoman}))}
    >
      {person.name}
    </NavLink>
  );
};
