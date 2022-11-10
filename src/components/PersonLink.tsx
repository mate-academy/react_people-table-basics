import classNames from "classnames";
import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  slug: string,
  sex: string,
  name: string,
}

export const PersonLink: FC<Props> = ({ slug, sex, name }) => (
  <Link
    to={`/people/${slug}`}
    className={classNames({
      'has-text-danger': sex === 'f',
    })}
  >
    {name}
  </Link>
);
